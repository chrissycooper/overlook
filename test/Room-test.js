import chai from 'chai';
const expect = chai.expect;
import Room from '../src/classes/Room';
import mockdata from '../src/data/mockdata';

describe('Room', () => {
  let room1;
  let room2;

  beforeEach(() => {
    room1 = new Room(mockdata.rooms[0]);
		room2 = new Room(mockdata.rooms[mockdata.rooms.length-1]);
  });

	it('should have a number', () => {
		expect(room1.number).to.equal(1);
		expect(room2.number).to.equal(24);
	})

	it('should have a type', () => {
		expect(room1.type).to.equal("residential suite");
		expect(room2.type).to.equal("suite");
	})
	
	it('should have a way to tell if it has a bidet', () => {
		expect(room1.bidet).to.equal(true);
		expect(room2.bidet).to.equal(false);
	})

	it('should have a bed size', () => {
		expect(room1.bedSize).to.equal('queen');
		expect(room2.bedSize).to.equal('queen');
	})
	
	it('should have a number of beds', () => {
		expect(room1.numBeds).to.equal(1);
		expect(room2.numBeds).to.equal(1);
	})
	
	it('should have a cost per night', () => {
		expect(room1.costPerNight).to.equal(358.4);
		expect(room2.costPerNight).to.equal(327.24);
	})

});