let apiCalls;

const bookingsData = fetch("http://localhost:3001/api/v1/bookings")
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));

const roomsData = fetch("http://localhost:3001/api/v1/rooms")
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));

const customersData = fetch("http://localhost:3001/api/v1/customers")
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));

const testCustomer = fetch("http://localhost:3001/api/v1/customers/6")
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));

apiCalls = [bookingsData, roomsData, customersData, testCustomer];

function postNewBooking(booking){
    fetch('http://localhost:3001/api/v1/bookings', {
        method: 'POST',
        body: JSON.stringify({ "userID": booking.userID, "date": booking.date, "roomNumber": booking.roomNumber }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => alert(`Server Error: ${err}. Please try again later.`))
    
}

export { apiCalls, postNewBooking }