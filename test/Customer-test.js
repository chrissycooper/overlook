import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';
import mockdata from '../src/data/mockdata';
import Room from '../src/classes/Room';


describe('Customer', () => {
	let customer1;
  let customer2;
	let room1;

  beforeEach(() => {
    customer1 = new Customer(mockdata.customers[0])
    customer2 = new Customer(mockdata.customers[5])
		room1 = new Room(mockdata.rooms[0])
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
		// customer1.bookRoom(room1);
    // expect(customer1.bookings).to.deep.equal([room1]);
	})

});