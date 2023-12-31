import React from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import * as XLSX from "xlsx";

const MenuIngredientsDropdown = ({ type, data }) => {
  return (
    <Card>
      <Card.Body>
        {type === "menu" && (
          <>
            {data ? (
              <>
                <h4>Menu:</h4>
                {data.map((item, index) => (
                  <span key={item.id}>
                    {`${item.item}${
                      index < data.length - 1 ? ",\u00A0\u00A0\u00A0\u00A0" : ""
                    }`}
                  </span>
                ))}
              </>
            ) : (
              <>
                <h4>Menu:</h4>
                <p>No Data</p>
              </>
            )}
          </>
        )}

        {type === "ingredients" && (
          <>
            {data ? (
              <>
                <h4>Ingredients:</h4>
                {data.map((ingredient, index) => (
                  <span key={ingredient.id}>
                    {`${ingredient.item} - ${ingredient.quantity}(${
                      ingredient.unit
                    })${
                      index < data.length - 1 ? ",\u00A0\u00A0\u00A0\u00A0" : ""
                    }`}
                  </span>
                ))}
              </>
            ) : (
              <>
                <h4>Ingredients:</h4>
                <p>No Data</p>
              </>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

const SegregatedReportTable = ({ data }) => {
  const exportTable = () => {
    const table = document.getElementById("eventTable");
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table.xlsx");
  };
  return (
    <div>
      <h2>Segregated Event Data</h2>
      <Table striped bordered hover id="eventTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Event Title</th>
            <th>Organizer</th>
            <th>Event Type</th>
            <th>Address</th>
            <th>Venue</th>
            <th>Date of Booking</th>
            <th>Date of Function</th>
            <th>Number of Persons</th>
            <th>Mobile Number</th>
            <th>Booking Amount</th>
            <th>Advance</th>
            <th>Balance</th>
            <th>Price per Plate</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {data.map((event) => (
            <React.Fragment key={event.id}>
              <tr>
                <td>{event.id}</td>
                <td>{event.event_title}</td>
                <td>{event.organizer}</td>
                <td>{event.event_type}</td>
                <td>{event.address}</td>
                <td>{event.venue}</td>
                <td>{event.date_of_booking}</td>
                <td>{event.date_of_function}</td>
                <td>{event.number_of_person}</td>
                <td>{event.mobile_number}</td>
                <td>{event.booking_amount}</td>
                <td>{event.advance}</td>
                <td>{event.balance}</td>
                <td>{event.price_per_plate}</td>
                <td>{event.note}</td>
              </tr>
              <tr>
                <td colSpan="15">
                  <MenuIngredientsDropdown type="menu" data={event.menu} />
                </td>
              </tr>
              <tr>
                <td colSpan="15">
                  <MenuIngredientsDropdown
                    type="ingredients"
                    data={event.ingredient}
                  />
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      <button onClick={exportTable}>Export to Excel</button>
    </div>
  );
};

export default SegregatedReportTable;
