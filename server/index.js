require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./api/resolvers");
const typeDefs = require("./api/typeDefs");

const app = express();
const cors = require("cors");

const config = require("../config/keys");

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
  const db = config.mongoURI;
  // Connect to Mongo
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

startDBServer()
  .then((res) => {
    console.log(`MongoDB connected for ${__filename}...`);
  })
  .catch((err) => console.log(err));

// GraphQL API
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

// Use Routes
app.use("/api/twitterscraper", require("./routes/api/twitterscraper"));

// Routes: for client
app.use("/api/region", require("./routes/api/region"));
app.use("/api/markets", require("./routes/api/markets"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/theme", require("./routes/api/theme"));

if (process.env.NODE_ENV === "production") {
  console.log(process.env.NODE_ENV);

  // Cronjobs
  let cron = require("./scripts/cron.js").twitter(HOST, PORT);
  // IG Markets price feed
  require("./custom_modules/node-ig-api-interface");
}

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "public", "index.html"));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
