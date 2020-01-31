[![Build Status](https://img.shields.io/travis/madhums/node-express-mongoose/master.svg?style=flat)](https://travis-ci.org/madhums/node-express-mongoose)
[![Dependencies](https://img.shields.io/david/madhums/node-express-mongoose.svg?style=flat)](https://david-dm.org/madhums/node-express-mongoose)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/madhums/node-express-mongoose)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/madhums/node-express-mongoose?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## MERCHANT NOTIFICATION REVERSE API (JAVASCRIPT SAMPLE CODE)

A boilerplate application that shows how a merchant can integrate Paga's Merchant Web Service Platform to process automated real-time payment transactions using secure RESTFul web service.

## Usage

    git clone https://gitlab.com/nnamdi88/paga-notification-reverse-api.git
    cd paga-notification-reverse-API
    npm install or yarn install
    cp .env.example .env
    npm start
    
    NB: .env.example file contains parameters that must be specified in your .env file


## Application Structure

- `server.js` - The entry point to the application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions, the service(logic),  the controller and the routes for each resource or Mongoose models.


## License

MIT
