import { InboxOutlined } from "@ant-design/icons";
import "./FileUploader.css";
import useDrag from "./hooks/useDrag";
import { useRef, useState } from "react";
import { Button, message, Progress } from "antd";
import { getFileName, uploadFile } from "./utils";
import { UploadStatus } from "./constant";

const FileUploader = () => {
  const uploadContainerRef = useRef(null);
  const { selectedFile, filePreview, resetFileStatus } =
    useDrag(uploadContainerRef);
  const [uploadProgress, setUploadProgress] = useState({});

  const [uploadStatus, setUploadStatus] = useState(UploadStatus.NOT_STARTED);
  const [cancelTokens, setCancelTokens] = useState([]);

  function renderFilePreview(filePreview) {
    if (filePreview?.url) {
      if (filePreview.type.startsWith("video/")) {
        return <video src={filePreview.url} alt="Preview" controls />;
      } else if (filePreview.type.startsWith("image/")) {
        return <img src={filePreview.url} alt="Preview" />;
      } else {
        return filePreview.url;
      }
    } else {
      return <InboxOutlined />;
    }
  }

  const resetAllStatus = () => {
    resetFileStatus();
    setUploadProgress({});
    setUploadStatus(UploadStatus.NOT_STARTED);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      message.error("请先选择一个文件");
      return;
    }
    setUploadStatus(UploadStatus.UPLOADING);
    const filename = await getFileName(selectedFile);
    await uploadFile(
      selectedFile,
      filename,
      setUploadProgress,
      resetAllStatus,
      setCancelTokens
    );
  };

  const pauseUpload = () => {
    setUploadStatus(UploadStatus.PAUSED);
    cancelTokens.forEach((cancelToken) => cancelToken.cancel("用户取消上传"));
  };

  const renderButton = () => {
    switch (uploadStatus) {
      case UploadStatus.NOT_STARTED:
        return <Button onClick={handleUpload}>上传</Button>;
      case UploadStatus.UPLOADING:
        return <Button onClick={pauseUpload}>暂停</Button>;
      case UploadStatus.PAUSED:
        return <Button onClick={handleUpload}>恢复上传</Button>;
      default:
        return null;
    }
  };

  const renderProgress = () => {
    if (uploadStatus !== UploadStatus.NOT_STARTED) {
      return Object.keys(uploadProgress).map((chunkName, index) => (
        <div key={chunkName}>
          <span>切片{index}:</span>
          <Progress percent={uploadProgress[chunkName]} />
        </div>
      ));
    }
  };

  return (
    <>
      <div className="upload-container" ref={uploadContainerRef}>
        {renderFilePreview(filePreview)}
      </div>
      {/* {isCalculatingFileName&&<Spin tip={<span>正在计算文件名...</span>}><span>正在计算文件名...</span></Spin>} */}
      {renderButton()}
      {renderProgress()}
    </>
  );
};
export default FileUploader;
