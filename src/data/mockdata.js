const customers = [
    {id: 1, name: "Leatha Ullrich"},
    {id: 2, name: "Rocio Schuster"},
    {id: 3, name: "Kelvin Schiller"},
    {id: 4, name: "Kennedi Emard"},
    {id: 5, name: "Rhiannon Little"},
    {id: 9, name: "Faustino Quitzon"},
    {id: 13, name: "Christina Kulas"},
    {id: 20, name: "Keon Kirlin"},
    {id: 43, name: "Earline Hamill"},
];

const rooms = [
    {
        number: 1,
        roomType: "residential suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 358.4
    },
    {
        number: 2,
        roomType: "suite",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 477.38
    },
    {
        number: 3,
        roomType: "single room",
        bidet: false,
        bedSize: "king",
        numBeds: 1,
        costPerNight: 491.14
    },
    {
        number: 4,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 429.44
    },
    {
        number: 7,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 231.46
    },
    {
        number: 12,
        roomType: "single room",
        bidet: false,
        bedSize: "twin",
        numBeds: 2,
        costPerNight: 172.09
    },
    {
        number: 15,
        roomType: "residential suite",
        bidet: false,
        bedSize: "full",
        numBeds: 1,
        costPerNight: 294.56
    },
    {
        number: 24,
        roomType: "suite",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 327.24
    },
]

const bookings = [
    {
        id: "5fwrgu4i7k55hl6sz",
        userID: 9,
        date: "2022/04/22",
        roomNumber: 15
    },
    {
        id: "5fwrgu4i7k55hl6t5",
        userID: 43,
        date: "2022/01/24",
        roomNumber: 24
    },
    {
        id: "5fwrgu4i7k55hl6t6",
        userID: 13,
        date: "2022/01/10",
        roomNumber: 12
    },
    {
        id: "5fwrgu4i7k55hl6t7",
        userID: 20,
        date: "2022/02/16",
        roomNumber: 7
    },
    {
        id: "5fwrgu4i7k55hl6t8",
        userID: 1,
        date: "2022/02/05",
        roomNumber: 12
    },
]

export { customers, rooms, bookings }