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

	filterForAvailableRooms(date, roomType) {
		const roomsBooked = this.bookings.filter(booking => booking.date === date).map(booking => booking.roomNumber);
		
		const availableRooms = this.rooms.reduce((acc, room) => {
			if(!roomsBooked.find(num => num === room.number)){
				acc.push(room);
			}
			return acc;
		}, []);

		if(roomType) {
			return availableRooms.filter(room => room.type === roomType)
		} else {
			return availableRooms
		}

	};

	getRoomsAvailableToday(date) {
		// const date = new Date().toJSON().slice(0, 10).split('-').join('/');

		return this.filterForAvailableRooms(date);
	}

	getRevenueToday(){
		const date = new Date().toJSON().slice(0, 10).split('-').join('/');
		const roomsBooked = this.bookings.filter(booking => booking.date === date).reduce((acc, booking) => {
			return acc += booking.costPerNight
		}, 0)
		return roomsBooked;
	}

	getPercentageOccupied() {
		const date = new Date().toJSON().slice(0, 10).split('-').join('/');
		const roomsBooked = this.bookings.filter(booking => booking.date === date);
		
		return (roomsBooked.length/this.rooms.length) * 100;
	};
};

export default Hotel;