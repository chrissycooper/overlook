import Room from "./Room";
import Booking from "./Booking";
import Customer from "./Customer";

class Hotel {
  constructor() {
		this.rooms = [];
		this.bookings = [];
		this.customers =[];
  }

	parseHotelData(roomsData, bookingsData, customerData) {
		this.rooms = roomsData.map(room => new Room(room));
		this.bookings = bookingsData.map(booking => {
			const roomMatch = this.rooms.find(room => room.number === booking.roomNumber);
			return new Booking(booking.userID, booking.date, roomMatch, booking.id);
		});

		this.customers = customerData.map(user => {
			const customer = new Customer(user);
			customer.createBookingArray(bookingsData, roomsData);
			return customer;
		});
	};

	filterForAvailableRooms(date) {
		const roomsBooked = this.bookings.filter(booking => booking.date === date).map(booking => booking.roomNumber);
		
		const availableRooms = this.rooms.reduce((acc, room) => {
			if(!roomsBooked.find(num => num === room.number)){
				acc.push(room);
			}
			return acc;
		}, []);

		return availableRooms;
	};

};

export default Hotel;