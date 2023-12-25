import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportToExcel = ({ jsonData, organiser, date }) => {
  let sheetNames = [
    "ration",
    "dress",
    "dairy",
    "bakery",
    "paani",
    "burf",
    "stall",
    "sbji",
    "other",
  ];

  const removePriceKeys = (obj) => {
    return Object.keys(obj).reduce((acc, key) => {
      if (!key.includes("price")) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    debugger;
    let count = 0;
    jsonData.forEach((dataset, index) => {
      if (dataset && Object.keys(dataset[0]).length > 0) {
        // dataset =removePriceKeys(dataset)
        const transposedData = transposeData(dataset);
        const worksheet = XLSX.utils.json_to_sheet(transposedData, {
          header: Object.keys(transposedData[0]),
        });
        let sheetName = sheetNames[index];
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        count++;
      }
    });
    if (count) {
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const excelData = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(excelData, organiser + "_" + date + ".xlsx");
    }
  };

  const transposeData = (data) => {
    const transposedData = [];
    const headers = Object.keys(data[0]);

    headers.forEach((header) => {
      const rowData = [header];

      data.forEach((row) => {
        rowData.push(row[header]);
      });

      transposedData.push(rowData);
    });

    return transposedData;
  };

  return <button onClick={exportToExcel}>Export to Excel</button>;
};

export default ExportToExcel;
