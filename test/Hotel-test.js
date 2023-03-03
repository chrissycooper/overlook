import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';
import { customers, rooms, bookings} from '../src/data/mockdata';
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';


describe('Hotel', () => {
  let customer1;
  let customer2;
	let room1;

  beforeEach(() => {
    customer1 = new Customer(customers[0])
    customer2 = new Customer(customers[5])
	room1 = new Room(rooms[0])
  })

  it('should have a list of all rooms', () => {
    expect(customer1.id).to.equal(1);
    expect(customer2.id).to.equal(9);
  });

});