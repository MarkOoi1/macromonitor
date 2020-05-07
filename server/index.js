const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

require("dotenv").config();

const app = express();
const cors = require("cors");

app.use(express.json());

// Enable CORS for localhost:3000
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

// DB Config

const startDBServer = async () => {
  const db = config.get("mongoURI");
  // Connect to Mongo
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

startDBServer().then((res) => {
  console.log(`MongoDB connected for ${__filename}...`);
});

// Use Routes
app.use("/api/twitterscraper", require("./routes/api/twitterscraper"));

// Routes: for client
app.use("/api/region", require("./routes/api/region"));
app.use("/api/markets", require("./routes/api/markets"));
app.use("/api/events", require("./routes/api/events"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/theme", require("./routes/api/theme"));

// GraphQL API
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

if (process.env.NODE_ENV === "production") {
  console.log(process.env.NODE_ENV);

  // Cronjobs
  let cron = require("./scripts/cron.js").twitter(HOST, PORT);

  app.use(express.static(path.join(__dirname, "clients/materialui/build")));
  app.get("/", (req, res) => {
    res.sendfile(
      path.join((__dirname = "clients/materialui/build/index.html"))
    );
  });
} else {
  // Static files
  console.log("Not in prod.");
  app.use("/", require("./routes/index"));
  app.use(express.static("/public"));
}

// IG Markets price feed
require("./custom_modules/node-ig-api-interface");

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
