import React, { useRef, useState } from "react";
import "./magicbrush.css";

export default function MagicBrushPage() {
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
      const response = await fetch("http://192.168.1.149:5000/blur-bg", {
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
    <div className="magicBrushContainer">
      <div className="heroSection">
        <h4>Remove.bg - Blurring the background object has never been easier</h4>
        <h1>
          Blur Background: <br />
          Easily Remove or Restore Anything in the Image
        </h1>
        <button className="ctaBtn" onClick={handleButtonClick}>
          Try Blur Background
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      <div className="imagePreview">
        <img src="/blur.jpeg" alt="Magic Brush Demo" />
      </div>

      {processedImageUrl && (
        <div className="result-box">
          <h4>Processed Image (Blur Applied):</h4>
          <img
            src={processedImageUrl}
            alt="Processed"
            style={{ maxWidth: "100%", borderRadius: "8px", marginTop: "10px" }}
          />
          <a
            href={processedImageUrl}
            download="blurred_background.png"
            style={{ display: "block", marginTop: "10px" }}
          >
            ⬇ Download Image
          </a>
        </div>
      )}
    </div>
  );
}
