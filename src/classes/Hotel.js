import Room from "./Room"
import Booking from "./Booking";

class Hotel {
  constructor() {
		this.rooms = [];
		this.bookings = [];
		this.customers =[];
  }

	parseRooms(roomsData, bookingData) {
		this.rooms = roomsData.map(room => new Room(room))
		this.bookings = bookingData.map(booking => {
			const roomMatch = this.rooms.find(room => room.number === booking.roomNumber)
			return new Booking(booking.userID, booking.date, roomMatch, booking.id)
		})
	}

	parseBookings(bookingData) {
	}

	parseCustomers(customerData) {
		this.customers = customerData.map(user => new Room(user))
	}

}

export default Hotel;