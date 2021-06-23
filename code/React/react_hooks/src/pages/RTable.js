import React, { useState, useEffect } from "react";
import RTable from "../components/RTable/index";

const dataSource = [
  {
    id: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
    type: 1,
    description:'胡彦斌是西湖区湖底公园1号的'
  },
  {
    id: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
    type: 2,
    description:'胡彦祖是西湖区湖底公园1号的'
  },
  {
    id: "3",
    name: "王祖蓝",
    age: 22,
    address: "西湖区湖底公园1号",
    type: 3,
    description:'王祖蓝是西湖区湖底公园1号的'
  },
  {
    id: "4",
    name: "王祖蓝",
    age: 22,
    address: "西湖区湖底公园1号",
    type: 3,
    description:'王祖蓝是西湖区湖底公园1号的'
  },
  {
    id: "5",
    name: "王祖蓝",
    age: 22,
    address: "西湖区湖底公园1号",
    type: 3,
    description:'王祖蓝是西湖区湖底公园1号的'
  }
];

// columns
const columns1 = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
    sorter: {
      compare: (a, b) => a.age - b.age
    }
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
    render(t, r, i) {
      // console.log(t,r,i)
      return (
        <span style={{ color: "#f00" }}>
          {t === 1 ? "蔬菜" : t === 2 ? "水果" : "主食"}
        </span>
      );
    }
  }
];


  
const Index = () => {
  // 设置选中类型
  const [selectionType, setSelectionType] = useState("checkbox");
  // 设置选中的key
  const [selectedRowKeys, setSelectKeys] = useState([]);
  // 设置Table样式
  const [tableStyle, setTableStyle] = useState({ borderd: true });
  // 设置loading
  const [isLoading, setLoading] = useState(false);
  // 是否添加滤镜
  const [isTheme, setTheme] = useState(false);
  // 添加删除数据
  const [_dataSource, setDataSource] = useState(dataSource);
  // 设置table是否展开
  const [isExtend,setExtend] = useState(true);

  // columns
  const columns2 = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      width: 120,
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      width: 120,
      sorter: {
        compare: (a, b) => a.age - b.age
      }
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      width: 120,
      render(t, r, i) {
        // console.log(t,r,i)
        return (
          <span style={{ color: "#f00" }}>
            {t === 1 ? "蔬菜" : t === 2 ? "水果" : "主食"}
          </span>
        );
      }
    },
    {
      title: "操作",
      dataIndex: "work",
      key: "work",
      width: 120,
      fixed: 'right',
      render(t, r, i) {
        // console.log(t,r,i)
        return (
          <span style={{ color: "#00f" }} onClick={deleteRow.bind(this,r.id)}>
            删除
          </span>
        );
      }
    }
  ];

  
  // 每次selectionType变化时候,清空selectedRowKeys
  useEffect(() => {
    setSelectKeys([]);
  }, [selectionType]);

  // 添加一行
  function addRow() {
    let newData = [
      ..._dataSource,
      {
        id: String( _dataSource.length+1),
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号",
        type: 1,
        description:'王祖蓝是西湖区湖底公园1号的'
      }
    ];
    console.log(newData, "newData");
    setDataSource(newData.slice());
  }

  // 删除一行
  function deleteRow(id) {
    console.log(id, "dd");
    let res = _dataSource.filter(e => e.id !== id);
    console.log(res, "res");
    setDataSource(res.slice());
  }

  // 展开行 [key]
  function onExpand(key){
     console.log(key,'arr key isexpend')
  }

  console.log("chooseKey", selectedRowKeys);
  console.log(_dataSource, "_dataSource");
  return (
    <div style={{display:'flex'}}>

    <div className="left">
      <h2>React hooks仿Antd组件开发---Table组件</h2>
      <h3>已实现的功能</h3>
      <ul>
        <li>选中状态，自定义实现</li>
        <li>点击行是否选中rowChoosed</li>
        <li>根据字段排序sorter</li>
        <li>数据返回值render渲染处理</li>
        <li>实现table加border，空着table样式</li>
        <li>实现鼠标悬浮改变当前行样式</li>
        <li>页面是否加载中loading</li>
        <li>新增删除一行</li>
        <li>实现可展开功能</li>
        <li>Table、scroll滚动</li>
        <li>引用aqua初步美化样式</li>
      </ul>
      <h3>未实现的功能</h3>
      <ul>
        <li>实现左右栏定位+滑动浏览</li>
        <li>实现一个自定义筛选filterDropdown</li>
        <li>实现单元格可编辑功能</li>
        <li>表格的分页设置</li>
      </ul>
      <br />
    </div>
    <div className="right">
      {/* Table1 实现了切换选中类型，sorter排序，render渲染处理*/}
      <div className="Table1">
        <h3>Table1</h3>
        <div>
          <button onClick={() => setSelectionType("checkbox")}>checkbox</button>
          <button onClick={() => setSelectionType("radio")}>radio</button>
          <button onClick={() => setSelectionType()}>无</button>
          <br />
        </div>
        <br />
        <RTable
          dataSource={dataSource}
          columns={columns1}
          rowSelection={{
            type: selectionType,
            selectedRowKeys,
            rowKey: "id",
            rowChoosed:true,
            onChange: selectedRowKeys => setSelectKeys(selectedRowKeys)
          }}
        />
      </div>
      <br />
      {/* Table2 实现了切换样式*/}
      <div className="Table2">
        <h3>Table2</h3>
        <div>
          <button
            onClick={() => setTableStyle({ borderd: !tableStyle.borderd })}
          >
            添加\取消边框
          </button>
          <button onClick={() => setLoading(!isLoading)}>
            设置\取消loading
          </button>
          <button onClick={() => setTheme(!isTheme)}>是否添加滤镜</button>
          <button onClick={() => addRow()}>添加一行</button>
          <button onClick={() => setExtend(!isExtend)}>设置/取消展开行</button>

        </div>
        <br />
        <RTable
          dataSource={_dataSource}
          columns={columns2}
          borderd={tableStyle.borderd}
          loading={isLoading}
          isTheme={isTheme ? "sepia(.6)" : ""}
          expandable = {isExtend?{ 
            expandedRowRender: record => <span style={{color:'rgb(100, 155, 0)'}}>{record.description}</span>,
            onExpand:(key)=>onExpand(key),
            rowExpandable: record => record.name !== '王祖蓝',
           }:''}
          scroll={{ y: 150  }} 
        />
      </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
      </div>
    </div>
  );
};

export default Index;
