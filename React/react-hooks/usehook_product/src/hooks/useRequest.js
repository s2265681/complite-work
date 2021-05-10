import { useState, useEffect } from "react";
/*
 * useRequest 自定义Hook 用来请求远程接口
 * @params url String
 * @return Array [data,options,setOptions]
 */

function useRequest(url,initOptions) {
  let [options, setOptions] = useState(Object.assign({
    currentPage: 1,
    pageSize: 5,
  },initOptions));
  let [data, setData] = useState({
    totalPage: 0,
    list: [],
  });
  // 调用接口，返回数据
  function getData() {
    let { currentPage, pageSize } = options;
    fetch(`${url}?currentPage=${currentPage}&pageSize=${pageSize}`)
      .then((res) => res.json())
      .then((res) => {
        setData({ ...res });
      });
  }
  //* 依赖项 options 或者 url发生变化 会重新发送请求/ 
  useEffect(getData, [options, url]);
  return [data, options, setOptions];
}
export default useRequest;
