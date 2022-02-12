import { render, addNavbarMobile, roleValidatorMobile, timeStampToDateForm } from '../others/utils.js';
import { navbarMobile, addTareasMobile } from '../views/templates.js';
import { postTareas } from '../apis/bdPost.js';
import { getUsersAll } from '../apis/bdCall.js';

export function addTareaMob(view, model) {
    view = {};

    view.navbarMobile = navbarMobile(model.user);

    view.addTarea = addTareasMobile();
    render(view, true);


    document.getElementById('addTareasCard').innerHTML = `
        <div class="d-flex align-items-center">
            <strong>Cargando...</strong>
            <div class="spinner-border text-primary ms-auto" role="status" aria-hidden="true"></div>
        </div>
    `;

    addNavbarMobile();
  
    init();


    /* inicio de la pestaña */
    function init() {
        getUsersAll().then(resultado => {
            console.log('resultado', resultado);
            let userList = ``;


            resultado.forEach(element => {

                userList += `
                <option value="${element.email}">${element.email}</option>
                
                `;

                /*  userList.push(element.usuarios.email); */
            });
            /* model.userList = userList; */

            let date = new Date();
            date = Date.now();
            let fecha = ``;

            fecha = timeStampToDateForm(date);

            document.getElementById('addTareasCard').innerHTML = ``;

            document.getElementById('addTareasCard').innerHTML = /* html */`
            <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col">
                            <div class="card" id="list1" style="border-radius: .75rem; background-color: #eff1f2;">
                                <div class="card-body py-4 px-4 px-md-5">

                                    <p class="h1 text-center mt-3 mb-4 pb-3 text-primary">
                                        <i class="fas fa-check-square me-1"></i>
                                        <u>Agregar Tareas</u>
                                    </p>

                                    <div class="pb-2">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="d-flex flex-row align-items-center">
                                                    <input type="text" class="form-control form-control-lg " id="inTxtTarea"
                                                        placeholder="Añadir Tarea...">
                                                    


                                                </div>
                                            </div>
                                        </div>

                                        <hr class="my-4">

                                        <div class="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">

                                            <div class="row">
                                                <div class="col-12">

                                                    <p class="small mb-0 text-center">Prioridad</p>
                                                    <select class="form-select" id="prioridadSelect">
                                                        <option value="Alta">Alta</option>
                                                        <option value="Media">Media</option>
                                                        <option value="Baja">Baja</option>
                                                    </select>

                                                </div>
                                                <div class="col-12">

                                                    <p class="small mb-0 text-center">Referencia</p>
                                                    <input id="inputReferencia" type="text" class="form-control" placeholder="Referencia">

                                                </div>

                                                <div class="col-12">
                                                    <p class="small mb-0 text-center">Funcionario</p>
                                                    <select class="form-select" id="funcionarioSelect">
                                                        ${userList}
                                                    </select>
                                                </div>

                                                <div class="col-12">
                                                    <p class="small mb-0 text-center">Fecha</p>
                                                    <input type="date" id="dateTask" value="${fecha}" class="form-control form-control" readonly>
                                                </div>
                                                <div class="col-12">
                                                    <div class="mt-3 d-flex justify-content-center">
                                                        <button type="button" class="btn btn-primary"
                                                            id="btnAddTareas">Agregar</button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            
            `;

            buttonsFunction();

            roleValidatorMobile(model.user.role);
        });
    }
    /* animacion en el menú lateral */

    function buttonsFunction() {
        let btnAddTareas = document.getElementById('btnAddTareas');
        let inTareaText = document.getElementById('inTxtTarea');
        let contaTexto = 0;
        let contaClear = 0;


        inTareaText.oninput = function () {

            let texto = inTareaText.value.replace(/[^a-zA-Z0-9\s]/g, '');

            if (texto.length >= 123) {

                Swal.fire({
                    title: 'Llego al máximo de caracteres',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Enviar',
                    denyButtonText: `Editar`,
                }).then((result) => {
                    // Read more about isConfirmed, isDenied below 
                    if (result.isConfirmed) {

                        contaTexto = 0;
                        document.getElementById('inTxtTarea').value = ``;
                        Swal.fire('Enviado!', '', 'success')

                    } else if (result.isDenied) {

                        let cantiCaracteres = document.getElementById('inTxtTarea').value.length;
                        console.log(cantiCaracteres);
                        contaTexto = cantiCaracteres;
                        Swal.fire('Puede seguir editando...', '', 'info')

                    }
                })

            }
        };

        btnAddTareas.addEventListener('click', () => {
            /* inTxtTarea, dateTask, funcionarioSelect, prioridadSelect */

            let dateTask = document.getElementById('dateTask').value;
            let funcionarioSelect = document.getElementById('funcionarioSelect').value;
            let prioridadSelect = document.getElementById('prioridadSelect').value;
            let inTxtTarea = (document.getElementById('inTxtTarea').value).toUpperCase();
            let inputReferencia = (document.getElementById('inputReferencia').value).toUpperCase();
            let timestamp;

            timestamp = Date.now();



            let datos = {

                id: timestamp,
                asignado_user: funcionarioSelect,
                asignado_por: model.user.email,
                estado: true,
                tarea: inTxtTarea,
                prioridad: prioridadSelect,
                referencia: inputReferencia,
                fecha: timestamp,
                acciones: 'asignado'
            }

            postTareas(datos).then(() => {

                Swal.fire(
                    'Operación exitosa',
                    'Se ha creado la tarea',
                    'success'
                )
            });



            let tarea = document.getElementById('inTxtTarea').value;
            document.getElementById('inTxtTarea').value = ``;







        });




    }


}