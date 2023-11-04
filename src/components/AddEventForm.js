import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import lambdaCall from "../helper/LambdaCall";
const AddEventForm = () => {
  const [validated, setValidated] = useState(false);

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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      var body = {
        service: "add_event",
        query: [
          formData["eventTitle"],
          formData["organizerName"],
          formData["eventType"],
          formData["address"],
          formData["venue"],
          formData["bookingDate"],
          formData["functionDate"],
          formData["numberOfPersons"],
          formData["mobileNumber"],
          formData["bookingAmount"],
          formData["advance"],
          formData["balance"],
          formData["pricePerPlate"],
          formData["note"],
        ],
      };
      await lambdaCall(body);
      console.log("Added Event Details");
    }
    setValidated(true);
  };
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="eventTitle">
          <Form.Label>Event Title</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            name="eventTitle"
            placeholder="Enter Event Title"
            required
          />
          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          <Form.Control.Feedback type="invalid">
            Please provide a valid Event Title.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="organizerName">
          <Form.Label>Name of Organizer</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            placeholder="Enter Organizer Name"
            required
          />
          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          <Form.Control.Feedback type="invalid">
            Please provide a valid Organizer Name.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="eventType">
            <Form.Label>Event Type</Form.Label>
            <Form.Select
              onChange={handleChange}
              aria-label="Default select example"
            >
              <option value="">Select Event Type</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="venue">
            <Form.Label>Venue</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              placeholder="Enter Venue"
              required
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
            <Form.Control.Feedback type="invalid">
              Please provide a valid Venue.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Form.Group as={Col} controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            onChange={handleChange}
            placeholder="Enter Address"
            required
          />
          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          <Form.Control.Feedback type="invalid">
            Please provide a Address.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="mobileNumber">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            placeholder="Enter Mobile Number"
            required
          />
          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          <Form.Control.Feedback type="invalid">
            Please provide a valid Mobile Number.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="bookingDate">
          <Form.Label>Date of Booking</Form.Label>
          <Form.Control
            type="date"
            onChange={handleChange}
            placeholder="Enter Booking Date"
            required
          />
          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          <Form.Control.Feedback type="invalid">
            Please provide a valid Booking Date.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="functionDate">
          <Form.Label>Date of Function</Form.Label>
          <Form.Control
            type="date"
            onChange={handleChange}
            placeholder="Enter Event Date"
            required
          />
          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          <Form.Control.Feedback type="invalid">
            Please provide a valid Event Date.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="numberOfPersons">
          <Form.Label>Number of Persons</Form.Label>
          <Form.Control
            type="number"
            onChange={handleChange}
            placeholder="Enter Person Count"
            required
          />
          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          <Form.Control.Feedback type="invalid">
            Please provide Person Count.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="pricePerPlate">
          <Form.Label>Price Per Plate</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            placeholder="Enter Price Per Plate"
            required
          />
          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          <Form.Control.Feedback type="invalid">
            Please provide a Price Per Plate.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="bookingAmount">
          <Form.Label>Booking Amount</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            placeholder="Enter Booking Amount"
            required
          />
          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          <Form.Control.Feedback type="invalid">
            Please provide a Booking Amount.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="advance">
            <Form.Label>Advance</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              placeholder="Enter Advance"
              required
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
            <Form.Control.Feedback type="invalid">
              Please provide a Advance.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="balance">
            <Form.Label>Balance</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              placeholder="Enter Balance"
              required
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
            <Form.Control.Feedback type="invalid">
              Please provide a Balance.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Form.Group as={Col} className="mb-3" controlId="note">
          <Form.Label>Note</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            onChange={handleChange}
            placeholder="Enter Additional Info"
            required
          />
          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          <Form.Control.Feedback type="invalid">
            Please provide Note.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddEventForm;
