import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

const ReportTable = ({ data }) => {
  const [itemFilter, setItemFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredData = data.filter((item) => {
    const itemMatch = item.item
      .toLowerCase()
      .includes(itemFilter.toLowerCase());
    const categoryMatch = item.category
      .toLowerCase()
      .includes(categoryFilter.toLowerCase());

    return itemMatch && categoryMatch;
  });

  return (
    <div>
      <Form>
        <Stack gap={2} direction="horizontal">
          <Form.Group controlId="itemFilter">
            <Form.Label>Filter Item:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter item name"
              value={itemFilter}
              onChange={(e) => setItemFilter(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="categoryFilter">
            <Form.Label>Filter Category:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            />
          </Form.Group>
        </Stack>
      </Form>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Item</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Rate Per Unit</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.item}</td>
              <td>{item.category}</td>
              <td>{item.total_quantity}</td>
              <td>{item.rate_per_unit}</td>
              <td>
                {Number(item.total_quantity) * Number(item.rate_per_unit)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ReportTable;
