// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/motel-carpet.png';
import { apiCalls } from './apiCalls';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';

const userBookingsSection = document.getElementById("userBookings");
const totalSpentHTML = document.getElementById("total-spent");
const dateInput = document.getElementById("choiceOfDate");
const submitButton = document.getElementById("dateSubmit");
const availableRoomsDisplay = document.getElementById("availableBookings")

let outlookMotel, testUser;

Promise.all(apiCalls)
    .then(values => {
        const bookingsData = values[0].bookings;
        const roomsData = values[1].rooms;
        const customersData = values[2].customers;
        testUser = new Customer(values[3]);
        testUser.createBookingArray(bookingsData, roomsData);
        outlookMotel = new Hotel();
        outlookMotel.parseHotelData(roomsData, bookingsData, customersData);
        console.log('outlookmotel', outlookMotel);
        displayUserInfo();
    });

submitButton.addEventListener('click', displayAvailableRooms);

function displayUserInfo(){
    userBookingsSection.innerHTML = `<h2 class="yourBookings">Your Booking History</h2>`
    testUser.bookings.forEach(booking => {
        userBookingsSection.innerHTML += 
        `
        <div class="current-bookings dashboard">
        <p>Date: ${booking.date}</p>
        <p>Room Number: ${booking.roomNumber}</p>
        <p>Cost Per Night: ${booking.costPerNight}</p>
        </div>
        `
    totalSpentHTML.innerHTML = `$${testUser.calculateTotalSpent()}`
    })
}

function displayAvailableRooms(event) {
    event.preventDefault();
    if(dateInput.value) {
        const convertedDate = dateInput.value.split('-').join('/');
        const availableRooms = outlookMotel.filterForAvailableRooms(convertedDate)
        console.log(availableRooms)
        availableRoomsDisplay.innerHTML = '';
        availableRooms.forEach(room => {
            let answer = room.bidet ? 'Bidet!' : 'No Bidet :(';
            availableRoomsDisplay.innerHTML +=
                `
                <div class="available-bookings dashboard">
                    <h3 class="room-type">${room.type}</h3>
                    <p>Date: ${dateInput.value}</p>
                    <p>Room Number: ${room.number}</p>
                    <p>Bed Size: ${room.bedSize}</p>
                    <p>${room.numBeds} ${room.numBeds === 1 ? "Bed" : "Beds"}</p>
                    <p>${answer}</p>
                    <p>Cost Per Night: ${room.costPerNight}</p>
                </div>
            `
        })
    }
}
