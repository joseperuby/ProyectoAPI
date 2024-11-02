const morgan = require('morgan');
const express = require('express');
const app = express();
const user = require('./routes/user');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res, next) => {
    res.status(200).json({code: 1, message: "Bienvenido al sistema de Recursos Humanos"});
})

app.use("/empleados", empleados);
app.use("/user", user);

app.use((req, res, next) => {
    return res.status(404).json({code: 404, message: "URL no encontrada"});
})

/*app.get("/:name", (req, res, next) => {
    req.params.name;
    res.status(200);
    res.send("Pagina nombre");
})*/

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});

