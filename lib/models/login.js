import { render } from '../others/utils.js';
import { loginForm } from '../views/templates.js';
import { login } from '../others/login.js';

export function logIn(view, model) {
    view = {};

    let form = {};

    view.form = loginForm();

    render(view, true);


    /* enter loginBTN */

    document.getElementById('buttonLogin').onclick = event => {
        console.log('click');
        // capture form values
        form.email = document.getElementById('inputEmail').value;
        form.password = document.getElementById('inputPassword').value;
        // try to login

        console.log('form', form);
        login(form).then(result => {

            let valueCookie = JSON.stringify(result);

            setCookie("user", valueCookie);

            model.user = result;
            location.reload(true);

            console.log("model user", model.user);

        });

    };



    /* create session cookie */

    function setCookie(cname, cvalue) {

        var today = new Date();
        var expire = new Date();

        var number_of_days = 3;


        expire.setTime(today.getTime() + 60 * 60 * 1000 * 24 * number_of_days);
        /*d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); */
        //let expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; expires=" + expire.toGMTString() + ";path=/";
    }
}