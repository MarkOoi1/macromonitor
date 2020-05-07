# (MM) Macro Monitor

This is a financial markets dashboard using Node.JS, Express, React and MongoDB.

Functionality Objectives: (\* denotes in progress)

- Custom built Twitter profile scraper using node-cron to collect the latest news
- IG Markets API for a live data feed
- IG Markets API for automated trade execution\*
- React client with Redux for state management
- NodeJS / Mongo for backend functionality
- User auth using JWT
- Server / Client comms via GraphQL and REST APIs

### Version: 0.0.1

### Usage

```sh
$ npm install
```

```sh
$ npm start
# Or run with Nodemon
$ npm run dev

# Visit http://localhost:5000
```

### MongoDB

Open "config/keys.js" and add your MongoDB URI, local or Atlas
Run ./scripts/init.js to pre-populate the DB.
