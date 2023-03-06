import { hide, overlookMotel, displayUserInfo } from "./scripts";
// import Customer from "./classes/Customer";
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

function getSingleUser(userID) {
   return fetch(`http://localhost:3001/api/v1/customers/${userID}`)
    .then(response => response.json())
    .then(data => currentUser = data)
    .catch(err => console.log(err))
}


function postNewBooking(booking, event, currentUser, room, convertedDate){
    return fetch('http://localhost:3001/api/v1/bookings', {
        method: 'POST',
        body: JSON.stringify({ "userID": booking.userID, "date": booking.date, "roomNumber": booking.roomNumber }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        if(data.message.includes('successfully')){
            overlookMotel.bookings.push(booking);
            hide(event.target.parentNode);
            currentUser.bookRoom(room, convertedDate);
            displayUserInfo(currentUser);
        } else {
            throw new Error('An unexpected problem has occurred')
        }
        return data;
    })
    .catch(err => alert(`Server Error: ${err}. Please try again later.`))
}

export { apiCalls, postNewBooking, getSingleUser }