const express = require('express');
const empleado = express.Router();
const db = require('../config/database');

empleado.post("/",  async (req, res, next)=>{
    const {nombre, apellidos, telefono, email, direccion} = req.body;

    if (nombre && apellidos && telefono && email && direccion) {
        try {
            const query = "INSERT INTO employees (nombre, apellidos, telefono, email, direccion) VALUES (?, ?, ?, ?, ?)";
            const rows = await db.query(query, [nombre, apellidos, telefono, email, direccion]);

            if (rows.affectedRows == 1) {
                return res.status(201).json({ code: 201, message: "Empleado insertado correctamente" });
            }
            return res.status(500).json({ code: 500, message: "Ocurrió un error al insertar el empleado" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ code: 500, message: "Ocurrió un error en el servidor" });
        }
    }
    return res.status(400).json({ code: 400, message: "Campos incompletos" });
});


empleado.delete("/:id([0-9]{1,3})", async (req, res , next) => {
    const query = `DELETE FROM employees WHERE idEmpleado=${req.params.id}`;
    const rows = await db.query(query);
    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Empleado borrado correctamente"});
    }
    return res.status(404).json({code: 404, message:"Empleado no encontrado"})

});

empleado.put("/:id([0-9]{1,3})", async (req, res , next) => {
    const {nombre, apellidos, telefono, email, direccion} = req.body;

    if(nombre && apellidos && telefono && email && direccion)
        {
            let query = `UPDATE employees SET nombre='${nombre}', apellidos='${apellidos}',`;
            query += `telefono='${telefono}', email= '${email}', direccion= '${direccion}' WHERE idEmpleado=${req.params.id}`;

            const rows = await db.query(query);
            if(rows.affectedRows == 1)
            {
                return res.status(200).json({code: 200, message:"Empleados actualizado correctamente"});
            }
    
            return res.status(500).json({code: 500, message:"Ocurrió un error"});
        }
        return res.status(500).json({code: 500 ,message:"Campos incompletos"});
});


empleado.get("/", async (req, res, next) => {
    const emp = await db.query("SELECT * FROM employees");
    return res.status(200).json({code: 200, message: emp});
});


empleado.get('/:name([A-Za-z]+)', async (req, res, next)=>{
    const name = req.params.name;
    const emp = await db.query("SELECT * FROM employees WHERE nombre='"+name+"' ; ");
    if(emp.length > 0){
        return res.status(200).json({code: 200, message: emp});
    }
    return res.status(404).send({code: 404, message:"Empleado no encontrado"});

});
module.exports = empleado;