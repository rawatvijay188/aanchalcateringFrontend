import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import jsPDF from "jspdf";
import lambdaCall from "../helper/LambdaCall";
import autoTable from "jspdf-autotable";

const ViewBill = (props) => {
  const [invoiceData, setInvoiceData] = useState({});

  useEffect(() => {
    async function BillDetails() {
      var body = {
        service: "get_bill_by_id",
        billId: props.billId,
      };
      console.log(body)
      var data = await lambdaCall(body);
      setInvoiceData(data.data[0]);
    }
    BillDetails();
  }, [props.billId]);

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Invoice Details";

    doc.text(title, marginLeft, 40);

    const headers = ["Description", "Quantity", "Rate", "Amount"];
    const data = invoiceData.items.map((item) => [
      item.description,
      item.quantity,
      item.rate,
      item.amount,
    ]);

    const content = {
      startY: 50,
      head: [headers],
      body: data,
    };

    // Use the autotable plugin to generate the table
    autoTable(doc, content);

    doc.text(
      `Subtotal: ${invoiceData.amount_details.subtotal}`,
      marginLeft,
      doc.previousAutoTable.finalY + 50
    );
    doc.text(
      `Total: ${invoiceData.amount_details.total}`,
      marginLeft,
      doc.previousAutoTable.finalY + 80
    );
    doc.text(
      `Advance: ${invoiceData.amount_details.advance}`,
      marginLeft,
      doc.previousAutoTable.finalY + 110
    );
    doc.text(
      `Balance: ${invoiceData.amount_details.balance}`,
      marginLeft,
      doc.previousAutoTable.finalY + 140
    );

    doc.save("invoice.pdf");
  };

  return (
    <div>
      <h2>Invoice Details</h2>
      {Object.keys(invoiceData).length > 0 && (
        <>
          <p>Invoice Date: {invoiceData.date}</p>
          <p>Customer Name: {invoiceData.customer_name}</p>
          <p>Client GST: {invoiceData.gst}</p>

          <h3>Items</h3>

          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData?.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{item.rate}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h3>Financial Summary</h3>
          <p>Subtotal: {invoiceData.amount_details.subtotal}</p>
          <p>Total: {invoiceData.amount_details.total}</p>
          <p>Advance: {invoiceData.amount_details.advance}</p>
          <p>Balance: {invoiceData.amount_details.balance}</p>
        </>
      )}

      <Button onClick={exportPDF}>Print PDF</Button>
    </div>
  );
};

export default ViewBill;
