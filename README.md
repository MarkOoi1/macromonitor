# (MM) Macro Monitor

This is a financial markets dashboard using Node.JS, Express, MongoDB and EJS for the template engine.

Functionality:
* Session-based authentication with Passport
* Custom built Twitter profile scraper using node-cron to collect the latest news
* IG Markets API for a live data feed, trade execution
* Express-ejs for the template engine
* NodeJS for backend functionality that can serve multiple frontends (Reach, ejs)


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