import Booking from "./Booking";
import Room from "./Room";

class Customer {
	constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings = [];
  }

  createBookingArray(bookingsData, roomsData) {
    const userBookings = bookingsData.filter(booking => booking.userID === this.id);
    userBookings.forEach(booking => {
      let room = roomsData.find(room => room.number === booking.roomNumber);
      const convertedRoom = new Room(room);
      let newBooking = new Booking(booking.userID, booking.date, convertedRoom, booking.id);
      this.bookings.push(newBooking);
    });
  }

  bookRoom(room, date) {
    let newBooking = new Booking(this.id, date, room);
    this.bookings.push(newBooking);
  }

	calculateTotalSpent() {
    return this.bookings.reduce((acc, booking) => {
      return acc += booking.costPerNight
    }, 0)
  }
}

export default Customer;