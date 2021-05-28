const mongoose = require("mongoose");

const app = require("./app");

const port = 3000;

mongoose
  .connect("mongodb://localhost:27017/backend-api", {
    useNewUrlParser: true, // OPTION FLAGS
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`SERVER CONNECTED ON ${port}`);
      console.log("MONGO-DB CONNECTED");
    });
  })
  .catch((e) => {
    console.log(e);
  });
