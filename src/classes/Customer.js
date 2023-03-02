import Booking from "./Booking";

class Customer {
	constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings = [];
  }

  createBookingArray(bookingsData) {
    const userBookings = bookingsData.filter(booking => booking.userID === this.id);
    userBookings.forEach(booking => this.bookings.push(booking));
  }

  bookRoom(room, date) {
    let newBooking = new Booking(this, date, room);
    this.bookings.push(newBooking);
  }
}

export default Customer;