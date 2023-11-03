import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const AddEventForm = () => {
  const [formData, setFormData] = useState({
    eventTitle: "",
    organizerName: "",
    eventType: "",
    address: "",
    venue: "",
    bookingDate: "",
    functionDate: "",
    time: "",
    numberOfPersons: "",
    mobileNumber: "",
    bookingAmount: "",
    advance: "",
    balance: "",
    pricePerPlate: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      "time",
      "numberOfPersons",
      "mobileNumber",
      "bookingAmount",
      "advance",
      "balance",
      "note",
    ];

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
    <Form>
      <Form.Group className="mb-3" controlId="eventTitle">
        <Form.Label>Event Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Event Title" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="organizerName">
        <Form.Label>Name of Organizer</Form.Label>
        <Form.Control type="text" placeholder="Enter Organizer Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="eventType">
        <Form.Label>Event Type</Form.Label>
        <Form.Control type="text" placeholder="Enter Event Type" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Enter Address" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="venue">
        <Form.Label>Venue</Form.Label>
        <Form.Control type="text" placeholder="Enter Venue" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="bookingDate">
        <Form.Label>Date of Booking</Form.Label>
        <Form.Control type="date" placeholder="Enter Booking Date" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="functionDate">
        <Form.Label>Date of Function</Form.Label>
        <Form.Control type="date" placeholder="Enter Event Date" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="functionTime">
        <Form.Label>Function Time</Form.Label>
        <Form.Control type="time" placeholder="Enter Function time" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="numberOfPersons">
        <Form.Label>Number of Persons</Form.Label>
        <Form.Control type="number" placeholder="Enter Person Count" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="mobileNumber">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control type="text" placeholder="Enter Mobile Number" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="bookingAmount">
        <Form.Label>Booking Amount</Form.Label>
        <Form.Control type="text" placeholder="Enter Booking Amount" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="advance">
        <Form.Label>Advance</Form.Label>
        <Form.Control type="text" placeholder="Enter Advance" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="balance">
        <Form.Label>Balance</Form.Label>
        <Form.Control type="text" placeholder="Enter Balance" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="pricePerPlate">
        <Form.Label>Price Per Plate</Form.Label>
        <Form.Control type="text" placeholder="Enter Price Per Plate" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="note">
        <Form.Label>Note</Form.Label>
        <Form.Control type="text" placeholder="Enter Additional Info" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor="eventTitle">Event Title*</label>
    //       <input
    //         type="text"
    //         id="eventTitle"
    //         name="eventTitle"
    //         value={formData.eventTitle}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="organizerName">Name of Organizer*</label>
    //       <input
    //         type="text"
    //         id="organizerName"
    //         name="organizerName"
    //         value={formData.organizerName}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="eventType">Event Type*</label>
    //       <input
    //         type="text"
    //         id="eventType"
    //         name="eventType"
    //         value={formData.eventType}
    //         onChange={handleChange}
    //         required
    //         // Add any additional attributes or placeholders as needed
    //       />
    //     </div>

    //     {/* Add similar blocks for other input fields */}
    //     <div>
    //       <label htmlFor="address">Address*</label>
    //       <input
    //         type="text"
    //         id="address"
    //         name="address"
    //         value={formData.address}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="venue">Venue*</label>
    //       <input
    //         type="text"
    //         id="venue"
    //         name="venue"
    //         value={formData.venue}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="bookingDate">Date of Booking*</label>
    //       <input
    //         type="date"
    //         id="bookingDate"
    //         name="bookingDate"
    //         value={formData.bookingDate}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="functionDate">Date of Function*</label>
    //       <input
    //         type="date"
    //         id="functionDate"
    //         name="functionDate"
    //         value={formData.functionDate}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="time">Time*</label>
    //       <input
    //         type="time"
    //         id="time"
    //         name="time"
    //         value={formData.time}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="numberOfPersons">Number of Persons*</label>
    //       <input
    //         type="text"
    //         id="numberOfPersons"
    //         name="numberOfPersons"
    //         value={formData.numberOfPersons}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="mobileNumber">Mobile Number*</label>
    //       <input
    //         type="text"
    //         id="mobileNumber"
    //         name="mobileNumber"
    //         value={formData.mobileNumber}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="bookingAmount">Booking Amount*</label>
    //       <input
    //         type="text"
    //         id="bookingAmount"
    //         name="bookingAmount"
    //         value={formData.bookingAmount}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="advance">Advance*</label>
    //       <input
    //         type="text"
    //         id="advance"
    //         name="advance"
    //         value={formData.advance}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="balance">Balance*</label>
    //       <input
    //         type="text"
    //         id="balance"
    //         name="balance"
    //         value={formData.balance}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="pricePerPlate">Price Per Plate*</label>
    //       <input
    //         type="text"
    //         id="pricePerPlate"
    //         name="pricePerPlate"
    //         value={formData.pricePerPlate}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="note">Note</label>
    //       <textarea
    //         id="note"
    //         name="note"
    //         value={formData.note}
    //         onChange={handleChange}
    //       />
    //     </div>

    //     <div>
    //       <button type="submit">Submit</button>
    //     </div>
    //   </form>
  );
};

export default AddEventForm;
