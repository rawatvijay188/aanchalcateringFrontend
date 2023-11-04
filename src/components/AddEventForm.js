import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AddEventForm = () => {
  const [formData, setFormData] = useState({
    eventTitle: "",
    organizerName: "",
    eventType: "",
    address: "",
    venue: "",
    bookingDate: "",
    functionDate: "",
    functionTime: "",
    numberOfPersons: "",
    mobileNumber: "",
    bookingAmount: "",
    advance: "",
    balance: "",
    pricePerPlate: "",
    note: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Define an array to store the names of mandatory fields
    const mandatoryFields = [
      "eventTitle",
      "organizerName",
      "address",
      "venue",
      "bookingDate",
      "functionDate",
      "functionTime",
      "numberOfPersons",
      "mobileNumber",
      "bookingAmount",
      "advance",
      "balance",
      "note",
    ];
    console.log(formData);
    // Check if all mandatory fields are filled
    const emptyFields = mandatoryFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      const emptyFieldNames = emptyFields.map((field) =>
        field.replace(/([A-Z])/g, " $1").toLowerCase()
      );
      alert(
        `Please fill in the following mandatory fields: ${emptyFieldNames.join(
          ", "
        )}`
      );
      return;
    }

    // If all mandatory fields are filled, proceed with form submission
    console.log("Form submitted:", formData);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="eventTitle">
          <Form.Label>Event Title</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            name="eventTitle"
            placeholder="Enter Event Title"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="organizerName">
          <Form.Label>Name of Organizer</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            placeholder="Enter Organizer Name"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="eventType">
            <Form.Label>Event Type</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              placeholder="Enter Event Type"
            />
          </Form.Group>
          <Form.Group controlId="venue">
            <Form.Label>Venue</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              placeholder="Enter Venue"
            />
          </Form.Group>
        </Col>
        <Form.Group as={Col} controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            onChange={handleChange}
            placeholder="Enter Address"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="bookingDate">
          <Form.Label>Date of Booking</Form.Label>
          <Form.Control
            type="date"
            onChange={handleChange}
            placeholder="Enter Booking Date"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="functionDate">
          <Form.Label>Date of Function</Form.Label>
          <Form.Control
            type="date"
            onChange={handleChange}
            placeholder="Enter Event Date"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="functionTime">
          <Form.Label>Function Time</Form.Label>
          <Form.Control
            type="time"
            onChange={handleChange}
            placeholder="Enter Function time"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="mobileNumber">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            placeholder="Enter Mobile Number"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="numberOfPersons">
          <Form.Label>Number of Persons</Form.Label>
          <Form.Control
            type="number"
            onChange={handleChange}
            placeholder="Enter Person Count"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="pricePerPlate">
          <Form.Label>Price Per Plate</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            placeholder="Enter Price Per Plate"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="bookingAmount">
          <Form.Label>Booking Amount</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            placeholder="Enter Booking Amount"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="advance">
          <Form.Label>Advance</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            placeholder="Enter Advance"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="balance">
          <Form.Label>Balance</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            placeholder="Enter Balance"
          />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="note">
        <Form.Label>Note</Form.Label>
        <Form.Control
          type="text"
          onChange={handleChange}
          placeholder="Enter Additional Info"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddEventForm;
