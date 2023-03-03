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

export { apiCalls }