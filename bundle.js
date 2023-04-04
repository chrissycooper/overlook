/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hide": () => (/* binding */ hide),
/* harmony export */   "overlookMotel": () => (/* binding */ overlookMotel),
/* harmony export */   "displayUserInfo": () => (/* binding */ displayUserInfo),
/* harmony export */   "displayUserSearchInfo": () => (/* binding */ displayUserSearchInfo),
/* harmony export */   "serverMessage": () => (/* binding */ serverMessage)
/* harmony export */ });
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_motel_carpet_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _classes_Customer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _classes_Hotel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var _classes_Booking__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);







const userBookingsSection = document.getElementById("userBookings");
const totalSpentHTML = document.getElementById("total-spent");
const dateInput = document.getElementById("choiceOfDate");
const submitButton = document.getElementById("dateSubmit");
const availableRoomsDisplay = document.getElementById("availableBookings");
const loginPage = document.getElementById("login-page");
const roomSelect = document.getElementById('room-select');
const username = document.getElementById('username');
const customerNameDisplay = document.getElementById('user-name');
const password = document.getElementById('pass');
const loginButton = document.getElementById('submitPass');
const dashboardDisplay = document.getElementById("dashboard");
const errorSection = document.getElementById('error-sect');
const errMessage = document.getElementById("error-message");
const managerView = document.getElementById("managerView");
const balance = document.getElementById('balance');
const userBookingFormView = document.getElementById('userBookingForm');

const totalRoomsToday = document.getElementById('totalRoomsToday');
const totalRevenueToday = document.getElementById('totalRevToday');
const percentOccupiedToday = document.getElementById('percentOccupied');

const searchUserButton = document.getElementById('customerSearchSubmit');
const searchUserInput = document.getElementById('customerSearchInput');
const searchedName = document.getElementById('customerName');
const customerInfoSection = document.getElementById('customerInfo');
const phantomMenance = document.getElementById('phantomMenace')

const customerBookings = document.getElementById('customerBookingsInfo');
const serverMessage = document.getElementById('serverMessage');


let overlookMotel, currentUser, testUser;

Promise.all(_apiCalls__WEBPACK_IMPORTED_MODULE_2__.apiCalls)
    .then(values => {
        const bookingsData = values[0].bookings;
        const roomsData = values[1].rooms;
        const customersData = values[2].customers;
        testUser = new _classes_Customer__WEBPACK_IMPORTED_MODULE_3__.default(values[3]);
        testUser.createBookingArray(bookingsData, roomsData);
        overlookMotel = new _classes_Hotel__WEBPACK_IMPORTED_MODULE_4__.default();
        overlookMotel.parseHotelData(roomsData, bookingsData, customersData);
    })


submitButton.addEventListener('click', displayAvailableRooms);
availableRoomsDisplay.addEventListener('click', bookRoomForUser);
loginButton.addEventListener('click', logIn);
customerInfoSection.addEventListener('click', event => {
    if (event.target.type === "checkbox") {
        event.target.checked ? filterForFuture() : displayUserSearchInfo(currentUser);
    };
})
searchUserButton.addEventListener('click', () => {
    const searchedUser = searchForUser(event);
    if(searchedUser){
        displayUserSearchInfo(searchedUser);
        currentUser = searchedUser;
        show(userBookingFormView);
    }
});
customerBookings.addEventListener('click', (event) => {
    if(event.target.id){
        (0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.deleteBooking)(event.target.id, currentUser);
    }
}) 


function logIn(event) {
    event.preventDefault();
    if(username.value === 'manager' && password.value === 'overlook2021') {
        overlookMotel.managerMode = true;
        displayManagerView();
        currentUser = null;
    } else if(password.value === 'overlook2021' && username.value.length === 10) {
        const currentUserID = parseInt(username.value.slice(-2));
        currentUser = overlookMotel.customers.find(customer => customer.id === currentUserID);
        displayUserInfo(currentUser);
    } else if (password.value === 'overlook2021' && username.value.length === 9){
        const currentUserID = parseInt(username.value.slice(-1));
        currentUser = overlookMotel.customers.find(customer => customer.id === currentUserID);
        displayUserInfo(currentUser);
    } else if(password.value || username.value){
        showErrorModal("Oops! incorrect username or password");
    } else {
        showErrorModal("Please fill out required fields");
    }
}

function displayUserInfo(user){
    hide(loginPage);
    show(dashboardDisplay);
    customerNameDisplay.innerText = user.name + '!'
    userBookingsSection.innerHTML = `<h2 class="yourBookings">Your Booking History</h2>`
    user.bookings.forEach((booking, index) => {
        userBookingsSection.innerHTML += 
        `
        <div class="current-bookings dashboard" tabindex="0" alt-text="This is an entry of your booking history: number ${index} of ${user.bookings.length}">
        <p>Date: ${booking.date}</p>
        <p>Room Number: ${booking.roomNumber}</p>
        <p>Cost Per Night: $${booking.costPerNight}</p>
        </div>
        `
    totalSpentHTML.innerHTML = `$${user.calculateTotalSpent()}`
    })
}

function displayUserSearchInfo(user){
    searchedName.innerText = user.name;
    customerInfoSection.innerHTML = `<h2 class="yourBookings">${user.name}'s History</h2>
    <p class='label'>Total Spent: $${user.calculateTotalSpent()}</p>
    <input type="checkbox" id="filterByDate" name="vehicle1" value="Bike">
    <label for="filterByDate" class="label">Filter by Future Dates</label>
    `
    customerBookings.innerHTML = ''
    user.bookings.forEach((booking, index) => {
        customerBookings.innerHTML += 
        `
        <div class="current-bookings dashboard" tabindex="0" alt-text="This is an entry of your booking history: number ${index} of ${user.bookings.length}">
        <p>Date: ${booking.date}</p>
        <p>Room Number: ${booking.roomNumber}</p>
        <p>Cost Per Night: $${booking.costPerNight}</p>
        </div>
        `
    })
}

function filterForFuture(){
    let date = new Date().toJSON().slice(0, 10).split('-').join('');
    date = parseInt(date)
    const filteredFuture = currentUser.bookings.filter(booking => {
        let bDate = parseInt(booking.date.split('/').join(''))
        return bDate >= date
    });

    customerBookings.innerHTML = ''

    filteredFuture.forEach((booking, index) => {
        customerBookings.innerHTML += 
        `
        <div class="current-bookings dashboard" tabindex="0" alt-text="This is an entry of your booking history: number ${index} of ${filteredFuture.length}">
        <p>Date: ${booking.date}</p>
        <p>Room Number: ${booking.roomNumber}</p>
        <p>Cost Per Night: $${booking.costPerNight}</p>
        <button data.name="delete-button" id="${booking.id}">Delete Booking</button>
        </div>
        `
    })
}

function displayManagerView() {
    show(managerView);
    show(dashboardDisplay);
    hide(loginPage);
    hide(balance);
    hide(userBookingFormView);
    hide(phantomMenance);
    
    customerNameDisplay.innerText = 'manager'; 

    if(currentUser) {
        show(userBookingFormView);
    }
    
    const date = new Date().toJSON().slice(0, 10).split('-').join('/');
    totalRoomsToday.innerText = `${overlookMotel.filterForAvailableRooms(date).length}`;
    totalRevenueToday.innerText = `$${overlookMotel.getRevenueToday()}`;
    percentOccupiedToday.innerText = `${overlookMotel.getPercentageOccupied()}%`;
}

function showErrorModal(message) {
    show(errorSection)
    errMessage.innerText = message;
    setTimeout(() => {
        hide(errorSection);
        username.value = '';
        password.value = '';
    }, 1500)
}

function bookRoomForUser(event) {
    if(event.target.classList.contains("bookBtn")) {
        const convertedDate = dateInput.value.split('-').join('/');
        const room = overlookMotel.rooms.find(room => room.number === parseInt(event.target.id));
        const newBooking = new _classes_Booking__WEBPACK_IMPORTED_MODULE_5__.default(currentUser.id, convertedDate, room);
        (0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.postNewBooking)(newBooking, event, currentUser, room, convertedDate);
    }
}

function searchForUser(event) {
    event.preventDefault()
    const customer = overlookMotel.customers.find(customer => customer.name === searchUserInput.value);
    currentUser = customer;
    return customer
}

function displayAvailableRooms(event) {
    event.preventDefault();
    
    if(dateInput.value ) {
        const convertedDate = dateInput.value.split('-').join('/');
        const convertedSelection = roomSelect.value.split('-').join(' ');
        const availableRooms = overlookMotel.filterForAvailableRooms(convertedDate, convertedSelection);
        
        availableRoomsDisplay.innerHTML = '';

        if(availableRooms.length){
            availableRooms.forEach(room => {
                let answer = room.bidet ? 'Bidet!' : 'No Bidet :(';
                availableRoomsDisplay.innerHTML +=
                    `
                    <div class="available-bookings dashboard">
                        <h3 class="room-type">${room.type}</h3>
                        <p>Date: ${dateInput.value}</p>
                        <p>Room Number: ${room.number}</p>
                        <p>Bed Size: ${room.bedSize}</p>
                        <p>${room.numBeds} ${room.numBeds === 1 ? "Bed" : "Beds"}</p>
                        <p>${answer}</p>
                        <p>Cost Per Night:$ ${room.costPerNight}</p>
                        <button id="${room.number}" class="bookBtn">Book This Room</button>
                    </div>
                `
            })
        } else {
            availableRoomsDisplay.innerHTML += `<p class="apology">Our deepest apologies, there are no available rooms of that type on that date, please have mercy on our souls and adjust your search.</p>`
        }
    } else if (!dateInput.value){
        showErrorModal('Please choose a date')
    } else if(convertedDate < date) {
        console.log(convertedDate, date)
        showErrorModal('Pleast choose a date in the present or future. This is not a time traveling motel.')
    }
}

function hide(element){
    element.classList.add('hidden');
}
function show(element){
    element.classList.remove('hidden');
}



/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* palette */\n/* light cyan CDEEF4 */\n/* Off red #FA0000 */\n/* mexican pink #E31C79 */\n/* oxford blue #03012C */\n/* byzantine blue #2F52E0 47, 82, 224*/\n/* misty rose #FFE3E3 */\n\n* {\n  font-family:'Raleway';\n  margin: 0px;\n}\n\nbody {\n  background: #CDEEF4;\n  background-repeat: no-repeat;\n  background-size: cover;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n}\n\nmain {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  flex-direction: row;\n}\n\nnav {\n  height: 18vh;\n  width: 100vw;\n  background-color: rgb(3,1,44, .75);\n  margin: 0px;\n  display: flex;\n  flex-flow: column wrap;\n  align-content: flex-end;\n  justify-content: center;\n  border-bottom: 2mm ridge rgba(47, 82, 224, .6);\n}\n\n.name{\n  padding-right: 15px;\n}\n\n.userName {\n padding-right: 15px;\n}\n\n.logo {\n  color: white;\n\tfont-size: 60pt;\n\tfont-family: sans-serif;\n  z-index: 1;\n  position: absolute;\n  -webkit-text-stroke: 2px #E21F03;\n  position: absolute;\n  text-shadow: 5px 6px 12px #E31C79;\n  margin: 25px;\n  font-kerning: none;\n}\n\n.managerView {\n  display: flex;\n}\n\n.hotelInfo {\n  width: 25vw;\n  height: 50vh;\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: #03012C;\n  opacity: 75%;\n  margin: 50px;\n  border-radius: 15px;\n  position: relative;\n  z-index: 1;\n}\n\n.customer-info {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n\n.userBookingsSect{\n  width: 500px;\n  height: 70vh;\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: row;\n  justify-content: center;\n  background-color: #03012C;\n  opacity: 75%;\n  overflow-y: scroll;\n  margin: 50px;\n  border-radius: 15px;\n  z-index: 1;\n }\n\n .form-wrapper {\n  display: flex;\n  flex-flow: column wrap; \n  align-items: center;\n }\n\n form{\n  display: flex;\n  flex-flow: column wrap;\n }\n\n.dashboard {\n  width: 200px;\n  height: 100px;\n  background: white;\n  margin: 25px;\n  border-radius: 15px;\n  display: flex;\n  justify-content: center;\n}\n\n.dashboard-wrapper {\n  height: 100vh;\n}\n\n.current-bookings,\n.available-bookings {\n  display: flex;\n  justify-content: space-evenly;\n  flex-direction: column;\n  align-items: center;\n  width: 350px;\n}\n\n.available-bookings {\n  height: 200px;\n  width: 300px;\n}\n\nh2 {\n  margin-top: 10px;\n  font-size: 24pt;\n  color: whitesmoke;\n  display: flex;\n  flex-direction: row;\n}\n\nh3 {\n  font-size: 18pt;\n  display: flex;\n  color: whitesmoke;\n  padding: 10px;\n  flex-direction: column;\n}\n\nh4 {\n  font-size: 15pt;\n  display: flex;\n  color: whitesmoke;\n  padding: 10px;\n  flex-direction: column;\n}\n\n.label {\n  color: whitesmoke;\n  padding: 10px;\n}\n\n.room-type{\n  text-transform: capitalize;\n  color: #03012C;\n}\n\n.balance {\n  color: #2F52E0;\n  margin: 50px;\n  padding: 25px;\n  background-color: #03012C;\n  width: 300px;\n  border-radius: 15px;\n}\n\n.apology{\n  color: whitesmoke;\n  margin: 25px;\n}\n\n/* LOGIN PAGE STYLING */\n\n\nh1 {\n  color: red;\n  color: white;\n\tfont-size: 47px;\n\tfont-family: sans-serif;\n  z-index: 1;\n  position: absolute;\n}\n\n.login-page{\n  display:flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: baseline;\n}\n\n\n.motel {\n  -webkit-text-stroke: 3px #E21F03;\n  margin-top: 125px;\n  margin-left: 100px;\n  writing-mode: vertical-rl;\n  text-shadow: 0px 8px 12px blue;\n  text-orientation: upright;\n  font-size: 60pt;\n}\n\n.shape {\n  width: 0; \n  height: 0; \n  border-left: 100px solid transparent;\n  border-right: 100px solid transparent;\n  border-top: 500px solid #f00;\n  z-index: -5;\n  position: relative;\n  opacity: 75%;\n}\n\n.overlook {\n  -webkit-text-stroke: 2px #E21F03;\n  position: absolute;\n  text-shadow: 0px 4px 8px white;\n  margin-top: 50px;\n  margin-left: 100px;\n  font-size: 40pt;\n  font-kerning: none;\n}\n\n.oval {\n  width: 500px;\n  height: 200px;\n  border-radius: 50%;\n  background: darkblue;\n}\n\n.outside {\n  margin-top: 100px;\n  margin-left:100px;\n}\n\n.error {\n  position: fixed;\n  display: flex;\n  justify-items: center;\n  align-items: center;\n  height: 100vh;\n  width: 100vw;\n  z-index: 1000;\n}\n\n.modal {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  position: absolute;\n  width: 20vw;\n  border-radius: 15px;\n  height: 20vh;\n  background-color: #f1f1f1;\n  /* transform: translate(-50%, -50%); */\n  /* top: 10%; */\n  left: 40%;\n  box-shadow: 0px 0px 10px #03012C;\n  font-size: 15pt;\n  z-index: 1000;\n}\n\n\n.hidden{\n  display: none;\n}\n\n\n\n\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA,YAAY;AACZ,sBAAsB;AACtB,oBAAoB;AACpB,yBAAyB;AACzB,wBAAwB;AACxB,sCAAsC;AACtC,uBAAuB;;AAEvB;EACE,qBAAqB;EACrB,WAAW;AACb;;AAEA;EACE,mBAAmB;EACnB,4BAA4B;EAC5B,sBAAsB;EACtB,aAAa;EACb,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,6BAA6B;EAC7B,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,kCAAkC;EAClC,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,uBAAuB;EACvB,8CAA8C;AAChD;;AAEA;EACE,mBAAmB;AACrB;;AAEA;CACC,mBAAmB;AACpB;;AAEA;EACE,YAAY;CACb,eAAe;CACf,uBAAuB;EACtB,UAAU;EACV,kBAAkB;EAClB,gCAAgC;EAChC,kBAAkB;EAClB,iCAAiC;EACjC,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,aAAa;EACb,eAAe;EACf,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,yBAAyB;EACzB,YAAY;EACZ,YAAY;EACZ,mBAAmB;EACnB,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;;AAGA;EACE,YAAY;EACZ,YAAY;EACZ,aAAa;EACb,eAAe;EACf,mBAAmB;EACnB,uBAAuB;EACvB,yBAAyB;EACzB,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,mBAAmB;EACnB,UAAU;CACX;;CAEA;EACC,aAAa;EACb,sBAAsB;EACtB,mBAAmB;CACpB;;CAEA;EACC,aAAa;EACb,sBAAsB;CACvB;;AAED;EACE,YAAY;EACZ,aAAa;EACb,iBAAiB;EACjB,YAAY;EACZ,mBAAmB;EACnB,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,aAAa;AACf;;AAEA;;EAEE,aAAa;EACb,6BAA6B;EAC7B,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,aAAa;EACb,YAAY;AACd;;AAEA;EACE,gBAAgB;EAChB,eAAe;EACf,iBAAiB;EACjB,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,aAAa;EACb,iBAAiB;EACjB,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,eAAe;EACf,aAAa;EACb,iBAAiB;EACjB,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,iBAAiB;EACjB,aAAa;AACf;;AAEA;EACE,0BAA0B;EAC1B,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,YAAY;EACZ,aAAa;EACb,yBAAyB;EACzB,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,YAAY;AACd;;AAEA,uBAAuB;;;AAGvB;EACE,UAAU;EACV,YAAY;CACb,eAAe;CACf,uBAAuB;EACtB,UAAU;EACV,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,mBAAmB;EACnB,uBAAuB;EACvB,qBAAqB;AACvB;;;AAGA;EACE,gCAAgC;EAChC,iBAAiB;EACjB,kBAAkB;EAClB,yBAAyB;EACzB,8BAA8B;EAC9B,yBAAyB;EACzB,eAAe;AACjB;;AAEA;EACE,QAAQ;EACR,SAAS;EACT,oCAAoC;EACpC,qCAAqC;EACrC,4BAA4B;EAC5B,WAAW;EACX,kBAAkB;EAClB,YAAY;AACd;;AAEA;EACE,gCAAgC;EAChC,kBAAkB;EAClB,8BAA8B;EAC9B,gBAAgB;EAChB,kBAAkB;EAClB,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,iBAAiB;EACjB,iBAAiB;AACnB;;AAEA;EACE,eAAe;EACf,aAAa;EACb,qBAAqB;EACrB,mBAAmB;EACnB,aAAa;EACb,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,sBAAsB;EACtB,kBAAkB;EAClB,WAAW;EACX,mBAAmB;EACnB,YAAY;EACZ,yBAAyB;EACzB,sCAAsC;EACtC,cAAc;EACd,SAAS;EACT,gCAAgC;EAChC,eAAe;EACf,aAAa;AACf;;;AAGA;EACE,aAAa;AACf","sourcesContent":["/* palette */\n/* light cyan CDEEF4 */\n/* Off red #FA0000 */\n/* mexican pink #E31C79 */\n/* oxford blue #03012C */\n/* byzantine blue #2F52E0 47, 82, 224*/\n/* misty rose #FFE3E3 */\n\n* {\n  font-family:'Raleway';\n  margin: 0px;\n}\n\nbody {\n  background: #CDEEF4;\n  background-repeat: no-repeat;\n  background-size: cover;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n}\n\nmain {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  flex-direction: row;\n}\n\nnav {\n  height: 18vh;\n  width: 100vw;\n  background-color: rgb(3,1,44, .75);\n  margin: 0px;\n  display: flex;\n  flex-flow: column wrap;\n  align-content: flex-end;\n  justify-content: center;\n  border-bottom: 2mm ridge rgba(47, 82, 224, .6);\n}\n\n.name{\n  padding-right: 15px;\n}\n\n.userName {\n padding-right: 15px;\n}\n\n.logo {\n  color: white;\n\tfont-size: 60pt;\n\tfont-family: sans-serif;\n  z-index: 1;\n  position: absolute;\n  -webkit-text-stroke: 2px #E21F03;\n  position: absolute;\n  text-shadow: 5px 6px 12px #E31C79;\n  margin: 25px;\n  font-kerning: none;\n}\n\n.managerView {\n  display: flex;\n}\n\n.hotelInfo {\n  width: 25vw;\n  height: 50vh;\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: #03012C;\n  opacity: 75%;\n  margin: 50px;\n  border-radius: 15px;\n  position: relative;\n  z-index: 1;\n}\n\n.customer-info {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n\n.userBookingsSect{\n  width: 500px;\n  height: 70vh;\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: row;\n  justify-content: center;\n  background-color: #03012C;\n  opacity: 75%;\n  overflow-y: scroll;\n  margin: 50px;\n  border-radius: 15px;\n  z-index: 1;\n }\n\n .form-wrapper {\n  display: flex;\n  flex-flow: column wrap; \n  align-items: center;\n }\n\n form{\n  display: flex;\n  flex-flow: column wrap;\n }\n\n.dashboard {\n  width: 200px;\n  height: 100px;\n  background: white;\n  margin: 25px;\n  border-radius: 15px;\n  display: flex;\n  justify-content: center;\n}\n\n.dashboard-wrapper {\n  height: 100vh;\n}\n\n.current-bookings,\n.available-bookings {\n  display: flex;\n  justify-content: space-evenly;\n  flex-direction: column;\n  align-items: center;\n  width: 350px;\n}\n\n.available-bookings {\n  height: 200px;\n  width: 300px;\n}\n\nh2 {\n  margin-top: 10px;\n  font-size: 24pt;\n  color: whitesmoke;\n  display: flex;\n  flex-direction: row;\n}\n\nh3 {\n  font-size: 18pt;\n  display: flex;\n  color: whitesmoke;\n  padding: 10px;\n  flex-direction: column;\n}\n\nh4 {\n  font-size: 15pt;\n  display: flex;\n  color: whitesmoke;\n  padding: 10px;\n  flex-direction: column;\n}\n\n.label {\n  color: whitesmoke;\n  padding: 10px;\n}\n\n.room-type{\n  text-transform: capitalize;\n  color: #03012C;\n}\n\n.balance {\n  color: #2F52E0;\n  margin: 50px;\n  padding: 25px;\n  background-color: #03012C;\n  width: 300px;\n  border-radius: 15px;\n}\n\n.apology{\n  color: whitesmoke;\n  margin: 25px;\n}\n\n/* LOGIN PAGE STYLING */\n\n\nh1 {\n  color: red;\n  color: white;\n\tfont-size: 47px;\n\tfont-family: sans-serif;\n  z-index: 1;\n  position: absolute;\n}\n\n.login-page{\n  display:flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: baseline;\n}\n\n\n.motel {\n  -webkit-text-stroke: 3px #E21F03;\n  margin-top: 125px;\n  margin-left: 100px;\n  writing-mode: vertical-rl;\n  text-shadow: 0px 8px 12px blue;\n  text-orientation: upright;\n  font-size: 60pt;\n}\n\n.shape {\n  width: 0; \n  height: 0; \n  border-left: 100px solid transparent;\n  border-right: 100px solid transparent;\n  border-top: 500px solid #f00;\n  z-index: -5;\n  position: relative;\n  opacity: 75%;\n}\n\n.overlook {\n  -webkit-text-stroke: 2px #E21F03;\n  position: absolute;\n  text-shadow: 0px 4px 8px white;\n  margin-top: 50px;\n  margin-left: 100px;\n  font-size: 40pt;\n  font-kerning: none;\n}\n\n.oval {\n  width: 500px;\n  height: 200px;\n  border-radius: 50%;\n  background: darkblue;\n}\n\n.outside {\n  margin-top: 100px;\n  margin-left:100px;\n}\n\n.error {\n  position: fixed;\n  display: flex;\n  justify-items: center;\n  align-items: center;\n  height: 100vh;\n  width: 100vw;\n  z-index: 1000;\n}\n\n.modal {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  position: absolute;\n  width: 20vw;\n  border-radius: 15px;\n  height: 20vh;\n  background-color: #f1f1f1;\n  /* transform: translate(-50%, -50%); */\n  /* top: 10%; */\n  left: 40%;\n  box-shadow: 0px 0px 10px #03012C;\n  font-size: 15pt;\n  z-index: 1000;\n}\n\n\n.hidden{\n  display: none;\n}\n\n\n\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/motel-carpet.png");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "apiCalls": () => (/* binding */ apiCalls),
/* harmony export */   "postNewBooking": () => (/* binding */ postNewBooking),
/* harmony export */   "deleteBooking": () => (/* binding */ deleteBooking)
/* harmony export */ });
/* harmony import */ var _classes_Booking__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


let apiCalls;

const bookingsData = fetch("https://overlook-api-jfogiato.vercel.app/api/v1/bookings")
    .then(response => response.json())
    .catch(err => console.log(err));

const roomsData = fetch("https://overlook-api-jfogiato.vercel.app/api/v1/rooms")
    .then(response => response.json())
    .catch(err => console.log(err));

const customersData = fetch("https://overlook-api-jfogiato.vercel.app/api/v1/customers")
    .then(response => response.json())
    .catch(err => console.log(err));

const testCustomer = fetch("https://overlook-api-jfogiato.vercel.app/api/v1/customers/6")
    .then(response => response.json())
    .catch(err => console.log(err));

apiCalls = [bookingsData, roomsData, customersData, testCustomer];

function postNewBooking(booking, event, currentUser, room, convertedDate){
    return fetch('https://overlook-api-jfogiato.vercel.app/api/v1/bookings', {
        method: 'POST',
        body: JSON.stringify({ "userID": booking.userID, "date": booking.date, "roomNumber": booking.roomNumber }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        if(data.message.includes('successfully')){
            let newBooking = new _classes_Booking__WEBPACK_IMPORTED_MODULE_0__.default(data.newBooking.userID, convertedDate, room, data.newBooking.id);
            _scripts__WEBPACK_IMPORTED_MODULE_1__.overlookMotel.bookings.push(newBooking);
            (0,_scripts__WEBPACK_IMPORTED_MODULE_1__.hide)(event.target.parentNode);
            currentUser.bookings.unshift(newBooking);

            _scripts__WEBPACK_IMPORTED_MODULE_1__.overlookMotel.managerMode ? (0,_scripts__WEBPACK_IMPORTED_MODULE_1__.displayUserSearchInfo)(currentUser) : (0,_scripts__WEBPACK_IMPORTED_MODULE_1__.displayUserInfo)(currentUser)

            _scripts__WEBPACK_IMPORTED_MODULE_1__.serverMessage.innerText = "Booking successfully made"
            setTimeout(() => {
            _scripts__WEBPACK_IMPORTED_MODULE_1__.serverMessage.innerText = ''
            }, 1500)

        } else {
            throw new Error('An unexpected problem has occurred')
        }
        return data;
    })
    .catch(err => alert(`Server Error: ${err}. Please try again later.`))
}

function deleteBooking(bookingID, currentUser) {
    fetch(`https://overlook-api-jfogiato.vercel.app/api/v1/bookings/${bookingID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.message.includes('deleted')){
            let ghostIndex;
            currentUser.bookings.find((booking, index )=> {
                if(booking.id === bookingID){
                    ghostIndex = index;
                }
                return booking.id === bookingID;
            })

            currentUser.bookings.splice(ghostIndex, 1)
            _scripts__WEBPACK_IMPORTED_MODULE_1__.serverMessage.innerText = "Booking successfully deleted";
            setTimeout(() => {
                _scripts__WEBPACK_IMPORTED_MODULE_1__.serverMessage.innerText = '';
            }, 1500);

            (0,_scripts__WEBPACK_IMPORTED_MODULE_1__.displayUserSearchInfo)(currentUser);

        } else if(data.message.includes(bookingID)){
            throw new Error('Booking has already been deleted, please refresh for most up to date information');
        } else {
            throw new Error('An unexpected problem has occurred');
        }
        return data;
    })
    .catch(err => alert(`Server Error: ${err}. Please try again later.`))
}





/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Booking {
  constructor(userID, date, room, id) {
    this.id = id || null;
	this.userID = userID;
	this.date = date;
	this.roomNumber = room.number;
	this.costPerNight = room.costPerNight;
  }
    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Booking);

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Booking__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _Room__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);



class Customer {
	constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings = [];
  }

  createBookingArray(bookingsData, roomsData) {
    const userBookings = bookingsData.filter(booking => booking.userID === this.id);
    userBookings.forEach(booking => {
      let room = roomsData.find(room => room.number === booking.roomNumber);
      const convertedRoom = new _Room__WEBPACK_IMPORTED_MODULE_1__.default(room);
      let newBooking = new _Booking__WEBPACK_IMPORTED_MODULE_0__.default(booking.userID, booking.date, convertedRoom, booking.id);
      this.bookings.push(newBooking);
    });
  }

  bookRoom(room, date) {
    let newBooking = new _Booking__WEBPACK_IMPORTED_MODULE_0__.default(this.id, date, room);
    this.bookings.unshift(newBooking);
  }

	calculateTotalSpent() {
    return this.bookings.reduce((acc, booking) => {
      return acc += booking.costPerNight
    }, 0).toFixed(2)
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Customer);

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Room {
  constructor(room) {
		this.number = room.number;
		this.type = room.roomType;
		this.bidet = room.bidet;
		this.bedSize = room.bedSize;
		this.numBeds = room.numBeds;
		this.costPerNight = room.costPerNight;
  }

	
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Room);

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Room__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _Booking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _Customer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);




class Hotel {
  constructor() {
		this.rooms = [];
		this.bookings = [];
		this.customers =[];
		this.managerMode = false;
  }

	parseHotelData(roomsData, bookingsData, customerData) {
		this.rooms = roomsData.map(room => new _Room__WEBPACK_IMPORTED_MODULE_0__.default(room));
		this.bookings = bookingsData.map(booking => {
			const roomMatch = this.rooms.find(room => room.number === booking.roomNumber);
			return new _Booking__WEBPACK_IMPORTED_MODULE_1__.default(booking.userID, booking.date, roomMatch, booking.id);
		});

		this.customers = customerData.map(user => {
			const customer = new _Customer__WEBPACK_IMPORTED_MODULE_2__.default(user);
			customer.createBookingArray(bookingsData, roomsData);
			return customer;
		});
	};

	filterForAvailableRooms(date, roomType) {
		const roomsBooked = this.bookings.filter(booking => booking.date === date).map(booking => booking.roomNumber);
		
		const availableRooms = this.rooms.reduce((acc, room) => {
			if(!roomsBooked.find(num => num === room.number)){
				acc.push(room);
			}
			return acc;
		}, []);

		if(roomType) {
			return availableRooms.filter(room => room.type === roomType)
		} else {
			return availableRooms
		}

	};

	getRevenueToday(){
		const date = new Date().toJSON().slice(0, 10).split('-').join('/');
		const roomsBooked = this.bookings.filter(booking => booking.date === date).reduce((acc, booking) => {
			return acc += booking.costPerNight
		}, 0)

		return roomsBooked.toFixed(2);
	}

	getPercentageOccupied() {
		const date = new Date().toJSON().slice(0, 10).split('-').join('/');
		const roomsBooked = this.bookings.filter(booking => booking.date === date);
		return ((roomsBooked.length/this.rooms.length) * 100).toFixed(2)
	};

	searchUserByName(searchTerm) {
		return this.customers.find(customer => customer.name === searchTerm)
	}
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hotel);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map