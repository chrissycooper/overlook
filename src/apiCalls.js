import Booking from "./classes/Booking";
import { hide, overlookMotel, displayUserInfo, displayUserSearchInfo, serverMessage } from "./scripts";
let apiCalls;

const bookingsData = fetch("https://overlook-api-jfogiato.vercel.app/api/v1/bookings")
    .then(response => response.json())
    .catch(err => console.log(err));

const roomsData = fetch("https://overlook-api-jfogiato.vercel.app/api/v1/rooms")
    .then(response => response.json())
    .catch(err => console.log(err));

const customersData = fetch("https://overlook-api-jfogiato.vercel.app/api/v1/customers")
    .then(response => response.json())
    .catch(err => console.log(err));

const testCustomer = fetch("https://overlook-api-jfogiato.vercel.app/api/v1/customers/6")
    .then(response => response.json())
    .catch(err => console.log(err));

apiCalls = [bookingsData, roomsData, customersData, testCustomer];

function postNewBooking(booking, event, currentUser, room, convertedDate){
    return fetch('https://overlook-api-jfogiato.vercel.app/api/v1/bookings', {
        method: 'POST',
        body: JSON.stringify({ "userID": booking.userID, "date": booking.date, "roomNumber": booking.roomNumber }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        if(data.message.includes('successfully')){
            let newBooking = new Booking(data.newBooking.userID, convertedDate, room, data.newBooking.id);
            overlookMotel.bookings.push(newBooking);
            hide(event.target.parentNode);
            currentUser.bookings.unshift(newBooking);

            overlookMotel.managerMode ? displayUserSearchInfo(currentUser) : displayUserInfo(currentUser)

            serverMessage.innerText = "Booking successfully made"
            setTimeout(() => {
            serverMessage.innerText = ''
            }, 1500)

        } else {
            throw new Error('An unexpected problem has occurred')
        }
        return data;
    })
    .catch(err => alert(`Server Error: ${err}. Please try again later.`))
}

function deleteBooking(bookingID, currentUser) {
    fetch(`https://overlook-api-jfogiato.vercel.app/api/v1/bookings/${bookingID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.message.includes('deleted')){
            let ghostIndex;
            currentUser.bookings.find((booking, index )=> {
                if(booking.id === bookingID){
                    ghostIndex = index;
                }
                return booking.id === bookingID;
            })

            currentUser.bookings.splice(ghostIndex, 1)
            serverMessage.innerText = "Booking successfully deleted";
            setTimeout(() => {
                serverMessage.innerText = '';
            }, 1500);

            displayUserSearchInfo(currentUser);

        } else if(data.message.includes(bookingID)){
            throw new Error('Booking has already been deleted, please refresh for most up to date information');
        } else {
            throw new Error('An unexpected problem has occurred');
        }
        return data;
    })
    .catch(err => alert(`Server Error: ${err}. Please try again later.`))
}



export { apiCalls, postNewBooking, deleteBooking }