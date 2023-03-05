// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/motel-carpet.png';
import { apiCalls, postNewBooking } from './apiCalls';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';
import Booking from './classes/Booking';

const userBookingsSection = document.getElementById("userBookings");
const totalSpentHTML = document.getElementById("total-spent");
const dateInput = document.getElementById("choiceOfDate");
const submitButton = document.getElementById("dateSubmit");
const availableRoomsDisplay = document.getElementById("availableBookings");
const roomSelect = document.getElementById('room-select');
const username = document.getElementById('user-name');

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
        displayUserInfo();
    });

submitButton.addEventListener('click', displayAvailableRooms);
availableRoomsDisplay.addEventListener('click', bookRoom)

function displayUserInfo(){
    username.innerText = testUser.name
    userBookingsSection.innerHTML = `<h2 class="yourBookings">Your Booking History</h2>`
    testUser.bookings.forEach(booking => {
        userBookingsSection.innerHTML += 
        `
        <div class="current-bookings dashboard" tabindex="0">
        <p>Date: ${booking.date}</p>
        <p>Room Number: ${booking.roomNumber}</p>
        <p>Cost Per Night: $${booking.costPerNight}</p>
        </div>
        `
    totalSpentHTML.innerHTML = `$${testUser.calculateTotalSpent()}`
    })
}

function bookRoom(event) {
    if(event.target.classList.contains("bookBtn")) {
        const convertedDate = dateInput.value.split('-').join('/');
        const room = outlookMotel.rooms.find(room => room.number === parseInt(event.target.id))
        let newBooking = new Booking(testUser.id, convertedDate, room);
        postNewBooking(newBooking);
        hide(event.target.parentNode);
        testUser.bookRoom(room, convertedDate);
        displayUserInfo();
        outlookMotel.bookings.push(newBooking);
    }
}

function displayAvailableRooms(event) {
    event.preventDefault();
    if(dateInput.value) {
        const convertedDate = dateInput.value.split('-').join('/');
        const convertedSelection = roomSelect.value.split('-').join(' ');
        const availableRooms = outlookMotel.filterForAvailableRooms(convertedDate, convertedSelection);
        
        availableRoomsDisplay.innerHTML = '';

        if(availableRooms.length){
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
                        <p>Cost Per Night:$ ${room.costPerNight}</p>
                        <button id="${room.number}" class="bookBtn">Book This Room</button>
                    </div>
                `
            })
        } else {
            availableRoomsDisplay.innerHTML += `<p class="apology">Our deepest apologies, there are no available rooms of that type on that date, please have mercy on our souls and adjust your search.</p>`
        }
    }
}

function hide(element){
    element.classList.add('hidden');
}
function show(element){
    element.classList.remove('hidden');
}
