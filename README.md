# Overlook
## Abstract
Overlook is a hotel booking site built from scratch in about 7 days using object oriented programming to drive the design and implementation of vanilla javascript, HTML, and CSS. A goal was to utilize TDD with a robust suite of unit tests in tandem with implementation code using the Mocha framework and Chai test library. Another goal was to work with an API to send and recieve data. This project implements GET, POST, and DELETE requests.

## See the Functionality in Action
![a gif of the login page](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWJmNTMwZDBkZTA0NzhlNjFhNjFjY2FhZmJmNmFjOTcyMGQ2YzBhMyZjdD1n/Ij5iYqgg9dAWVS1xVI/giphy.gif)

![a gif of the customer page](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDIwZmRmZjk3ZWM0MDQ4YmEwYjJiMDViOWU2YWJiNzQyODE0ODBhYSZjdD1n/xv428ePQY2xrR70i41/giphy.gif)

![a gif of the manager page](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjA5ZDZiYjYyZjdhOTkwMWEyZDA2MTY5YzQ4ZGRkYzNmZmY0YzVjNCZjdD1n/O8KebHFGJvxfG5F3OE/giphy.gif)


## How to View The Code in Action

1. Fork and clone this repo, and [this backend API repo](https://github.com/turingschool-examples/overlook-api).

2. For both repos: install the library dependencies in separate tabs by
running `npm install` on the command line. 

3. Don't worry about any vulnerabilities it might want to fix. 

4. To start In the terminal, for BOTH APIs run:

```bash
npm start
```

You will see a bunch of lines output to your terminal. In the first repo's tab, one of those lines will be something like:

```bash
Project is running at http://localhost:8080/
```

5. Go to `http://localhost:8080/` in your browser to view the code running in the browser.

## contributors: 
Chrissy Cooper [GitHub](https://github.com/chrissycooper) | | [LinkedIn](https://www.linkedin.com/in/christine-cooper-691196144/)

## Wins and Challenges

The biggest challenge for this project was the time frame and breadth of what we needed to build in that short period. On top of that, the spec was quite open ended with no design comp to follow and a lot of space to build the implementation structure however I wanted. Though it was a little overwhelming at first to begin, I grew to really enjoy the challenge and freedom that came with this project. 

I built the design around classic kitschy motels that you find at the side of the road on a cross country trip or sprinkled around the streets of Chicago where I am from. I love the classic neon signs, the distinct hotel carpets, and design details in these places. Form always meets function in a definite way. 

Error handling was an area of growth for me in Overlook, especially in dealing with fetch calls and promises. I didn't want to have to submit lots of GET requests for such a simple website. I am proud of my solution, I utilized timing to update the data only when we know the network requests were successful. Refer to the apiCalls.js file above to see it, and any feedback or comments of any kind are welcomed!


Thank you for taking a look at my work! 

