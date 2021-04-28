import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import HelloWorld from "./components/HelloWorld";
import LikeBtn from "./components/LikeBtn";
import ListenMouseEvent from "./components/ListenMouseEvent";
// import withLoader from './components/HigherOrderComponent'
import useURLLoader from "./hooks/useURLLoader";
import Loading from "./components/Loading";


interface IShowResult {
  message: string;
  status: string;
}

const DogShow: React.FC<{ data: IShowResult }> = ({ data }) => {
  return (
    <>
      <h2>Dog show : {data && data.status}</h2>
      <img src={data && data.message} alt="" />
    </>
  );
};
console.log(DogShow);
const App: React.FC = () => {
  const [show, setShow] = useState(true);
  // 高阶组件写法
  // const WrappedDogShow = withLoader(DogShowL,'https://dog.ceo/api/breeds/image/random')
  // userURLLoading
  const [data, loading] = useURLLoader(
    "https://dog.ceo/api/breeds/image/random"
  );
  const dogResult = data as IShowResult;
  console.log(dogResult, "dogResult");
  console.log(loading, "loading111");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <button onClick={() => setShow(!show)}>是否显示鼠标点击坐标特效</button>
        <HelloWorld msg="hello world" />
        <LikeBtn />
        {show && <ListenMouseEvent />}

        {/*高阶组件展示网络请求loading */}
        {/*<WrappedDogShow/>*/}
        {/**hooks写的loading */}
        {/*
             <DogShowL data={dogResult}/>
           */}
        {loading ? <Loading /> : <DogShow data={dogResult} />}
      </header>
    </div>
  );
};

export default App;
