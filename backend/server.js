const path = require("path");
const app = require(path.join(__dirname, "app.js"));
const mongoose = require("mongoose");

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
