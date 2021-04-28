import React, { useState, useEffect } from "react";
import ContentInfo from "../component/ContentInfo";
import { Button,Animation } from "rockui";

interface Props {
  history: any;
}

let timer: any
const Index: React.FC<Props> = (props) => {
  let localData = localStorage.getItem("resume_content");
  let initData: any[] = localData ? JSON.parse(localData) : [];

  let [currentId, setCurrentId] = useState<number>(-1);

  useEffect(() => {
    const id = props.history.location.search.replace(/\?id=+/, "");
    if(!id)return
    if(id>initData.length){
      props.history.push("/resume/preview?id=" + 0);
    }
    setCurrentId(Number(id));
    setTimeFun()
    return ()=>{
      clearTimeout(timer)
    }
  }, [currentId]);

  const setTimeFun=()=>{
    timer = setTimeout(()=>{
      handleBtn('next')
    },3000)
  }

  // 导出
  const exportFile = (name: string) => {
    let outerHTMl = document.documentElement.outerHTML;
    let urlObject = window.URL || window.webkitURL || window;
    // 创建blob对象，解析流数据
    let export_blob = new Blob([outerHTMl]);
    // let export_blob = new Blob([outerHTMl],{type:'application/pdf;chartset=UTF-8'})
    // type word则为word，excel为excel
    let save_link = document.createElement("a");
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    fake_click(save_link);
  };
  // 点击下载
  const fake_click = (obj: HTMLAnchorElement) => {
    let ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    obj.dispatchEvent(ev);
  };

  // 控制幻灯片上下张
  const handleBtn = (type: string) => {
    let cuId: number;
    if(type==='return'){
      props.history.push("/resume")
      return
   }
    if (type === "prev") {
      cuId = currentId > 0 ? currentId - 1 : 0;
      currentId === 0 && alert("已经是第一张了");
    } else {
      cuId =
        currentId + 1 < initData.length - 1
          ? currentId + 1
          : initData.length - 1;
      let c = currentId + 1;
      console.log(c,'cc');
      console.log(initData.length,'initData.length');
      c === initData.length && alert("已经是最后一张了") && clearTimeout(timer);
    }
    setCurrentId(cuId);
    props.history.push("/resume/preview?id=" + cuId);
  };

  return (
    <div className="resume_wrapper">
      {currentId < 0 && (
        <div className="box_wrapper">
          <h2>简历预览</h2>
          {initData.map((item, index) => {
            return (
              <div key={index}>
                <ContentInfo
                  type={item.type}
                  content={initData[index].content}
                  isEdit={false}
                />
              </div>
            );
          })}
          <div className="resumen_preview_right_wrapper">
            <Button onClick={() => exportFile("resume.html")}>
              导出html文件
            </Button>
          </div>
        </div>
      )}
      {currentId >= 0 && (
        <Animation changeChild={true}>
        <div className="box_wrapper">
          <h3>幻灯片</h3>
          <ContentInfo
            type={initData[currentId]?.type}
            content={initData[currentId]?.content}
            isEdit={false}
          />
          <Button onClick={() => handleBtn("prev")}>上一张</Button>
          <Button onClick={() => handleBtn("next")}>下一张</Button>
          <Button onClick={() => handleBtn("return")}>返回</Button>
        </div>
        </Animation>
      )}
    </div>
  
  );
};

export default Index;
