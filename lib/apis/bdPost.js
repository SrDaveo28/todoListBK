export function postTareas(data) {
    let result = new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "ticket": {
                "id": data.id,
                "asignado_user": data.asignado_user,
                "asignado_por": data.asignado_por,
                "estado": data.estado,
            },
            "tarea": data.tarea,
            "prioridad": data.prioridad,
            "fecha": data.fecha,
            "referencia": data.referencia,
            "acciones": data.acciones
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://restserver-todolist.herokuapp.com/api/tarea", requestOptions)
            .then(response => response.text())
            .then(result => {
                resolve(result);
                console.log(result);
            })
            .catch(error => console.log('error', error));
    });

    return result;
}

export function postUsers(data) {
    let result = new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": data.id,
            "name": data.name,
            "surname": data.surname,
            "email": data.email,
            "password": data.password,
            "role": data.role,
            "img": "",
            "google": false,
            "estado": true,
            "coneccion": {
                "connection_status": false,
                "room": "",
                "socket_id": ""
            }
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://restserver-todolist.herokuapp.com/api/usuarioPost", requestOptions)
            .then(response => response.text())
            .then(result => {
                resolve(result);
            })
            .catch(error => console.log('error', error));
    });

    return result;
}


