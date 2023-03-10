import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/classes/Booking';
import { customers, rooms, bookings } from '../src/data/mockdata';
import Customer from '../src/classes/Customer';
import Room from '../src/classes/Room';

describe('Booking', () => {
  let booking1;
  let booking2;
  let user9;
  let user1;
  let room15;
  let room12;

  beforeEach(() => {
    const bData1 = bookings[0];
    const bData2 = bookings[bookings.length-1];

    user9 = new Customer(customers[5]);
    user1 = new Customer(customers[0]);

    room15 = new Room(rooms[6]);
    room12 = new Room(rooms[5]);

    booking1 = new Booking(user9.id, bData1.date, room15, bData1.id);
    booking2 = new Booking(user1.id, bData2.date, room12, bData2.id);
  })
  
  it('should have a customer', () => {
    expect(booking1.userID).to.equal(9);
    expect(booking2.userID).to.equal(1);
  });
  
  it('should have a date', () => {
    expect(booking1.date).to.equal("2022/04/22");
    expect(booking2.date).to.equal("2022/02/05");
  });

  it('should have a room number', () => {
    expect(booking1.roomNumber).to.equal(15);
    expect(booking2.roomNumber).to.equal(12);
  });
  
  it('should have an id', () => {
    expect(booking1.id).to.equal("5fwrgu4i7k55hl6sz");
    expect(booking2.id).to.equal("5fwrgu4i7k55hl6t8");
  });

  it('should have a cost per night based on the room', () => {
    expect(booking1.costPerNight).to.equal(294.56);
    expect(booking2.costPerNight).to.equal(172.09);
  });
});