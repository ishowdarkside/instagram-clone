const path = require("path");
const app = require(path.join(__dirname, "app.js"));
const mongoose = require("mongoose");

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

// Attach an unhandled promise rejection handler
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Promise Rejection:", reason);
});

const DB = process.env.MONGODB_LINK.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
);
mongoose
  .connect(DB)
  .then(() => {
    console.log(`Successfully connected to database`);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
