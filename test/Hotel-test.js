import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';
import { customers, rooms, bookings} from '../src/data/mockdata';
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';
import Hotel from '../src/classes/Hotel';


describe('Hotel', () => {
  let hotel;
  let customer2;
	let room1;

  beforeEach(() => {
    hotel = new Hotel()
    customer2 = new Customer(customers[5])
		room1 = new Room(rooms[0])
  })

  it('Should have properties for rooms, bookings, and customers', () => {
    expect(hotel.rooms).to.deep.equal([]);
    expect(hotel.bookings).to.deep.equal([]);
    expect(hotel.customers).to.deep.equal([]);
  });

	it('Should be able to parse room data', () => {
		hotel.parseRooms(rooms, bookings)
		expect(hotel.rooms.length).to.equal(8)
	})

	it('Should be able to parse bookings data', () => {
		hotel.parseRooms(rooms, bookings)
		console.log(hotel.bookings)
		expect(hotel.bookings.length).to.equal(5)
		expect(hotel.bookings[0].id).to.equal("5fwrgu4i7k55hl6sz")
		expect(hotel.bookings[0].userID).to.equal(9)
		expect(hotel.bookings[0].date).to.equal("2022/04/22")
		expect(hotel.bookings[0].roomNumber).to.equal(15)
	})

	it.skip('Should be able to parse customer data', () => {
		hotel.parseCustomers(customers)
		expect(hotel.customers.length).to.equal(9)
	})

});