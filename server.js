const express = require("express");
const app = express();
const cors = require('cors');
const morgan =require('morgan');

var connectDB = require('./database/db');
const authRoutes = require('./routes/auth');

//middleware

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use(require("./routes/soc.js"))
app.use(require("./routes/ownerRegister"))
app.use(require("./routes/getData"))
app.use(require("./routes/addcommdata"))
app.use(require('./routes/getcommdata'))
app.use(require("./routes/invoicedata"))
app.use(require("./routes/paydata"))


connectDB();






const port= process.env.PORT || 5000;

app.listen(port , () => console.log(`listening on port ${port}`));