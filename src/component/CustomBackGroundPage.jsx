import React, { useRef, useState } from 'react';
import './custombackground.css';

export default function CustomBackgroundPage() {
  const imageInputRef = useRef(null);
  const bgInputRef = useRef(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);

  const handleButtonClick = () => {
    imageInputRef.current.click();
  };

  const handleBackgroundClick = () => {
    bgInputRef.current.click();
  };

  const handleFileChange = async () => {
    const imageFile = imageInputRef.current.files[0];
    const bgFile = bgInputRef.current.files[0];

    if (!imageFile || !bgFile) {
      alert("Please select both image and background.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("background", bgFile);

    try {
      const response = await fetch("http://192.168.1.149:5000/custom-bg", {
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
    <div className="customBackgroundContainer">
      <div className="heroContent">
        <h4>Remove.bg – Add a Custom Background in One Click</h4>
        <h1>
          Custom Background: <br />
          Add Any Background to Your Image Instantly
        </h1>
        <div className="previewImage">
        <img src="download.jpeg" alt="Custom Background Preview" />
      </div>
        <button className="customBtn" onClick={handleButtonClick}>
          Upload Image
        </button>
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <button className="customBtn" onClick={handleBackgroundClick} style={{ marginTop: "10px" }}>
          Upload Background
        </button>
        <input
          type="file"
          accept="image/*"
          ref={bgInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {processedImageUrl && (
          <div className="result-box">
            <h4>Custom Background Applied:</h4>
            <img
              src={processedImageUrl}
              alt="Custom Background Result"
              style={{ maxWidth: "100%", borderRadius: "10px", marginTop: "10px" }}
            />
            <a
              href={processedImageUrl}
              download="custom_background.png"
              style={{ display: "block", marginTop: "10px" }}
            >
              ⬇ Download Image
            </a>
          </div>
        )}
      </div>

    
    </div>
  );
}
