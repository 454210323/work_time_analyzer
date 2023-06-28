import React from "react";
import { Button, message } from "antd";
import { API_URL } from "../configs/config";

const DownloadButton = ({ team_id, selectedMonth }) => {
  const downloadFile = () => {
    fetch(
      `${API_URL}/work_data/month/excel?team_id=${team_id}&date=${selectedMonth}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        // the filename you want
        a.download = `${selectedMonth}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        message.success("Your file has downloaded!");
      })
      .catch((error) => {
        message.error("There has been a problem with your fetch operation:");
      });
  };

  return (
    <Button type="primary" onClick={downloadFile}>
      Download
    </Button>
  );
};

export default DownloadButton;
