export function updateTarea(data) {
    let result = new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        console.log("mi data antes de guardar el tema", data);
        var raw = JSON.stringify({
            "ticket": {
                "id": data.ticket.id,
                "asignado_user": data.ticket.asignado_user,
                "asignado_por": data.ticket.asignado_por,
                "estado": data.ticket.estado
            },
            "tarea": data.tarea,
            "prioridad": data.prioridad,
            "fecha": data.fecha,
            "acciones": data.acciones
        });



        console.log('lo que mando a mi api', JSON.parse(raw));
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://restserver-todolist.herokuapp.com/api/tarea/${data.ticket.id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                resolve(result);
                console.log(result);
            })
            .catch(error => console.log('error', error));

    });

    return result;
}

export function updateUser(data) {
    let result = new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "_id": data.uid,
            "name": data.name,
            "surname": data.surname,
            "email": data.email,
            "password": data.password,
            "role": data.role,
            "img": "",
            "google": false,
            "estado": data.estado,
            "coneccion": {
                "connection_status": false,
                "room": "123",
                "socket_id": "123456"
            }
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://restserver-todolist.herokuapp.com/api/usuarioPut/${data.uid}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                resolve(result);
            })
            .catch(error => console.log('error', error));

    });

    return result;
} 