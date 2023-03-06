import chai from 'chai';
const expect = chai.expect;
import { customers, rooms, bookings} from '../src/data/mockdata';
import Hotel from '../src/classes/Hotel';
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';


describe('Hotel', () => {
  let hotel, room;

  beforeEach(() => {
    hotel = new Hotel();
	hotel.parseHotelData(rooms, bookings, customers);
	room = new Room(rooms[0])
  });

  it('Should have properties for rooms, bookings, and customers', () => {
    expect(hotel.rooms).to.be.an('array');
    expect(hotel.bookings).to.be.an('array');
    expect(hotel.customers).to.be.an('array');
  });

	it('Should be able to parse room data', () => {
		expect(hotel.rooms.length).to.equal(8);
		expect(hotel.rooms[0].type).to.equal("residential suite");
		expect(hotel.rooms[0].bidet).to.equal(true);
		expect(hotel.rooms[0].bedSize).to.equal("queen");
		expect(hotel.rooms[0].number).to.equal(1);
		expect(hotel.rooms[0].numBeds).to.equal(1);
		expect(hotel.rooms[0].costPerNight).to.equal(358.4);
	});

	it('Should be able to parse bookings data', () => {
		expect(hotel.bookings.length).to.equal(5);
		expect(hotel.bookings[0].id).to.equal("5fwrgu4i7k55hl6sz");
		expect(hotel.bookings[0].userID).to.equal(9);
		expect(hotel.bookings[0].date).to.equal("2022/04/22");
		expect(hotel.bookings[0].roomNumber).to.equal(15);
	});

	it('Should be able to parse customer data', () => {
		expect(hotel.customers.length).to.equal(9);
		expect(hotel.customers[0].id).to.equal(1);
		expect(hotel.customers[0].name).to.equal("Leatha Ullrich");
		expect(hotel.customers[0].bookings[0].id).to.equal("5fwrgu4i7k55hl6t8");
		expect(hotel.customers[0].bookings[0].costPerNight).to.equal(172.09);
	});

	it('Should be able to filter for available rooms by date', () => {
		const allRooms = hotel.rooms;
		const availableRooms = hotel.filterForAvailableRooms("2022/04/22");
    	expect(availableRooms).to.be.an('array').that.does.not.include(allRooms[6]);
  	});

	it('Should be able to filter for available rooms by type and date', () => {
		const allRooms = hotel.rooms;
		const availableRooms = hotel.filterForAvailableRooms("2022/04/22", "single room");
    	expect(availableRooms).to.be.an('array').that.does.not.include(allRooms[6]);
		expect(availableRooms[0].type).to.equal('single room');

		const availableSuites = hotel.filterForAvailableRooms("2022/04/22", "suite")
		expect(availableSuites[0].type).to.equal('suite');
		expect(availableSuites[availableSuites.length-1].type).to.equal('suite');
  	});

	it('should be able to get total available rooms for today\'s date', () => {
		const roomsToday = hotel.getRoomsAvailableToday();
		expect(roomsToday).to.be.an('array');
		expect(roomsToday).to.deep.equal(hotel.rooms);
	});

	it('should be able to get total revenue for today\'s date', () => {
		const revenueToday = hotel.getRevenueToday();
		expect(revenueToday).to.be.a('string');
		expect(revenueToday).to.equal('0.00');

		let date = new Date().toJSON().slice(0, 10).split('-').join('/');
		hotel.bookings.push(new Booking(1, date, room));

		const revenue2 = hotel.getRevenueToday();
		expect(revenue2).to.be.a('string');
		expect(revenue2).to.equal('358.40');
	});

	it('should be able to get percentage occupied rooms for today\'s date', () => {
		const percent = hotel.getPercentageOccupied();
		expect(percent).to.be.a('number');
		expect(percent).to.equal(0);

		let date = new Date().toJSON().slice(0, 10).split('-').join('/');
		hotel.bookings.push(new Booking(1, date, room));

		const percent2 = hotel.getPercentageOccupied();
		expect(percent2).to.be.a('number');
		expect(percent2).to.equal(12.5);
	});

	it('should be able to search for customer by name', () => {
		const user = hotel.searchUserByName("Kennedi Emard");
	
		expect(user.name).to.equal("Kennedi Emard");
		expect(user.id).to.equal(4);

		const user2 = hotel.searchUserByName("Christina Kulas");
	
		expect(user2.name).to.equal("Christina Kulas");
		expect(user2.id).to.equal(13);
		expect(user2.bookings.length).to.equal(1);

	});

});