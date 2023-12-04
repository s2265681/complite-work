import { CHUNK_SIZE } from "./constant";
import axiosInstance from "./axiosInstance";
import { message } from "antd";
import axios from "axios";

// 获取文件的hash name
export const getFileName = async (file) => {
  const fileHash = await calculateHash(file);
  const fileExtension = file.name.split(".").pop();
  return `${fileHash}.${fileExtension}`;
};

async function calculateHash(file) {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
  return bufferToHex(hashBuffer);
}

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// 上传
export async function uploadFile(
  file,
  filename,
  setUploadProgress,
  resetAllStatus,
  setCancelTokens
) {
  const { needUpload } = await axiosInstance.get(`/verify/${filename}`);
  if (!needUpload) {
    message.success("文件已存在，秒传成功");
    return resetAllStatus();
  }
  //把在文件进行切片
  const chunks = createFileChunks(file, filename);
  const newCancelTokens = [];
  //实现并行上传
  const requests = chunks.map(({ chunk, chunkFileName }) => {
    const cancelToken = axios.CancelToken.source();
    console.log(cancelToken, "cancelToken");
    newCancelTokens.push(cancelToken);
    createRequest(
      filename,
      chunkFileName,
      chunk,
      setUploadProgress,
      cancelToken
    );
  });
  try {
    setCancelTokens(newCancelTokens);
    await Promise.all(requests);
    await axiosInstance.get(`/merge/${filename}`);
    message.success("上传完成");
    resetAllStatus();
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("上传暂停");
      message.error("上传暂停");
    } else {
      console.error("上传出错:", error);
      message.error("上传出错");
    }
  }
}

async function createRequest(
  filename,
  chunkFileName,
  chunk,
  setUploadProgress,
  cancelToken
) {
  return axiosInstance.post(`/upload/${filename}`, chunk, {
    headers: {
      "Content-Type": "application/octet-stream",
    },
    params: {
      chunkFileName,
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setUploadProgress((prevProgress) => ({
        ...prevProgress,
        [chunkFileName]: percentCompleted,
      }));
    },
    cancelToken: cancelToken.token,
  });
}

function createFileChunks(file, filename) {
  let chunks = [];
  window.file = file;
  let count = Math.ceil(file.size / CHUNK_SIZE);
  for (let i = 0; i < count; i++) {
    let chunk = file.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
    chunks.push({
      chunk,
      chunkFileName: `${filename}-${i}`,
    });
  }
  return chunks;
}
