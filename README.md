
## MERCHANT NOTIFICATION REVERSE API (JAVASCRIPT SAMPLE CODE)

A boilerplate application that shows how a merchant can integrate Paga's Merchant Web Service Platform to process automated real-time payment transactions using secure RESTFul web service.

## Usage

    git clone https://github.com/pagadevcomm/merchant-payment-notification-javascript
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
