// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import { apiCalls } from './apiCalls';
import Customer from './classes/Customer';


console.log('This is the JavaScript entry file - your code begins here.');
let testUser;

Promise.all(apiCalls)
    .then(values => {
        const bookingsData = values[0].bookings
        const roomsData = values[1].rooms
        const customersData = values[2].customers
        testUser = new Customer(values[3])
        console.log(testUser)
    })