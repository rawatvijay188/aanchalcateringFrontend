import React, { useState } from 'react';

function EventDetails() {

    let events = [
        {
            "id": 3,
            "event_title": "Event Title",
            "organizer": "Organizer Name",
            "event_type": "Event Type",
            "address": "Event Address",
            "venue": "Event Venue",
            "date_of_booking": "2023-11-03T07:30:00.000Z",
            "date_of_function": "2023-11-03T09:30:00.000Z",
            "number_of_person": 100,
            "mobile_number": "1234567890",
            "booking_amount": "1000",
            "advance": "500",
            "balance": "500",
            "price_per_plate": "10",
            "note": "Additional Note"
        },
        {
            "id": 4,
            "event_title": "Event Title",
            "organizer": "Organizer Name",
            "event_type": "Event Type",
            "address": "Event Address",
            "venue": "Event Venue",
            "date_of_booking": "2023-11-03T07:30:00.000Z",
            "date_of_function": "2023-11-03T09:30:00.000Z",
            "number_of_person": 100,
            "mobile_number": "1234567890",
            "booking_amount": "1000",
            "advance": "500",
            "balance": "500",
            "price_per_plate": "10",
            "note": "Additional Note"
        },
        {
            "id": 1,
            "event_title": "Event Title1",
            "organizer": "Organizer Name",
            "event_type": "Event Type",
            "address": "Event Address",
            "venue": "Event Venue",
            "date_of_booking": "2023-11-03T07:30:00.000Z",
            "date_of_function": "2023-11-03T09:30:00.000Z",
            "number_of_person": 100,
            "mobile_number": "1234567890",
            "booking_amount": "1000",
            "advance": "500",
            "balance": "500",
            "price_per_plate": "10",
            "note": "updated Note"
        },
        {
            "id": 6,
            "event_title": "Event Title",
            "organizer": "Organizer Name",
            "event_type": "Event Type",
            "address": "Event Address",
            "venue": "Event Venue",
            "date_of_booking": "2023-11-03T07:30:00.000Z",
            "date_of_function": "2023-11-03T09:30:00.000Z",
            "number_of_person": 100,
            "mobile_number": "1234567890",
            "booking_amount": "1000",
            "advance": "500",
            "balance": "500",
            "price_per_plate": "10",
            "note": "Additional Note"
        },
        {
            "id": 5,
            "event_title": "zzz",
            "organizer": "New balaji",
            "event_type": "New Event Type",
            "address": "New Event Address",
            "venue": "New Event Venue",
            "date_of_booking": "2023-11-03T07:30:00.000Z",
            "date_of_function": "2023-11-03T09:30:00.000Z",
            "number_of_person": 100,
            "mobile_number": "000",
            "booking_amount": "999",
            "advance": "500",
            "balance": "500",
            "price_per_plate": "10",
            "note": "updated Note"
        },
        {
            "id": 10,
            "event_title": "zzz",
            "organizer": "New balaji",
            "event_type": "New Event Type",
            "address": "New Event Address",
            "venue": "New Event Venue",
            "date_of_booking": "2023-11-03T07:30:00.000Z",
            "date_of_function": "2023-11-03T09:30:00.000Z",
            "number_of_person": 100,
            "mobile_number": "000",
            "booking_amount": "999",
            "advance": "500",
            "balance": "500",
            "price_per_plate": "10",
            "note": "updated Note"
        },
        {
            "id": 7,
            "event_title": "aaaa",
            "organizer": "New balaji",
            "event_type": "New Event Type",
            "address": "New Event Address",
            "venue": "New Event Venue",
            "date_of_booking": "2023-11-03T07:30:00.000Z",
            "date_of_function": "2023-11-03T09:30:00.000Z",
            "number_of_person": 100,
            "mobile_number": "000",
            "booking_amount": "1200",
            "advance": "500",
            "balance": "500",
            "price_per_plate": "10",
            "note": "updated Note"
        },
        {
            "id": 8,
            "event_title": "aaaa",
            "organizer": "New balaji",
            "event_type": "New Event Type",
            "address": "New Event Address",
            "venue": "New Event Venue",
            "date_of_booking": "2023-11-03T07:30:00.000Z",
            "date_of_function": "2023-11-03T09:30:00.000Z",
            "number_of_person": 100,
            "mobile_number": "000",
            "booking_amount": "1200",
            "advance": "500",
            "balance": "500",
            "price_per_plate": "10",
            "note": "updated Note"
        },
        {
            "id": 9,
            "event_title": "aaaa",
            "organizer": "New balaji",
            "event_type": "New Event Type",
            "address": "New Event Address",
            "venue": "New Event Venue",
            "date_of_booking": "2023-11-03T07:30:00.000Z",
            "date_of_function": "2023-11-03T09:30:00.000Z",
            "number_of_person": 100,
            "mobile_number": "000",
            "booking_amount": "1200",
            "advance": "500",
            "balance": "500",
            "price_per_plate": "10",
            "note": "updated Note"
        },
        {
            "id": 12,
            "event_title": "Test Event",
            "organizer": "Balaji Singaraj Kalidass",
            "event_type": "breakfast",
            "address": "c301,Parasmane Apartments,Duvasapalya,Stage II,Kengeri Satellite town,Kengeri.",
            "venue": "CMA, Bangalore",
            "date_of_booking": "2023-11-04T13:00:00.000Z",
            "date_of_function": "2023-11-08T13:00:00.000Z",
            "number_of_person": 20,
            "mobile_number": "09865522087",
            "booking_amount": "5000",
            "advance": "2000",
            "balance": "3000",
            "price_per_plate": "250",
            "note": "adfdsaf"
        }
    ]

    let ingredient_category = [
        {
            "category": "Paani"
        },
        {
            "category": "Dress"
        },
        {
            "category": "Dairy"
        },
        {
            "category": "Kulfi"
        },
        {
            "category": "Other"
        },
        {
            "category": "Rumali"
        },
        {
            "category": "Souces"
        },
        {
            "category": "H M Waiter"
        },
        {
            "category": "Packed Masale"
        },
        {
            "category": "Cylender"
        },
        {
            "category": "Nonveg"
        },
        {
            "category": "Extra Waiter"
        },
        {
            "category": "Ice"
        },
        {
            "category": "Bakery"
        },
        {
            "category": "Subji"
        },
        {
            "category": "Ghad Bhoj"
        },
        {
            "category": "Kiraya"
        },
        {
            "category": "Chaat"
        },
        {
            "category": "Snacks"
        },
        {
            "category": "Icecuibe"
        },
        {
            "category": "Duster"
        },
        {
            "category": "testCategory"
        },
        {
            "category": "Indian Labour"
        },
        {
            "category": "Disposabel"
        },
        {
            "category": "Tandoor"
        },
        {
            "category": "Ice Cream"
        },
        {
            "category": "Ration"
        },
        {
            "category": "Bardana"
        },
        {
            "category": "Loose Masale"
        },
        {
            "category": "Karbing"
        },
        {
            "category": "Coffee Machine"
        },
        {
            "category": "Conti & Thai"
        },
        {
            "category": "Fruits"
        },
        {
            "category": "Staals"
        }
    ]

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleRowClick = (index) => {
        setSelectedEvent(index === selectedEvent ? null : index);
    };


    const filterEventsByDate = (event) => {
        if (dateFrom && dateTo) {
            const eventDate = new Date(event.date_of_function);
            const fromDate = new Date(dateFrom);
            const toDate = new Date(dateTo);

            return eventDate >= fromDate && eventDate <= toDate;
        }
        return true;
    };
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
      };

      const handleSubmit = () => {
          if ((dateFrom && !dateTo) || (!dateFrom && dateTo)) {
              alert("Please provide both 'From' and 'To' dates.");
              return
            } 
        alert(`elected Event : ${selectedEvent}, Selected Category: ${selectedCategory}`);
      };

    return (
        <div>

            <table style={{ marginBottom: '10px' }}>
                <thead>
                    <tr>
                        <th>Event Title</th>
                        <th>Organizer</th>
                        <th>Event Type</th>
                        <th>Number of Persons</th>
                    </tr>
                </thead>
                <tbody>
                    {events
                        .filter(filterEventsByDate)
                        .map((event, index) => (
                            <tr
                                key={index}
                                onClick={() => handleRowClick(index)}
                                style={{ background: selectedEvent === index ? '#f0f0f0' : '' }}
                            >
                                <td>
                                    {event.event_title}
                                </td>
                                <td>{event.organizer}</td>
                                <td>{event.event_type}</td>
                                <td>{event.number_of_person}</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <div style={{ marginBottom: '10px' }}>
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="">Select Category</option>
                    {ingredient_category.map((category, index) => (
                        <option key={index} value={category.category}>{category.category}</option>
                    ))}
                </select>
            </div>

            <div>
               Date of Function from:  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    placeholder="From Date"
                />
                to: <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    placeholder="To Date"
                />
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default EventDetails;
