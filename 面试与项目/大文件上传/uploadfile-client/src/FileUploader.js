import { InboxOutlined, FileOutlined } from "@ant-design/icons";
import "./FileUploader.css";
import useDrag from "./hooks/useDrag";
import { useRef } from "react";

const FileUploader = () => {
  const uploadContainerRef = useRef(null);
  const { filePreview } = useDrag(uploadContainerRef);

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

  return (
    <div className="upload-container" ref={uploadContainerRef}>
      {renderFilePreview(filePreview)}
    </div>
  );
};
export default FileUploader;
