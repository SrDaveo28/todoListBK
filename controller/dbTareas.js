const Tarea = require('../model/tarea.js');

exports.tareaPost = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Tarea
    const tarea = new Tarea({
        ticket: req.body.ticket,
        referencia: req.body.referencia,
        tarea: req.body.tarea,
        prioridad: req.body.prioridad,
        fecha: req.body.fecha,
        acciones: req.body.acciones
    });

    // Save Tarea in the database
    await tarea.save();

    res.json({
        mensaje: 'Tarea guardada',
        tarea
    });


};

//Aqui lo que hacemos es cambiar el estado de la tarea a true o false

exports.tareaPutDelete = async (req, res, next) => {

    const { id, estado } = req.body;

    console.log(`el id: ${id} el estado  ${estado}`);

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {

        if (typeof estado !== 'boolean') {
            res.status(400).send({
                message: "Estado no es True o False!"
            });

        } else {

            Tarea.updateOne({ "ticket.id": id }, { $set: { "ticket.estado": estado } }, function (err, tarea) {
                if (err) return next(err)
                res.send({ 'message': 'UPDATED' })
            })
        }

    }

};


//Aqui lo que hacemos es un Update de la tarea a true o false

exports.tareaPut = async (req, res, next) => {

    let id = req.body.ticket.id;

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Tarea.updateOne({ "ticket.id": id }, { $set: req.body }, function (err, tarea) {
        if (err) return next(err)
        res.send({ 'message': 'UPDATED' })
    })

};

exports.tareaPutActions = async (req, res, next) => {
    let id = req.params.id;
    let body = req.body;


    let update = {
        $set: {
            acciones: body.acciones
        }
    }

    Tarea.updateOne({ "ticket.id": id }, update, function (err, tarea) {
        if (err) {
            res.send(err);
        } else {
            res.json(tarea);
        }
    });

}

exports.getTareaById = (req, res) => {

    let id = req.params.id;

    Tarea.find({ "ticket.id": id }).exec((err, tarea) => {

        if (err) {
            return res.status(500).send({ message: 'Error al devolver los datos' });
        }

        if (!tarea) {
            return res.status(404).send({ message: 'No hay tarea que mostrar' });
        }
        return res.status(200).send(tarea);
    })

}

exports.tareasAll = function (req, res) {
    Tarea.find({}, function (err, tarea) {
        if (err) return next(err)
        res.send(tarea)
    })
};

exports.getTareaByUser = async (req, res) => {

    let user = req.params.user;

    const numTareas = await Tarea.countDocuments({ "ticket.asignado_user": user });

    Tarea.find({ "ticket.asignado_user": user }).exec((err, tareas) => {

        if (err) {
            return res.status(500).send({ message: 'Error al devolver los datos' });
        }

        if (!tareas) {
            return res.status(404).send({ message: 'No hay tarea que mostrar' });
        }



        return res.status(200).send({ total: numTareas, tareas });
    })

}
exports.getTareaFin = async (req, res) => {

    let estado = "asignado";

    const allTareas = await Tarea.countDocuments({ "": user });

    Tarea.find({ "ticket.asignado_user": user }).exec((err, tareas) => {

        if (err) {
            return res.status(500).send({ message: 'Error al devolver los datos' });
        }

        if (!tareas) {
            return res.status(404).send({ message: 'No hay tarea que mostrar' });
        }



        return res.status(200).send({ total: numTareas, tareas });
    })

}
