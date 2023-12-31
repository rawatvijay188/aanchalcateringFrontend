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
import moment from "moment/moment";
import { Container } from "react-bootstrap";

const UpdateEventForm = (props) => {
  const [formData, setFormData] = useState({
    event_type: "",
    date_type: "date_of_booking",
  });
  const [eventDetails, setEventDetails] = useState([]);
  const [filteredEventDetails, setFilteredEventDetails] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [oldData, setOldData] = useState({});
  const [changeCheck, setChangeCheck] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [filterValues, setFilterValues] = useState({
    eventTitleFilter: "",
    eventTypeFilter: "",
    venueFilter: "",
    organizerNameFilter: "",
    mobileNumberFilter: "",
    addressFilter: "",
  });
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

    const sortedData = [...filteredEventDetails].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (column === "date_of_function" || column === "date_of_booking") {
        // Parse date values and compare
        const dateA = new Date(valueA).getTime();
        const dateB = new Date(valueB).getTime();

        return isAscending ? dateA - dateB : dateB - dateA;
      } else if (typeof valueA === "string" && typeof valueB === "string") {
        // Case-insensitive string comparison
        const strA = valueA.toLowerCase();
        const strB = valueB.toLowerCase();

        return isAscending
          ? strA.localeCompare(strB)
          : strB.localeCompare(strA);
      } else {
        // Numeric comparison for other data types
        return isAscending ? valueA - valueB : valueB - valueA;
      }
    });

    setFilteredEventDetails(sortedData);
  };

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
  const toggleEdit = (eventId) => {
    setChangeCheck(false);
    setEditableId(eventId);
    var updatedData = { ...eventDetails.find((item) => item.id === eventId) };
    setOldData(updatedData);
  };
  async function fetchEventDetails() {
    var body = { ...formData };
    body["service"] = "eventFilter";
    var data = await lambdaCall(body);
    console.log(data.data);
    setEventDetails(data.data);
    setFilteredEventDetails(data.data);
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      (formData.from_date && !formData.to_date) ||
      (!formData.from_date && formData.to_date)
    ) {
      alert("Please select both from date and to date.");
    }
    fetchEventDetails();
  };
  const handleSave = async (eventId) => {
    setEditableId(null);
    if (changeCheck) {
      var updatedData = { ...eventDetails.find((item) => item.id === eventId) };
      var id = updatedData["id"];
      delete updatedData["id"];
      var body = {
        service: "update_event",
        newEventData: updatedData,
        id: id,
      };
      await lambdaCall(body);
    }
    refresh();
  };
  const handleDelete = async (eventId) => {
    var body = { service: "delete_event", id: eventId };
    await lambdaCall(body);
    refresh();
  };
  const cancelEdit = (eventId) => {
    setEditableId(null);
    var updatedData = [...eventDetails];
    const index = updatedData.findIndex(item => item.id === eventId);
    updatedData[index] = oldData;
    setEventDetails(updatedData);
    setChangeCheck(false);
  };
  const handleTableChange = (e, eventId, field) => {
    const updatedData = [...eventDetails];
    const index = updatedData.findIndex(item => item.id === eventId);
    if (field === "select") {
      // Handle checkbox changes
      const isChecked = e.target.checked;
      if (isChecked) {
        
        var id = updatedData[index]["id"];
        setSelectedId(id);
        console.log("Selected ID:", id);
      } else {
        setSelectedId(null);
      }
    } else {
      updatedData[index][field] = e.target.value;
      setEventDetails(updatedData);
      setChangeCheck(true);
    }
  };
  const clearForm = () => {
    setFormData({
      event_type: "",
      date_type: "date_of_booking",
    });
    setEventDetails([]);
    setFilteredEventDetails([]);
    setEditableId(null);
    setOldData({});
    setChangeCheck(false);
    document.getElementById("event_title").value = "";
    document.getElementById("organizer").value = "";
    document.getElementById("event_type").value = "";
    document.getElementById("venue").value = "";
    document.getElementById("address").value = "";
    document.getElementById("mobile_number").value = "";
    document.getElementById("from_date").value = "";
    document.getElementById("to_date").value = "";
    document.getElementById("date_type").value = "date_of_booking";
  };
  const refresh = () => {
    setEventDetails([]);
    setFilteredEventDetails([]);
    setEditableId(null);
    setOldData({});
    setChangeCheck(false);
    fetchEventDetails();
    setSelectedId(null);
  };
  const copyEventDetails = async () => {
    console.log(selectedId);
    var result = await lambdaCall({
      service: "copyEvent",
      eventId: selectedId,
    });
    refresh();
    alert(
      `Copied the Event successfully and the new event id is ${result.data[0].id}`
    );
  };
  const filterEventDetails = (e, field) => {
    var updatedFilterValues = { ...filterValues };
    updatedFilterValues[field] = e.target.value;
    setFilterValues(updatedFilterValues);

    const filteredData = eventDetails.filter((item) => {
      const eventTitleMatch = item.event_title
        .toLowerCase()
        .includes(updatedFilterValues.eventTitleFilter.toLowerCase());
      const eventTypeMatch = item.event_type
        .toLowerCase()
        .includes(updatedFilterValues.eventTypeFilter.toLowerCase());
      const venueMatch = item.venue
        .toLowerCase()
        .includes(updatedFilterValues.venueFilter.toLowerCase());
      const organizerNameMatch = item.organizer
        .toLowerCase()
        .includes(updatedFilterValues.organizerNameFilter.toLowerCase());
      const mobileNumberMatch = item.mobile_number
        .toLowerCase()
        .includes(updatedFilterValues.mobileNumberFilter.toLowerCase());
      const addressMatch = item.address
        .toLowerCase()
        .includes(updatedFilterValues.addressFilter.toLowerCase());
      return (
        eventTitleMatch &&
        eventTypeMatch &&
        venueMatch &&
        organizerNameMatch &&
        mobileNumberMatch &&
        addressMatch
      );
    });
    setFilteredEventDetails(filteredData);
  };

  return (
    <Container className="my-4">
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
                <option value="others">Others</option>
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
          <Form.Group as={Col} controlId="from_date">
            <Form.Label>From Date</Form.Label>
            <Form.Control
              type="date"
              onChange={handleFormChange}
              placeholder="Select From Date"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="to_date">
            <Form.Label>To Date</Form.Label>
            <Form.Control
              type="date"
              onChange={handleFormChange}
              placeholder="Select To Date"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="date_type">
            <Form.Label>Date Type</Form.Label>
            <Form.Select
              onChange={handleFormChange}
              aria-label="Default select example"
            >
              <option value="date_of_booking">Date Of Booking</option>
              <option value="date_of_function">Date Of Function</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Stack gap={2} direction="horizontal" className="col-md-2 mx-auto">
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="primary" onClick={() => clearForm()}>
            Clear
          </Button>
        </Stack>
      </Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="eventTitleFilter">
          <Form.Label>Filter Event Title</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => {
              filterEventDetails(e, "eventTitleFilter");
            }}
            value={filterValues.eventTitleFilter}
            placeholder="Filter Event Title"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="eventTypeFilter">
          <Form.Label>Filter Event Type</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => {
              filterEventDetails(e, "eventTypeFilter");
            }}
            value={filterValues.eventTypeFilter}
            placeholder="Filter Event Type"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="venueFilter">
          <Form.Label>Filter Venue</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => {
              filterEventDetails(e, "venueFilter");
            }}
            value={filterValues.venueFilter}
            placeholder="Filter Venue"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="organizerNameFilter">
          <Form.Label>Filter Organizer Name</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => {
              filterEventDetails(e, "organizerNameFilter");
            }}
            value={filterValues.organizerNameFilter}
            placeholder="Filter Organizer Name"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="mobileNumberFilter">
          <Form.Label>Filter Mobile Number</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => {
              filterEventDetails(e, "mobileNumberFilter");
            }}
            value={filterValues.mobileNumberFilter}
            placeholder="Filter Mobile Number"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="addressFilter">
          <Form.Label>Filter Address</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => {
              filterEventDetails(e, "addressFilter");
            }}
            value={filterValues.addressFilter}
            placeholder="Filter address"
          />
        </Form.Group>
        {/* Repeat the above Form.Group structure for other filters */}
      </Row>
      {filteredEventDetails && filteredEventDetails.length > 0 && (
        <>
          <Button variant="primary" onClick={() => copyEventDetails()}>
            Copy
          </Button>

          <Table striped bordered hover responsive className="mt-4">
            <thead>
              <tr>
                <th>Select</th>
                <th>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("id")}
                  >
                    Event ID
                  </span>
                </th>
                <th>Event Title</th>
                <th>Event Type</th>
                <th>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("date_of_function")}
                  >
                    Date of Event
                  </span>
                </th>
                <th>Venue</th>
                <th>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("price_per_plate")}
                  >
                    Price Per Plate
                  </span>
                </th>
                <th>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("date_of_booking")}
                  >
                    Booking Date
                  </span>
                </th>
                <th>Organizer Name</th>
                <th>Mobile Numbder</th>
                <th>Address</th>
                <th>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("number_of_person")}
                  >
                    Number Of Persons
                  </span>
                </th>
                <th>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("booking_amount")}
                  >
                    Booking Amount
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
                <th>Update/View Menu</th>
                <th>Update/View Ingredients</th>
                <th>Edit</th>
                <th>Print</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredEventDetails.map((item, itemIndex) => (
                <tr key={itemIndex}>
                  <td>
                    <Form.Check
                      type={"checkbox"}
                      id={item.id}
                      onChange={(e) =>
                        handleTableChange(e, item.id, "select")
                      }
                      checked={item.id === selectedId}
                    />
                  </td>
                  <td>{item.id}</td>
                  <td>
                    {editableId === item.id ? (
                      <input
                        type="text"
                        value={item.event_title}
                        onChange={(e) =>
                          handleTableChange(e, item.id, "event_title")
                        }
                      />
                    ) : (
                      item.event_title
                    )}
                  </td>
                  <td>
                    {editableId === item.id ? (
                      <select
                        type="text"
                        value={item.event_type}
                        onChange={(e) =>
                          handleTableChange(e, item.id, "event_type")
                        }
                      >
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="others">Others</option>
                      </select>
                    ) : (
                      item.event_type
                    )}
                  </td>
                  <td>
                    {editableId === item.id ? (
                      <input
                        type="date"
                        value={moment(new Date(item.date_of_function)).format(
                          "YYYY-MM-DD"
                        )}
                        onChange={(e) =>
                          handleTableChange(e, item.id, "date_of_function")
                        }
                      />
                    ) : (
                      moment(new Date(item.date_of_function)).format(
                        "DD-MM-YYYY"
                      )
                    )}
                  </td>
                  <td>
                    {editableId === item.id ? (
                      <input
                        type="text"
                        value={item.venue}
                        onChange={(e) =>
                          handleTableChange(e, item.id, "venue")
                        }
                      />
                    ) : (
                      item.venue
                    )}
                  </td>
                  <td>
                    {editableId === item.id ? (
                      <input
                        type="text"
                        value={item.price_per_plate}
                        onChange={(e) =>
                          handleTableChange(e, item.id, "price_per_plate")
                        }
                      />
                    ) : (
                      item.price_per_plate
                    )}
                  </td>
                  <td>
                    {editableId === item.id ? (
                      <input
                        type="date"
                        value={moment(new Date(item.date_of_booking)).format(
                          "YYYY-MM-DD"
                        )}
                        onChange={(e) =>
                          handleTableChange(e, item.id, "date_of_booking")
                        }
                      />
                    ) : (
                      moment(new Date(item.date_of_booking)).format(
                        "DD-MM-YYYY"
                      )
                    )}
                  </td>
                  <td>
                    {editableId === item.id ? (
                      <input
                        type="text"
                        value={item.organizer}
                        onChange={(e) =>
                          handleTableChange(e, item.id, "organizer")
                        }
                      />
                    ) : (
                      item.organizer
                    )}
                  </td>
                  <td>
                    {editableId === item.id ? (
                      <input
                        type="text"
                        value={item.mobile_number}
                        onChange={(e) =>
                          handleTableChange(e, item.id, "mobile_number")
                        }
                      />
                    ) : (
                      item.mobile_number
                    )}
                  </td>
                  <td>
                    {editableId === item.id ? (
                      <input
                        type="text"
                        value={item.address}
                        onChange={(e) =>
                          handleTableChange(e, item.id, "address")
                        }
                      />
                    ) : (
                      item.address
                    )}
                  </td>
                  <td>
                    {editableId === item.id ? (
                      <input
                        type="number"
                        value={item.number_of_person}
                        onChange={(e) =>
                          handleTableChange(e, item.id, "number_of_person")
                        }
                      />
                    ) : (
                      item.number_of_person
                    )}
                  </td>
                  <td>
                    {editableId === item.id ? (
                      <input
                        type="text"
                        value={item.booking_amount}
                        onChange={(e) =>
                          handleTableChange(e, item.id, "booking_amount")
                        }
                      />
                    ) : (
                      item.booking_amount
                    )}
                  </td>
                  <td>
                    {editableId === item.id ? (
                      <input
                        type="text"
                        value={item.advance}
                        onChange={(e) =>
                          handleTableChange(e, item.id, "advance")
                        }
                      />
                    ) : (
                      item.advance
                    )}
                  </td>
                  <td>
                    {editableId === item.id ? (
                      <input
                        type="text"
                        value={item.balance}
                        onChange={(e) =>
                          handleTableChange(e, item.id, "balance")
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
                      alt="menu_icon"
                      onClick={() => {
                        props.setTabValue(6);
                        props.setEventId(item.id);
                      }}
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
                      onClick={() => {
                        props.setTabValue(8);
                        props.setEventId(item.id);
                      }}
                    />
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                    }}
                  >
                    {editableId === item.id ? (
                      <>
                        <Stack direction="horizontal" gap={1}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="45"
                            height="45"
                            fill="currentColor"
                            className="bi bi-check-lg p-2"
                            viewBox="0 0 16 16"
                            onClick={() => handleSave(item.id)}
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
                            onClick={() => cancelEdit(item.id)}
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
                        onClick={() => toggleEdit(item.id)}
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
                      onClick={(e) => handleDelete(item.id)}
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                    </svg>
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

export default UpdateEventForm;
