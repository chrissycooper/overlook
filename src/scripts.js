// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/motel-carpet.png';
import { apiCalls, postNewBooking, getSingleUser } from './apiCalls';
import Customer from './classes/Customer';
import Hotel from './classes/Hotel';
import Booking from './classes/Booking';

const userBookingsSection = document.getElementById("userBookings");
const totalSpentHTML = document.getElementById("total-spent");
const dateInput = document.getElementById("choiceOfDate");
const submitButton = document.getElementById("dateSubmit");
const availableRoomsDisplay = document.getElementById("availableBookings");
const loginPage = document.getElementById("login-page");
const roomSelect = document.getElementById('room-select');
const username = document.getElementById('username');
const customerNameDisplay = document.getElementById('user-name');
const password = document.getElementById('pass');
const loginButton = document.getElementById('submitPass');
const dashboardDisplay = document.getElementById("dashboard");
const errorSection = document.getElementById('error-sect');
const errMessage = document.getElementById("error-message");
const managerView = document.getElementById("managerView");
const balance = document.getElementById('balance');

const totalRoomsToday = document.getElementById('totalRoomsToday');
const totalRevenueToday = document.getElementById('totalRevToday');
const percentOccupiedToday = document.getElementById('percentOccupied');


let overlookMotel, currentUser, testUser;

Promise.all(apiCalls)
    .then(values => {
        const bookingsData = values[0].bookings;
        const roomsData = values[1].rooms;
        const customersData = values[2].customers;
        testUser = new Customer(values[3]);
        testUser.createBookingArray(bookingsData, roomsData);
        overlookMotel = new Hotel();
        overlookMotel.parseHotelData(roomsData, bookingsData, customersData);
    })


submitButton.addEventListener('click', displayAvailableRooms);
availableRoomsDisplay.addEventListener('click', bookRoomForUser);
loginButton.addEventListener('click', logIn);


function logIn(event) {
    event.preventDefault();
    if(username.value === 'manager' && password.value === 'overlook2021') {
        displayManagerView();
    } else if(password.value === 'overlook2021' && username.value.length === 10) {
        const currentUserID = parseInt(username.value.slice(-2));
        currentUser = overlookMotel.customers.find(customer => customer.id === currentUserID)
        // Promise.all(getSingleUser(currentUserID))
        // .then(data => {
        //     currentUser = data
        //     displayUserInfo(currentUser)
        // })
        // .catch(err => console.log(err))
        displayUserInfo(currentUser)
    } else if (password.value === 'overlook2021' && username.value.length === 9){
        const currentUserID = parseInt(username.value.slice(-1));
        currentUser = overlookMotel.customers.find(customer => customer.id === currentUserID);
        console.log(currentUser)
        displayUserInfo(currentUser)
    } else if(password.value || username.value){
        showErrorModal();
    }
}

function displayUserInfo(user){
    hide(loginPage);
    show(dashboardDisplay);
    customerNameDisplay.innerText = user.name + '!'
    userBookingsSection.innerHTML = `<h2 class="yourBookings">Your Booking History</h2>`
    user.bookings.forEach((booking, index) => {
        userBookingsSection.innerHTML += 
        `
        <div class="current-bookings dashboard" tabindex="0" alt-text="This is an entry of your booking history: number ${index} of ${user.bookings.length}">
        <p>Date: ${booking.date}</p>
        <p>Room Number: ${booking.roomNumber}</p>
        <p>Cost Per Night: $${booking.costPerNight}</p>
        </div>
        `
    totalSpentHTML.innerHTML = `$${user.calculateTotalSpent()}`
    })
}

function displayManagerView() {
    show(managerView);
    show(dashboardDisplay)
    hide(loginPage);
    hide(balance);
    customerNameDisplay.innerText = 'manager'; 
    console.log(overlookMotel.bookings)
    const date = new Date().toJSON().slice(0, 10).split('-').join('/');
    console.log('date', date) //why is this one day later
    totalRoomsToday.innerText = `${overlookMotel.getRoomsAvailableToday(date).length}`;
    totalRevenueToday.innerText = `$${overlookMotel.getRevenueToday()}`;
    percentOccupiedToday.innerText = `${overlookMotel.getPercentageOccupied()}%`
}

function showErrorModal() {
    show(errorSection)
    errMessage.innerText = 'Oops! Incorrect username or password';
    setTimeout(() => {
        hide(errorSection);
        username.value = '';
        password.value = '';
    }, 1500)
}

function bookRoomForUser(event) {
    if(event.target.classList.contains("bookBtn")) {
        const convertedDate = dateInput.value.split('-').join('/');
        const room = overlookMotel.rooms.find(room => room.number === parseInt(event.target.id))
        let newBooking = new Booking(currentUser.id, convertedDate, room);
        postNewBooking(newBooking);
        hide(event.target.parentNode);
        currentUser.bookRoom(room, convertedDate);
        displayUserInfo(currentUser);
        overlookMotel.bookings.push(newBooking);
    }
}

function displayAvailableRooms(event) {
    event.preventDefault();
    if(dateInput.value) {
        const convertedDate = dateInput.value.split('-').join('/');
        const convertedSelection = roomSelect.value.split('-').join(' ');
        const availableRooms = overlookMotel.filterForAvailableRooms(convertedDate, convertedSelection);
        
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
