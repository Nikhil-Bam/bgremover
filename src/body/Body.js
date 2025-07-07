import React, { useRef, useState } from "react";
import "./body.css";

export default function Body() {
  const fileInputRef = useRef(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://192.168.1.149:5000/remove-bg", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setProcessedImageUrl(imageUrl);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed: " + error.message);
    }
  }; 
  
  return (
    <div className="hero-container">
      <div className="hero-left">
        <img
          src="img/images.jpeg"
          alt="Sample"
          className="hero-image"
        />
      </div>

      <div className="hero-right">
        <div className="upload-box">
          <button className="upload-btn" onClick={handleButtonClick}>
            Upload Image
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <p className="upload-info">
            or drop a file, <span className="upload-link">paste image</span> or{" "}
            <span className="upload-link">URL</span>
          </p>

          {processedImageUrl && (
            <div className="result-box">
              <h4>Processed Image (Background Removed):</h4>
              <img
                src={processedImageUrl}
                alt="Processed"
                style={{ maxWidth: "100%", borderRadius: "8px", marginTop: "10px" }}
              />
              <a
                href={processedImageUrl}
                download="background_removed.png"
                style={{ display: "block", marginTop: "10px" }}
              >
                ⬇ Download Image
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="hero-text">
        <h1>Remove Image Background</h1>
        <p>
          100% Automatically and <span className="free-tag">Free</span>
        </p>
      </div>
    </div>
  );
}
