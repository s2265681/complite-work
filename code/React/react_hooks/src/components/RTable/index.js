import React, { useState, useEffect } from "react";
import "./index.css";

function RTable({
  dataSource = [],
  columns = [],
  rowSelection = {},
  borderd = false,
  loading = false,
  isTheme = "",
  expandable = undefined, // 展开行
  scroll = {} // 设置滚动
}) {
  const { type = "", selectedRowKeys, onChange, rowKey, rowChoosed=false } = rowSelection;
  // 数据管理
  const [_dataSource, setSourceData] = useState(dataSource);
  // 设置排序
  const [isAscOrder, setOrder] = useState(false);
  // 设置鼠标滑入变色
  const [isColorIndex, getColor] = useState();
  // 设置展开值
  const [isExpend, setIsExpend] = useState({});

  // const trRef = useRef(null);
  // 初始化
  useEffect(() => {
    {
      columns.map(c => c && c.sorter instanceof Object && order(c.sorter));
    }
  }, []);

  useEffect(() => {
    setSourceData(dataSource);
  }, [dataSource]);

  // 每一个选中时
  function onSelectChange(Keys) {
    if (selectedRowKeys.includes(Keys)) {
      selectedRowKeys.splice(
        selectedRowKeys.findIndex(e => e === Keys),
        1
      );
    } else {
      selectedRowKeys.push(+Keys);
    }
    type === "checkbox" ? onChange(selectedRowKeys.slice()) : onChange([Keys]);
  }

  // 全部选中时
  function checkedAll(currentKeys) {
    if (currentKeys.length !== _dataSource.length) {
      let keys = [];
      _dataSource.map((e, i) => keys.push(rowKey ? +e[rowKey] : i));
      onChange(keys.slice());
    } else {
      onChange([]);
    }
  }

  // 渲染自定义render数据
  function renderSource(c, d, didx) {
    if (typeof c.render === "function") {
      return c.render(d[c.dataIndex], d, didx);
    } else {
      return d[c.dataIndex];
    }
  }

  // 排序
  function order(sorter) {
    _dataSource.sort(sorter.compare);
    if (isAscOrder) {
      setSourceData(_dataSource.slice());
      setOrder(false);
    } else {
      setSourceData(_dataSource.reverse().slice());
      setOrder(true);
    }
  }

  // 展开行配置 必须搭配rowSelection.rowKey否则按index删除的时候会有问题
  function _onExpand(key) {
    console.log(key);
    if (isExpend[key]) {
      isExpend[key] = false;
    } else {
      isExpend[key] = true;
    }
    setIsExpend(isExpend);
    expandable && expandable.onExpand(key);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", filter: isTheme }}>
      <table
        style={{
          borderTop: borderd ? "#999 1px solid" : "",
          borderBottom: borderd ? "#666 1px solid" : "",
          filter: loading ? "opacity(0.5)" : "",
          position: "relative"
        }}
      >
        {/* Loading */}
        {loading && <span className="Loading">Loading...</span>}

        <thead
          style={{
            borderBottom: borderd ? "#999 1px solid" : "",
            background: "#eee"
          }}
        >
          <tr
            style={{
              display: "flex",
              height: "40px",
              alignItems: 'center'
            }}
          >
            {expandable && (
              <span
                style={{
                  display: "inline-block",
                  width: 20,
                  marginLeft: "10px"
                }}
              ></span>
            )}

            {type && (
              <input
                type={type}
                checked={selectedRowKeys.length === _dataSource.length}
                disabled={type === "radio"}
                onChange={() => checkedAll(selectedRowKeys)}
                className="form-check-input bounce"
                style={{
                  marginLeft: 10,
                  display: "block"
                }}
              />
            )}
            {/* 设置table的columns */}
            {columns.map(({ width = 120, title, sorter, key }) => {
              return (
                <th key={key} style={{ width }}>
                  {title} &nbsp;
                  {sorter instanceof Object ? (
                    <span
                      onClick={() => order(sorter)}
                      style={{ cursor: "pointer" }}
                    >
                      {isAscOrder ? "^" : "v"}
                      {() => order(sorter)}
                    </span>
                  ) : (
                    ""
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <div style={{ 
          overflowY: "scroll", maxHeight: scroll.y,
          overflowX: "scroll", maxWidth: scroll.x
         }}>
          <tbody>
            {_dataSource.map((d, didx) => {
              const dRowKey = +d[rowKey];
              const rowKeyOrIndex = rowKey ? dRowKey : didx;
              return (
                <>
                <label for={rowChoosed ? `check+${rowKeyOrIndex}`: ''}  >
                  <tr
                    key={d.key}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderBottom: borderd ? "#999 1px solid" : "",
                      background: isColorIndex === didx ? "#eee" : "",
                      cursor:type?'pointer':''

                    }}
                    onMouseOver={() => getColor(didx)}
                    onMouseOut={() => getColor()}
                  >
                    {expandable && (
                      <span
                        style={{
                          display: "inline-block",
                          width: 20,
                          cursor: "pointer",
                          marginLeft: "10px"
                        }}
                        onClick={() => _onExpand(rowKeyOrIndex, rowKey)}
                      >
                        {expandable.rowExpandable(d) &&
                          (isExpend[rowKeyOrIndex] ? "-" : "+")}
                      </span>
                    )}

                    {type && (
                      <input
                        type={type}
                        checked={selectedRowKeys.includes(rowKeyOrIndex)}
                        onChange={() => onSelectChange(rowKeyOrIndex)}
                        name="radio"
                        id={`check+${rowKeyOrIndex}`}
                        className="form-check-input bounce"
                        style={{
                          marginLeft: 10
                        }}
                      />
                    )}

                    {columns.map(c => (
                 
                      <td key={didx} style={{ width: (c && c.width) || 120 }}>
                        {renderSource(c, d, didx)}
                      </td>
                    ))}
                  </tr>
                  </label>
                  {/* 展开行 */}
                  {expandable && expandable && isExpend[rowKeyOrIndex] && (
                    <tr
                      style={{
                        borderBottom: borderd ? "#999 1px solid" : "",
                        height:40
                      }}
                    >
                      <td colspan={columns.length + 1}>
                        {expandable && expandable.expandedRowRender(d)}
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </div>
      </table>
    </div>
  );
}

export default RTable;
