import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import lambdaCall from "../helper/LambdaCall";
import IngredientsIcon from "../static/images/ingredient-small.png";
import MenuIcon from "../static/images/mneu-small.png";
import Stack from "react-bootstrap/Stack";
const UpdateEventForm = () => {
  const [formData, setFormData] = useState(null);
  const [eventDetails, setEventDetails] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [oldData, setOldData] = useState({});
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    if (value) {
      setFormData({ ...formData, [id]: value });
    } else {
      var formDataCopy = { ...formData };
      delete formDataCopy[id];
      setFormData(formDataCopy);
    }
  };
  const toggleEdit = (index) => {
    setEditableRow(index);
    var updatedData = { ...eventDetails[index] };
    setOldData(updatedData);
  };
  async function fetchEventDetails() {
    var data = await lambdaCall({
      service: "eventFilter",
      filter: formData,
    });
    console.log(data.data);
    setEventDetails(data.data);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    fetchEventDetails();
  };
  const handleSave = (index) => {
    setEditableRow(null);
  };

  const cancelEdit = (index) => {
    setEditableRow(null);
    var updatedData = [...eventDetails];
    console.log(oldData);
    updatedData[index] = oldData;
    setEventDetails(updatedData);
  };
  const handleTableChange = (e, index, field) => {
    const updatedData = [...eventDetails];
    updatedData[index][field] = e.target.value;
    setEventDetails(updatedData);
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="event_title">
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              type="text"
              onChange={handleFormChange}
              placeholder="Enter Event Title"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="organizer">
            <Form.Label>Name of Organizer</Form.Label>
            <Form.Control
              type="text"
              onChange={handleFormChange}
              placeholder="Enter Organizer Name"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="event_type">
              <Form.Label>Event Type</Form.Label>
              <Form.Select
                onChange={handleFormChange}
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
                onChange={handleFormChange}
                placeholder="Enter Venue"
              />
            </Form.Group>
          </Col>
          <Form.Group as={Col} controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              onChange={handleFormChange}
              placeholder="Enter Address"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="mobile_number">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              onChange={handleFormChange}
              placeholder="Enter Mobile Number"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="date_of_booking">
            <Form.Label>Date of Booking</Form.Label>
            <Form.Control
              type="date"
              onChange={handleFormChange}
              placeholder="Enter Booking Date"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="date_of_function">
            <Form.Label>Date of Function</Form.Label>
            <Form.Control
              type="date"
              onChange={handleFormChange}
              placeholder="Enter Event Date"
            />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {eventDetails && eventDetails.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Select</th>
              <th>Event ID</th>
              <th>Event Title</th>
              <th>Date of Event</th>
              <th>Venue</th>
              <th>Price Per Plate</th>
              <th>Booking Date</th>
              <th>Organizer Name</th>
              <th>Mobile Numbder</th>
              <th>Address</th>
              <th>Booking Amount</th>
              <th>Advance</th>
              <th>Balance</th>
              <th>Update/View Menu</th>
              <th>Update/View Ingredients</th>
              <th>Edit</th>
              <th>Print</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {eventDetails.map((item, itemIndex) => (
              <tr key={itemIndex}>
                <td>
                  <Form.Check type={"checkbox"} id={item.id} />
                </td>
                <td>{item.id}</td>
                <td>
                  {editableRow === itemIndex ? (
                    <input
                      type="text"
                      value={item.event_title}
                      onChange={(e) =>
                        handleTableChange(e, itemIndex, "event_title")
                      }
                    />
                  ) : (
                    item.event_title
                  )}
                </td>
                <td>
                  {editableRow === itemIndex ? (
                    <input
                      type="text"
                      value={item.date_of_function}
                      onChange={(e) =>
                        handleTableChange(e, itemIndex, "date_of_function")
                      }
                    />
                  ) : (
                    item.date_of_function
                  )}
                </td>
                <td>
                  {editableRow === itemIndex ? (
                    <input
                      type="text"
                      value={item.venue}
                      onChange={(e) => handleTableChange(e, itemIndex, "venue")}
                    />
                  ) : (
                    item.venue
                  )}
                </td>
                <td>
                  {editableRow === itemIndex ? (
                    <input
                      type="text"
                      value={item.price_per_plate}
                      onChange={(e) =>
                        handleTableChange(e, itemIndex, "price_per_plate")
                      }
                    />
                  ) : (
                    item.price_per_plate
                  )}
                </td>
                <td>
                  {editableRow === itemIndex ? (
                    <input
                      type="text"
                      value={item.date_of_booking}
                      onChange={(e) =>
                        handleTableChange(e, itemIndex, "date_of_booking")
                      }
                    />
                  ) : (
                    item.date_of_booking
                  )}
                </td>
                <td>
                  {editableRow === itemIndex ? (
                    <input
                      type="text"
                      value={item.organizer}
                      onChange={(e) =>
                        handleTableChange(e, itemIndex, "organizer")
                      }
                    />
                  ) : (
                    item.organizer
                  )}
                </td>
                <td>
                  {editableRow === itemIndex ? (
                    <input
                      type="text"
                      value={item.mobile_number}
                      onChange={(e) =>
                        handleTableChange(e, itemIndex, "mobile_number")
                      }
                    />
                  ) : (
                    item.mobile_number
                  )}
                </td>
                <td>
                  {editableRow === itemIndex ? (
                    <input
                      type="text"
                      value={item.address}
                      onChange={(e) =>
                        handleTableChange(e, itemIndex, "address")
                      }
                    />
                  ) : (
                    item.address
                  )}
                </td>
                <td>
                  {editableRow === itemIndex ? (
                    <input
                      type="text"
                      value={item.booking_amount}
                      onChange={(e) =>
                        handleTableChange(e, itemIndex, "booking_amount")
                      }
                    />
                  ) : (
                    item.booking_amount
                  )}
                </td>
                <td>
                  {editableRow === itemIndex ? (
                    <input
                      type="text"
                      value={item.advance}
                      onChange={(e) =>
                        handleTableChange(e, itemIndex, "advance")
                      }
                    />
                  ) : (
                    item.advance
                  )}
                </td>
                <td>
                  {editableRow === itemIndex ? (
                    <input
                      type="text"
                      value={item.balance}
                      onChange={(e) =>
                        handleTableChange(e, itemIndex, "balance")
                      }
                    />
                  ) : (
                    item.balance
                  )}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={MenuIcon}
                    width="30"
                    height="30"
                    alt="ingredient_icon"
                  />
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={IngredientsIcon}
                    width="30"
                    height="35"
                    alt="ingredient_icon"
                  />
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "center",
                  }}
                >
                  {editableRow === itemIndex ? (
                    <>
                      <Stack direction="horizontal" gap={1}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="45"
                          height="45"
                          fill="currentColor"
                          className="bi bi-check-lg p-2"
                          viewBox="0 0 16 16"
                          onClick={() => handleSave(itemIndex)}
                        >
                          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="45"
                          height="45"
                          fill="currentColor"
                          className="bi bi-x-circle p-2"
                          viewBox="0 0 16 16"
                          onClick={() => cancelEdit(itemIndex)}
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      </Stack>
                    </>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                      onClick={() => toggleEdit(itemIndex)}
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  )}
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-box-arrow-in-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
                    />
                  </svg>
                </td>
                <td
                  style={{
                    verticalAlign: "middle",
                    textAlign: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UpdateEventForm;
