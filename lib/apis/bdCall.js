export function getTareasAll(data) {
    let result = new Promise((resolve, reject) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://restserver-todolist.herokuapp.com/api/tareasAll", requestOptions)
            .then(response => response.text())
            .then(result => {

                resolve(JSON.parse(result));
            })
            .catch(error => console.log('error', error));
    })

    return result;
}

export function getTareasByUser(data) {
    let result = new Promise((resolve, reject) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://restserver-todolist.herokuapp.com/api/tareasGetUser/${data}`, requestOptions)
            .then(response => response.text())
            .then(result => {

                resolve(JSON.parse(result));
            })
            .catch(error => console.log('error', error));
    })

    return result;
}

export function getUsersAll() {
    let result = new Promise((resolve, reject) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        fetch("https://restserver-todolist.herokuapp.com/api/usuarioGet/?desde=0&?limite=100", requestOptions)
            .then(response => response.text())
            .then(result => {
                let resultado;
                let dataUser = [];


                resultado = JSON.parse(result);
                console.log('resultado', resultado)

                resultado.usuarios.forEach(element => {
                   
                     dataUser.push(element); 
                });
                resolve(dataUser);


            })
            .catch(error => console.log('error', error));
    })

    return result;
}