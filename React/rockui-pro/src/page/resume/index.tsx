import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bg, Button, Icon } from "rockui";
import DragSortCom from "../../components/DragSortCom";
import ContentInfo from "./component/ContentInfo";
import { Menu } from "rockui";
import { btnlayout, elementComponent, colorPicker } from "./common";

const { MenuItem, SubMenu } = Menu;

interface Props {
  name: string;
}
const Index: React.FC<Props> = (props) => {
  let localData = localStorage.getItem("resume_content");
  let initData: any[] = localData ? JSON.parse(localData) : [];
  const [content, setContent] = useState<any[]>(initData);
  // 设置组件拖拽
  const [activeId, setActiveId] = useState<number>(-1);
  // 获取浏览器存储的数据
  useEffect(() => {
    localStorage.setItem("resume_content", JSON.stringify(content));
  }, [content]);

  // 添加组件
  const handleChoose = (type?: string) => {
    let data = { type: type, content: ["添加内容"] };
    setContent([...content, data]);
    let anchorEnd = document.getElementById("anchorEnd");
    if (anchorEnd)
      anchorEnd.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  // 选择组件操作
  const handleContent = (type: string, index: number, valNode?: any) => {
    if (type === "two-column") {
      let leftVal = valNode.children[0].innerText;
      let rightVal = valNode.children[1].innerText;
      content[index].content = [leftVal, rightVal];
    } else {
      content[index].content = [valNode.innerHTML];
    }
    setContent([...content]);
  };

  // 删除
  const handleDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    index: number
  ) => {
    e.stopPropagation();
    setContent([...content.filter((item, idx) => idx !== index)]);
  };

  // 选择文字鼠标抬起
  const getSelectionMessage = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
     if(!document.getSelection()?.anchorNode) return;
     let selector :any = document.getSelection();
    //  let beforeNum = selector?.
       console.log(selector?.extentNode,'anchorNode>>');

  };

  // 设置文字颜色
  const handleStyle = (key: string, value: string) => {
    // let oldStr = content[currentIndex].content;
    // let beforetxt:string = ''
    // if(oldStr.includes('span')){
    //   beforetxt = oldStr.split('>').slice(0.-1).join('')
    // }
    // let newArr = _.cloneDeep(selectStr)
  };

  // 组件放置触发的事件
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    let newCon = content[index].content[0].concat(elementComponent[activeId]);
    content[index].content[0] = newCon;
    setContent([...content]);
  };

  return (
    <div className="resume_wrapper">
      <div className="resume_left_wrapper">
        <Menu mode="vertical" defaultIndex={"0"}>
          <SubMenu title="选择布局">
            {btnlayout.map((item) => (
              <MenuItem key={item.key}>
                <Button onClick={() => handleChoose(item.key)}>
                  {item.name}
                </Button>
              </MenuItem>
            ))}
          </SubMenu>
          <SubMenu title="拖拽组件">
            {elementComponent.map((key, index) => (
              <MenuItem>
                <div
                  dangerouslySetInnerHTML={{ __html: key }}
                  draggable="true"
                  onDragStart={() => setActiveId(index)}
                  onDragEnd={() => setActiveId(-1)}
                />
              </MenuItem>
            ))}
          </SubMenu>
        </Menu>
      </div>
      <div className="resume_right_wrapper">
        <div className="resume_edit_wrapper">
          编辑区
          {content.map((item, index) => {
            return (
              <DragSortCom
                Data={content}
                setList={setContent}
                index={index}
                lineHeight={200}
                onMouseUp={(e)=>getSelectionMessage(e)}
              >
                <div key={item.typeId}>
                  <Icon
                    onMouseDown={(e) => {
                      handleDelete(e, index);
                    }}
                    icon="times-circle"
                    size="1x"
                    className="resume_delete_btn"
                  />
                  <ContentInfo
                    type={item.type}
                    onChange={(valNode) =>
                      handleContent(item.type, index, valNode)
                    }
                    content={content[index].content}
                    handleSelectMouseUp={(e) => getSelectionMessage(e)}
                    onDrop={(e) => handleDrop(e, index)}
                  />
                </div>
              </DragSortCom>
            );
          })}
          <div id="anchorEnd" style={{ visibility: "hidden" }}>
            通过锚点方式配合scrollIntoView实现平滑向下滚动
          </div>
        </div>
        <div className="preview_wrapper">
          <div className="btn_preview">
            <Link to="/resume/preview">
              <Button btnType="primary">预览</Button>
            </Link>
            <br />
            <Link to="/resume/preview?id=0">
               <Button btnType="primary">幻灯片预览</Button>
            </Link>
            <br />
            <Button btnType="primary" onClick={() => setContent([])}>
              清空
            </Button>
          </div>
          <div>
            操作面板
            <br />
            {colorPicker.map((el) => (
              <Button
                key={el.id}
                onClick={() => handleStyle("color", el.color)}
              >
                {el.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
