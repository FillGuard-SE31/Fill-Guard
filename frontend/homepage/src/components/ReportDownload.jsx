// //frotend/homepage/src/components/ReportDownload.jsx
import React from "react";

const ReportDownload = ({ deviceId }) => {
  // Build the download URL using the deviceId (if provided)
  const downloadReport = () => {
    const url = deviceId
      ? `http://localhost:5002/api/report/pdf?deviceId=${deviceId}`
      : "http://localhost:5002/api/report/pdf";
    window.open(url, "_blank");
  };

  return (
    <button className="btn btn-primary" onClick={downloadReport}>
      📄 Download Sensor Report (PDF)
    </button>
  );
};

export default ReportDownload;