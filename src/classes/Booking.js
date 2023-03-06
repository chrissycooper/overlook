class Booking {
  constructor(userID, date, room, id) {
    this.id = id || Date.now();
	this.userID = userID;
	this.date = date;
	this.roomNumber = room.number;
	this.costPerNight = room.costPerNight;
  }
    
}

export default Booking;