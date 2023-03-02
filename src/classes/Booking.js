class Booking {
  constructor(userID, date, room, id) {
    this.id = id || Date.now();
	this.userID = userID;
	this.date = date;
	this.roomNumber = room.number;
	this.costPerNight = room.costPerNight;
		//should this be a whole room? How do we want to access the data about the room in the booking? we could find all rooms by room number and then access that data there
  }

	//if we want to create a new booking, we will probably need to pass in the id last
    
}

export default Booking;