//frotend/homepage/src/components/ReportDownload.jsx
import React from "react";

const ReportDownload = () => {
  // Trigger the PDF report download by opening the endpoint in a new window/tab
  const downloadReport = () => {
    window.open("http://localhost:5002/api/report/pdf", "_blank");
  };

  return (
    <div className="text-center my-3">
      <button className="btn btn-primary" onClick={downloadReport}>
        Download PDF Report
      </button>
    </div>
  );
};

export default ReportDownload;