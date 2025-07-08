import React, { useRef, useState } from "react";
import "./backgroundremoval.css";

export default function BackgroundRemovalPage() {
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

      // Convert blob to base64 string
      const reader = new FileReader();
      reader.onloadend = () => {
        setProcessedImageUrl(reader.result); // base64 string
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed: " + error.message);
    }
  };

  return (
    <div>
      <div className="backgroundPage">
        <h2>Erase image background</h2>
        <h1>
          Make the Background <br /> Transparent for Graphics and More
        </h1>
        <button className="removeBtn" onClick={handleButtonClick}>
          Remove Background
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
        {/* Image src updated with absolute path from public */}
        <img src="/12.jpeg" alt="preview showing background removal" />
      </div>

      {processedImageUrl && (
        <div className="result-box">
          <h4>Processed Image (Background Removed):</h4>
          <img
            src={processedImageUrl}
            alt="background removed result"
            style={{
              maxWidth: "100%",
              borderRadius: "8px",
              marginTop: "10px",
            }}
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
  );
}
