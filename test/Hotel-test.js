import chai from 'chai';
const expect = chai.expect;
import { customers, rooms, bookings} from '../src/data/mockdata';
import Hotel from '../src/classes/Hotel';


describe('Hotel', () => {
  let hotel;

  beforeEach(() => {
    hotel = new Hotel();
		hotel.parseHotelData(rooms, bookings, customers);
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

	it('Should be able to filter for available rooms', () => {
		const allRooms = hotel.rooms;
		const availableRooms = hotel.filterForAvailableRooms("2022/04/22");
    expect(availableRooms).to.be.an('array').that.does.not.include(allRooms[6]);
  });
});