app.post("/empleados", (req, res, next) => {
    return res.status(200).send(req.body);
});

app.get('empleados', (req, res, next) => {
    return res.status(200).send(empleados);
});

app.get('/empleados/:id([0-9]{1,3})', (req, res, next) => {
    const id = req.params.id -1;
    if(id >= 0 && id <= 10){
        return res.status(200).send(empleados[req.params.id - 1]);
    }
    return res.status(404).send("Empleado no encontrado.")
});

app.get('/empleados/:name([A-Za-z]+)', (req, res, next) => {
    const name = req.params.name;

    const emp = empleados.filter((em) => {
        return (em.name.toUpperCase() == name.toUpperCase()) && em;
    });

    if (emp.length > 0){
        return res.status(200).send(em);
    }
    return res.status(404).send("Empleado no encontrado");
});