const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* STATIC FOLDER */

app.use("/uploads",
express.static("uploads"));

/* ROUTES */

app.use("/api/auth",
require("./routes/authRoutes"));

app.use("/api/songs",
require("./routes/songRoutes"));

/* DATABASE */

mongoose.connect(process.env.MONGO_URI)
.then(()=>{

  console.log("MongoDB Connected");

  app.listen(5000,()=>{

    console.log("Server Running");

  });

})
.catch((err)=>{

  console.log(err);

});