import { tareasList } from '../lib/models/tareasList.js';
import { addTarea } from '../lib/models/addTarea.js';
import { logIn } from '../lib/models/login.js';
import { tareasAsignadas } from '../lib/models/tareasAsignadas.js';
import { tareasListMobile } from '../lib/models/tareasListMobile.js';
import { tareasAsignadasMob } from '../lib/models/tareasAsignadasMobile.js';
import { addTareaMob } from '../lib/models/addTareaMobile.js';
import { logout } from '../lib/others/login.js';
import { userList } from '../lib/models/userList.js'

import { roleValidator, validateDevice, roleValidatorMobile } from '../lib/others/utils.js';

let view = {};

let model = {};

let dispositivo = validateDevice();

let user = getCookie("user");

const delay = ms => new Promise(res => setTimeout(res, ms));

if (user !== "") {



    let userCookie = JSON.parse(user);
    console.log('userCookie', userCookie);
    model.user = userCookie;

    /* console.log('mi dispositivo', dispositivo[0]); */

    if (dispositivo !== null) {
        tareasListMobile(view, model);
        roleValidatorMobile(model.user.role);

        document.addEventListener('ready', event => {
            
            if (event.detail == 'tasks') {
                tareasListMobile(view, model);
            }
            if (event.detail == 'taskNew') {
                addTareaMob(view, model);
            }
            if (event.detail == 'taskList') {
                tareasAsignadasMob(view, model);
            }
            if (event.detail == 'logout') {
                logout();

                location.reload(true);
            }

        });

    } else {



        tareasList(view, model);
        roleValidator(model.user.role);
        

        document.addEventListener('ready', event => {


            if (event.detail == 'newTask') {
                addTarea(view, model);
            }

            if (event.detail == 'tasks') {
                tareasList(view, model);
            }

            if (event.detail == 'tareasAsignadas') {
                tareasAsignadas(view, model);
            }
            if (event.detail == 'users') {
                userList(view, model);
            }
            if (event.detail == 'logout') {
                logout();

                location.reload(true);


            }

        });

    }


} else {
    logIn(view, model);
}



/* logIn(view, model); */

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}






