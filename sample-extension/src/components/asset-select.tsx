import React from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import "../../style/asset-selector.css";

function Dropzone() {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone();

  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
      <div {...getRootProps({ className: "dropzone" })}>
        <input className="input-zone" {...getInputProps()} />
        <div className="text-center">
        <span>{isDragActive ? "📂" : "📁"}</span>
        <p>Drag'n'drop images, or click to select files</p>
          <button type="button" className="btn">
           Select files
          </button>
        </div>
      
      <aside>
        <ul>{files}</ul>
      </aside>
      </div>
  );
}

export default Dropzone;
