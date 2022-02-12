//login fetch

export function login(form) {

    let result = new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(form);

        console.log('raw', raw);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            session: raw,
            redirect: 'follow'
        };

        let resultado;
        let dataUser;
        fetch("https://restserver-todolist.herokuapp.com/api/auth/login", requestOptions)
            .then(response => response.text())
            .then(result => {
                resultado = JSON.parse(result);

                if (!resultado.msg) {
                    console.log('resultado', resultado);
                    let { id, name, surname, email, role } = resultado.usuario;

                    dataUser = {
                        id,
                        name,
                        surname,
                        email,
                        role
                    };

                     /* sessionStorage.user = dataUser; */



                    resolve(dataUser);
                } else {
                    alert(resultado.msg);
                }

            })
            .catch(error => console.log('error', error));
    });

    return result;
}


// LOGOUT 
export function logout() {
    let result = sessionStorage.user;
    console.log('entro a la cookie')
    var cookies = document.cookie.split(";");

    /*for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }*/
    
    document.cookie = 'user' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    sessionStorage.removeItem('user');

    return result;
}