//Dependencies
const morgan = require('morgan');
const express = require('express');
const app = express();

//Routers
const user = require('./routes/user');
const empleado = require('./routes/empleado');

//Middleweare
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');

///////////////////////////////////

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

///////////////////////////////////

app.get("/", index);
app.use("/user", user);
app.use(auth);
app.use("/empleados", empleado);
app.use(notFound);

///////////////////////////////////

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});

