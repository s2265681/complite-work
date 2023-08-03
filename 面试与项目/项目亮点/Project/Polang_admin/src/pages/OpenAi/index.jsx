import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./index.css";

function OpenAI() {
  // 定义三个 state 变量，分别表示输入框中的提示，生成的结果图片 URL 和加载状态
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // 创建 Configuration 实例，用于配置 OpenAI API 的 API Key
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  // 创建 OpenAIApi 实例，用于和 OpenAI API 进行交互
  const openai = new OpenAIApi(configuration);

  // 定义生成图片的异步函数
  const generateImage = async () => {
    setLoading(true); // 开始请求，将加载状态设为 true
    // 发送请求并等待响应结果，结果中包含了生成的图片的 URL
    const response = await openai.createImage({
      prompt: prompt, // 提示文本
      n: 1, // 生成图片的数量
      size: "512x512", // 生成图片的大小
    });
    setLoading(false); // 请求结束，将加载状态设为 false
    setResult(response.data.data[0].url); // 将响应结果中的图片 URL 存储到 state 变量 result 中
  };

  // 返回应用程序的 UI
  return (
    <div className="app">
      <h1>ReactAI 图片生成器</h1>
      {loading ? ( // 如果正在加载，则显示“图片生成中...”的提示
        <h2> 正在生成图像，请稍候！</h2>
      ) : (
        <></>
      )}
      <div className="card">
        <textarea
          className="text-input"
          placeholder="输入提示词"
          onChange={(e) => setPrompt(e.target.value)} // 当文本框的值改变时，更新 state 变量 prompt
          row="5"
          cols="50"
        />
        <button className="button" onClick={generateImage}>
          生成图片
        </button>{" "}
        {/* 点击按钮时，调用异步函数 generateImage */}
        {result.length > 0 ? ( // 如果有生成的图片，则显示图片
          <img className="result-image" src={result} alt="Generated Image" />
        ) : (
          <></>
        )}
      </div>
      <p className="footer">Powered by OpenAI</p>
    </div>
  );
}

export default OpenAI;
