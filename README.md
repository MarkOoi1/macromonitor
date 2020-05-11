# (MM) Macro Monitor

MERNG w/ Redux and Material UI
Designed to deploy on Heroku. You can use any cloud MongoDB service, just update the connection string.

Technology Goals:

- Data sourcing via Twitter on real-time news breaks
- Data sourcing for economic data releases
- IG Markets API for a live data feed on selected markets
- IG Markets API for automated trade execution
- React client with Redux for state management
- Material UI for presentation
- NodeJS / Mongo for backend functionality
- User auth using JWT, Google OATH
- Server / Client comms via GraphQL and REST APIs
- Connection to the Theme library

### Version: 0.0.1

### Usage

```sh
$ npm install
```

```sh

# Development: Run with Nodemon
$ npm run dev

# Visit http://localhost:3000
```

### MongoDB

Set the following ENV VARS using dotenv. (/.env)

```sh
IG_API_KEY
IG_IDENTIFIER
IG_PASSWORD
IG_DEMO
DB_USER
DB_PASS
JWTSecret
```

Run ./scripts/init.js to pre-populate the DB.
