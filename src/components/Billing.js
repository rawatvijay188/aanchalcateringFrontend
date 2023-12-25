import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import lambdaCall from "../helper/LambdaCall";
import moment from "moment/moment";
const Billing = (props) => {
  const [invoiceData, setInvoiceData] = useState({
    date: "",
    customerName: "",
    gstNo: "",
    items: [{ sno: 1, description: "", quantity: 0, rate: 0, amount: 0 }],
  });

  const [billHistory, setBillHistory] = useState([]);
  const [filteredBillHistory, setFilteredBillHistory] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [balance, setBalance] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState({
    column: "",
    ascending: true,
  });
  const handleSort = (column) => {
    const isAscending = sortOrder.column === column && sortOrder.ascending;
    setSortOrder({
      column,
      ascending: !isAscending,
    });

    const sortedData = [...filteredBillHistory].sort((a, b) => {
      const valueA = a.amount_details[column];
      const valueB = b.amount_details[column];

      if (isAscending) {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });

    setFilteredBillHistory(sortedData);
  };

  useEffect(() => {
    // Calculate Subtotal
    const calculatedSubtotal = invoiceData.items.reduce(
      (acc, item) => acc + item.amount,
      0
    );
    setSubtotal(calculatedSubtotal);

    // Calculate Total (Subtotal + Other Charges, if any)
    setTotal(calculatedSubtotal);

    // Recalculate Balance
    setBalance(calculatedSubtotal - advance);
  }, [invoiceData.items, advance]);

  const handleInputChange = (field, value) => {
    setInvoiceData({ ...invoiceData, [field]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoiceData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };

    setInvoiceData({ ...invoiceData, items: updatedItems });

    const amount = updatedItems[index].quantity * updatedItems[index].rate;

    updatedItems[index].amount = amount;
    setInvoiceData({ ...invoiceData, items: updatedItems });
  };

  const handleAddRow = () => {
    const newItem = {
      sno: invoiceData.items.length + 1,
      description: "",
      quantity: 0,
      rate: 0,
      amount: 0,
    };
    setInvoiceData({ ...invoiceData, items: [...invoiceData.items, newItem] });
  };
  const handleFetch = async () => {
    var body = {
      service: "bill_history",
      from_date: fromDate,
      to_date: toDate,
    };
    var data = await lambdaCall(body);
    setBillHistory(data.data);
    setFilteredBillHistory(data.data);
  };

  const handlePrintRow = (index, billId) => {
    props.setTabValue(10);
    props.setBillId(billId);
  };

  // const handleDeleteRow = async (index) => {
  //   const updatedItems = [...invoiceData.items];
  //   updatedItems.splice(index, 1);
  //   setInvoiceData({ ...invoiceData, items: updatedItems });
  // };
  const handleDeleteBill = async (index, billId) => {
    const updatedList = [...filteredBillHistory];
    updatedList.splice(index, 1);
    setFilteredBillHistory(updatedList);
    await lambdaCall({
      service: "remove_bill_by_id",
      billId,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var body = { ...invoiceData };
    body["amountDetails"] = {
      total,
      subtotal,
      advance,
      balance,
    };
    body["service"] = "add_bill";
    await lambdaCall(body);
    alert("Added Bill successfully");
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    var searchTerm = e.target.value;
    const filteredData = billHistory.filter((item) =>
      item.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBillHistory(filteredData);
  };

  return (
    <Container>
      <h1>Anchal Caterers Invoice</h1>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label column sm={2}>
            Customer Name:
          </Form.Label>
          {/* <Col sm={10}> */}
          <Form.Control
            type="text"
            value={invoiceData.customerName}
            onChange={(e) => handleInputChange("customerName", e.target.value)}
          />
          {/* </Col> */}
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label column sm={2}>
            Date:
          </Form.Label>
          {/* <Col sm={10}> */}
          <Form.Control
            type="date"
            value={invoiceData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
          />
          {/* </Col> */}
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label column sm={2}>
            Gst No:
          </Form.Label>
          {/* <Col sm={10}> */}
          <Form.Control
            type="text"
            value={invoiceData.gstNo}
            onChange={(e) => handleInputChange("gstNo", e.target.value)}
          />
          {/* </Col> */}
        </Form.Group>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index}>
              <td>{item.sno}</td>
              <td>
                <Form.Control
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "quantity",
                      parseFloat(e.target.value)
                    )
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  value={item.rate}
                  onChange={(e) =>
                    handleItemChange(index, "rate", parseFloat(e.target.value))
                  }
                />
              </td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={handleAddRow}>
        Add Row
      </Button>

      {/* Additional Table */}

      <Form.Group controlId="subtotal">
        <Form.Label>Sub Total:</Form.Label>
        <Form.Control
          type="number"
          value={subtotal}
          // onChange={(e) => {
          //   setSubtotal(parseFloat(e.target.value));
          // }}
        />
      </Form.Group>
      <Form.Group controlId="total">
        <Form.Label>Total:</Form.Label>
        <Form.Control
          type="number"
          value={total}
          // onChange={(e) => {
          //   setTotal(parseFloat(e.target.value));
          // }}
        />
      </Form.Group>
      <Form.Group controlId="advance">
        <Form.Label>Advance:</Form.Label>
        <Form.Control
          type="number"
          value={advance}
          onChange={(e) => {
            setAdvance(parseFloat(e.target.value));
          }}
        />
      </Form.Group>
      <Form.Group controlId="balance">
        <Form.Label>Balance:</Form.Label>
        <Form.Control
          type="number"
          value={balance}
          // onChange={(e) => {
          //   setBalance(parseFloat(e.target.value));
          // }}
          readOnly
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
        Submit
      </Button>
      <h2>Bill History</h2>
      <Form.Group as={Col} controlId="from_date">
        <Form.Label>From Date</Form.Label>
        <Form.Control
          type="date"
          onChange={(e) => setFromDate(e.target.value)}
          placeholder="Select From Date"
        />
      </Form.Group>
      <Form.Group as={Col} controlId="to_date">
        <Form.Label>To Date</Form.Label>
        <Form.Control
          type="date"
          onChange={(e) => setToDate(e.target.value)}
          placeholder="Select To Date"
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleFetch}>
        Fetch
      </Button>

      {filteredBillHistory && filteredBillHistory.length > 0 && (
        <>
          <Form.Group controlId="search">
            <Form.Label>Search Customer Name:</Form.Label>
            <Form.Control
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e)}
              placeholder="Enter customer name"
            />
            {/* <Button variant="primary" onClick={handleSearch}>
              Search
            </Button> */}
          </Form.Group>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Bill No</th>
                <th>Bill Date</th>
                <th>Client Name</th>
                {/* <th>Address</th>
              <th>Mobile No</th> */}
                <th>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("total")}
                  >
                    Bill Amount
                  </span>
                </th>
                <th>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("advance")}
                  >
                    Advance
                  </span>
                </th>
                <th>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("balance")}
                  >
                    Balance
                  </span>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBillHistory.map((item, index) => (
                <tr key={index}>
                  <td>{item.bill_no}</td>
                  <td> {moment(new Date(item.date)).format("DD-MM-YYYY")}</td>
                  <td>{item.customer_name}</td>
                  {/* <td>{item.address}</td>
                <td>{item.mobileNo}</td> */}
                  <td>{item.amount_details.total}</td>
                  <td>{item.amount_details.advance}</td>
                  <td>{item.amount_details.balance}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handlePrintRow(index, item.bill_no)}
                    >
                      Print
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteBill(index, item.bill_no)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default Billing;
