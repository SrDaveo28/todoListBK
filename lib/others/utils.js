/* import { NumeroALetras } from "./numeroLetra.js"; */
// render graphics
export function render(obj, Login = false) {
    // create content object
    let content = document.getElementById('content');
    // clear content
    content.innerHTML = ``;
    // render all childs
    Object.values(obj).forEach(item => {
        content.innerHTML += item;
    });
    // add listeners
    if (!Login) {
        addNavbarFunc();
    }
}

export function random_rgba() {
    let o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.5 + ')';
}

export function copyToClipboard(text, obj = null) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    if (obj !== null) {
        document.getElementById(obj).appendChild(dummy);
    } else {
        document.body.appendChild(dummy);
    }

    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    if (obj !== null) {
        document.getElementById(obj).removeChild(dummy);
    } else {
        document.body.removeChild(dummy);
    }
}

export function numberWithPoints(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function removePoints(n) {
    let string = n.split('.').join("");
    return Number(string);
}

export function isOdd(n) {
    return Math.abs(n % 2) == 1;
}

// dispatch events to main.js
export function addNavbarFunc() {

    /* nueva tarea */
    document.querySelector('#btnNewTask').onclick = event => {
        let customEvent = new CustomEvent('ready', { detail: 'newTask' });
        document.dispatchEvent(customEvent);
    }
    document.querySelector('#btnNewTaskM').onclick = event => {
        let customEvent = new CustomEvent('ready', { detail: 'newTask' });
        document.dispatchEvent(customEvent);
    }


    /* mis tareas */
    document.querySelector('#btnTask').onclick = event => {
        let customEvent = new CustomEvent('ready', { detail: 'tasks' });
        document.dispatchEvent(customEvent);
    }
    document.querySelector('#btnTaskM').onclick = event => {
        let customEvent = new CustomEvent('ready', { detail: 'tasks' });
        document.dispatchEvent(customEvent);
    }

    /* tareas asignadas */
    document.querySelector('#btnAsigTaskM').onclick = event => {
        let customEvent = new CustomEvent('ready', { detail: 'tareasAsignadas' });
        document.dispatchEvent(customEvent);
    }
    document.querySelector('#btnAsigTask').onclick = event => {
        let customEvent = new CustomEvent('ready', { detail: 'tareasAsignadas' });
        document.dispatchEvent(customEvent);
    }
    /* usuarios */
    document.querySelector('#btnUsersM').onclick = event => {
        let customEvent = new CustomEvent('ready', { detail: 'users' });
        document.dispatchEvent(customEvent);
    }
    document.querySelector('#btnUsers').onclick = event => {
        let customEvent = new CustomEvent('ready', { detail: 'users' });
        document.dispatchEvent(customEvent);
    }

    /* logout */
    document.querySelector('#logout').onclick = event => {
        let customEvent = new CustomEvent('ready', { detail: 'logout' });
        document.dispatchEvent(customEvent);
    }

}
// ('0' + 4).slice(-2)
export function timestampToTime(timestamp) {
    // set dates
    let day = new Date(timestamp).getDate();
    let month = new Date(timestamp).getMonth() + 1;
    let year = new Date(timestamp).getFullYear();
    let seconds = new Date(timestamp).getSeconds();
    let minutes = new Date(timestamp).getMinutes();
    let hour = new Date(timestamp).getHours();
    // reconvert numbers
    seconds = ('0' + seconds).slice(-2);
    minutes = ('0' + minutes).slice(-2);
    // return
    return `${day}/${month}/${year} - ${hour}:${minutes}:${seconds}`;
}

export function dateToTimestamp(date, add1Day = false) {
    // BUG: la fecha del html day viene con un dia menos
    let fecha = new Date(date);
    // sumarle un dia
    if (add1Day) {
        fecha.setDate(fecha.getDate() + 1);
    }
    let endDate = new Date(fecha).getTime();

    return endDate;
}

export function timeStampToDateForm(timestamp) {
    // convert date from timestamp to DD/MM/YY
    let time = timestampToTime(timestamp).split(' - ')[0];
    // separate dates on the array ["DD", "MM", "YY"]
    let arrayTime = time.split('/');
    // add ceros to day and mont if there is only 1 number per date (1/1/2000)
    if (arrayTime[0].length == 1) arrayTime[0] = "0" + arrayTime[0];
    if (arrayTime[1].length == 1) arrayTime[1] = "0" + arrayTime[1];
    // reverse date DD/MM/YY to YY/MM/DD
    return arrayTime.reverse().join('-');
}

export function addDays(date, days) {
    //	console.log("el days :", days);
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

//Add Months + Agregar meses a la date

export function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
        date.setDate(0);
    }
    return date;
}

export function timestampFecha(timestamp) {
    let meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    let diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
    let f = new Date(timestamp);

    let date = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " " + f.getFullYear();

    return date;
}

export function getFirebase(props) {
    let result = new Promise((resolve, reject) => {
        firebase.database().ref(props.name).once('value').then(snapshot => {
            //get object data
            let obj = snapshot.val();
            //if obj is not null
            if (obj !== null) {
                // convert obj data to array
                let array = Object.keys(obj).map(key => {
                    return obj[key];
                });
                // return result
                resolve(array);
            }
        });
    });
    // return the promise
    return result;
}
// export function pickerToTimestamp() {
// 	var dateFromPicker = "2012-10-12";
// 	var timeFromPicker = "12:30";

// 	var dateParts = dateFromPicker.split("-");
// 	var timeParts = timeFromPicker.split(":");
// 	var localDate = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
// }

export function propName(prop, value) {
    let res = ``;
    for (var i in prop) {
        if (typeof prop[i] == 'object') {
            if (propName(prop[i], value)) {
                return res;
            }
        }
        else {
            if (prop[i] == value) {
                res = i;
                return res;
            }
        }
    }
    return undefined;
}


/* animacion en el menú lateral */

export function animationNavbar() {
    let arrow = document.querySelectorAll(".arrow");
    for (var i = 0; i < arrow.length; i++) {
        arrow[i].addEventListener("click", (e) => {
            let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
            arrowParent.classList.toggle("showMenu");
        });
    }

    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".fa-bars");
    console.log(sidebarBtn);
    sidebarBtn.addEventListener("click", () => {
        sidebar.classList.toggle("close");
    });
}

/* validaciones por roles */

export function roleValidator(role) {
    console.log('el rol del usuario', role);

    if (role == "TECH_ROLE") {

        console.log('el rol es tech');
        document.getElementById('#btnNewTask').style.display = 'none';
        document.getElementById('#btnNewTaskM').style.display = 'none';


        document.getElementById('#btnAsigTaskM').style.display = 'none';
        document.getElementById('#btnAsigTask').style.display = 'none';

        document.getElementById('#btnUsersM').style.display = 'none';
        document.getElementById('#btnUsers').style.display = 'none';

    } else if (role == "PLANNING_ROLE") {

        console.log('el rol es planning');

        document.getElementById('#btnUsersM').style.display = 'none';
        document.getElementById('#btnUsers').style.display = 'none';

    } else if (role == "ADMIN_ROLE") {

        /* console.log('el rol es admin');

        document.getElementById('#btnNewTask').style.display = 'block';
        document.getElementById('#btnNewTaskM').style.display = 'block';


        document.getElementById('#btnAsigTaskM').style.display = 'block';
        document.getElementById('#btnAsigTask').style.display = 'block';


        document.getElementById('#btnUsersM').style.display = 'block';
        document.getElementById('#btnUsers').style.display = 'block'; */
    }
}
/* validaciones por roles */

export function roleValidatorMobile(role) {
    console.log('el rol del usuario mobile', role);
    if (role == "TECH_ROLE") {

        console.log('el rol es tech');
        document.getElementById('btnTareasAsig').style.display = 'none';
        document.getElementById('btnNewTarea').style.display = 'none';

    } else if (role == "PLANNING_ROLE") {



    } else if (role == "ADMIN_ROLE") {

        console.log('el rol es admin');

        document.getElementById('btnTareasAsig').style.display = 'block';
        document.getElementById('btnNewTarea').style.display = 'block';
    }
}

export function addNavbarMobile() {
    /* mis tareas */
    document.querySelector('#btnHome').onclick = event => {
        let customEvent = new CustomEvent('ready', { detail: 'tasks' });
        document.dispatchEvent(customEvent);
    }
    /* tareas Asignadas */
    document.querySelector('#btnTareasAsig').onclick = event => {
        let customEvent = new CustomEvent('ready', { detail: 'taskList' });
        document.dispatchEvent(customEvent);
    }
    /* tareas Asignadas */
    document.querySelector('#btnNewTarea').onclick = event => {
        let customEvent = new CustomEvent('ready', { detail: 'taskNew' });
        document.dispatchEvent(customEvent);
    }

    /* logout */
    document.querySelector('#btnLogout').onclick = event => {
        let customEvent = new CustomEvent('ready', { detail: 'logout' });
        document.dispatchEvent(customEvent);
    }
}

export function validateDevice() {
    var mobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (mobile.Android() || mobile.iOS() || mobile.Opera() || mobile.Windows());
        }
    };
    return mobile.any();
}

export function tooltipEverywhere() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })


}