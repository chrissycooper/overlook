import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';
import { customers, rooms, bookings} from '../src/data/mockdata';
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';


describe('Customer', () => {
	let customer1;
  let customer2;
	let room1;

  beforeEach(() => {
    customer1 = new Customer(customers[0])
    customer2 = new Customer(customers[5])
		room1 = new Room(rooms[0])
  })

  it('should have an id', () => {
    expect(customer1.id).to.equal(1);
    expect(customer2.id).to.equal(9);
  });

  it('should have an name', () => {
    expect(customer1.name).to.equal("Leatha Ullrich");
    expect(customer2.name).to.equal("Faustino Quitzon");
  });

  it('should have a list of bookings', () => {
    expect(customer1.bookings).to.deep.equal([]);
  });

	it('should be able to make a booking', () => {
		customer1.bookRoom(room1, "2024/04/22");
    expect(customer1.bookings[0].userID).to.equal(1);
    expect(customer1.bookings[0].date).to.equal("2024/04/22");
    expect(customer1.bookings[0].roomNumber).to.equal(1);
	})
	
	it('should be able to parse bookings data', () => {
		customer1.createBookingArray(bookings, rooms);
    expect(customer1.bookings[0].id).to.equal("5fwrgu4i7k55hl6t8");
    expect(customer1.bookings[0]).to.be.an.instanceOf(Booking);
    expect(customer1.bookings[0].roomNumber).to.equal(12);
    expect(customer1.bookings[0].userID).to.equal(1);
    expect(customer1.bookings[0].date).to.equal("2022/02/05");
	})
	
  it('should be able to calculate total amount spent', () => {
		customer1.createBookingArray(bookings, rooms);
    customer1.bookRoom(room1, "2024/04/22");
    const totalSpent = customer1.calculateTotalSpent();
    expect(totalSpent).to.equal('530.49');
	})


});