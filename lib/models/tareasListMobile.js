import { render, timestampToTime, addNavbarMobile,roleValidatorMobile } from '../others/utils.js';
import { tareasListMobileFront, navbarMobile } from '../views/templates.js';
import { getTareasByUser } from '../apis/bdCall.js';

import { updateTarea } from '../apis/bdPut.js';


export function tareasListMobile(view, model) {

    view = {};

    view.navbarMobile = navbarMobile(model.user);
    view.tareasListMobileFront = tareasListMobileFront();

    render(view, true);

    document.getElementById('tareasList').innerHTML = `
    <div class="d-flex align-items-center mt-3">
        <strong>Cargando...</strong>
        <div class="spinner-border text-primary ms-auto" role="status" aria-hidden="true"></div>
    </div>
    `;

    init();


    function init() {
        getTareasByUser(model.user.email).then(resultado => {

            delete view.tareasListMobileFront;

            model.tareas = resultado.tareas;

            frontCharge(model.tareas);
            searchFields();
            buttonsFunction();
            addNavbarMobile();

            roleValidatorMobile(model.user.role);

        })
    }


    function frontCharge(tareas) {

        console.log('ingresó a frontCharge');

        let values = ``;

        let taskHistory = ``;

        let circleBG = ``;

        let counter = 1;

        let tareasFilter = tareas.filter(t => t.ticket.estado !== false);

        console.log(tareasFilter);

        tareasFilter.forEach((tarea, index) => {
            let priorityClass = ''
            let stateClass = ''

            if (tarea.prioridad == 'Alta') {
                priorityClass = 'tarjetaA-bg'
                circleBG = 'circuloA-bg'
            } else if (tarea.prioridad == 'Media') {
                priorityClass = 'tarjetaM-bg'
                circleBG = 'circuloM-bg'
            } else if (tarea.prioridad == 'Baja') {
                priorityClass = 'tarjetaB-bg'
                circleBG = 'circuloB-bg'
            }

            if (tarea.acciones === "asignado") {
                stateClass = 'asign__bg';
            } else if (tarea.acciones === "enProceso") {
                stateClass = 'process__bg';
            } else if (tarea.acciones === "noRealizado") {
                stateClass = 'noRealizado__bg';
            }

            if (tarea.acciones !== 'Realizado') {
                values += /* html */`
                    <div class="tarjeta ${priorityClass} mb-4">
                    <!-- <div class="puntos">...</div> -->
                    <div class="tarjeta-body mb-3">
                        <div class="tarjeta-body-item">
                            <!---<img src="assets/img/índice.png" alt="/">-->
                            <div class="text-medio">
                                <span class="tarjeta-title"><i class="fas fa-tools"></i> ${tarea.referencia} - ${tarea.acciones}</span>
                                <p class="phone">${tarea.ticket.asignado_por}</p>
        
                                <div class="datos">
                                    <div>
                                        <p class="text-dark">${tarea.tarea}</p>    
                                        
                                    </div>
        
                                </div>

                            </div>

                           
                        </div>

                        
                    </div>
        
                    <div class="ranking">
                        <h4 class="text-center">Acciónes</h4>
        
                        <div class="d-flex justify-content-center">
                            <div class="row">
                                <div class="col">
                                    <button class="btn btn-success btn-sm realizadoButton" id="${tarea.ticket.id}"><i class="fas fa-check"></i></button>
        
                                </div>
                                <div class="col">
                                    <button class="btn btn-warning text-light btn-sm procesoButton" id="${tarea.ticket.id}"><i class="fas fa-minus"></i></button>
        
                                </div>
                                <div class="col">
                                    <button class="btn btn-danger btn-sm noRealizadoButton" id="${tarea.ticket.id}"><i class="fas fa-times"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <div class="circulo ${circleBG}"></div>
                </div>
                `;
            } else if (tarea.acciones == "Realizado") {
                taskHistory += /* html */ `
                    <tr>
                        <th scope="row">${counter++}</th>
                            <td> ${tarea.tarea} </td>
                            <td> ${timestampToTime(tarea.fecha)} </td>
                                                    
                    </tr>
                    `;
            }


        })

        document.getElementById('tareasList').innerHTML = ``;

        document.getElementById('tareasList').innerHTML = `
        ${values}
        `;

        document.getElementById('historialList').innerHTML = ``;
        document.getElementById('historialList').innerHTML = `
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th class="text-center" scope="col">Tareas</th>
                        <th class="text-center" scope="col">Fecha</th>

                    </tr>
                </thead>
                <tbody>
                  ${taskHistory}                          
                </tbody>
            </table>

            `;
    }

    function buttonsFunction() {
        let realizadoBtn = document.querySelectorAll('.realizadoButton');
        let procesoBtn = document.querySelectorAll('.procesoButton');
        let noRealizadoBtn = document.querySelectorAll('.noRealizadoButton');


        let timestamp;
        realizadoBtn.forEach((btn, index) => {


            btn.addEventListener('click', () => {
                timestamp = Date.now();
                console.log(btn.id);
                console.log("click realizado");
                let tarea = model.tareas.filter(t => t.ticket.id == btn.id);
                tarea[0].acciones = 'Realizado';
                tarea[0].fecha = timestamp;
                //console.log("la tarea actual", tarea, "todas las tareas", model.tareas, "el index", index);
                updateTarea(tarea[0]).then(() => {
                    console.log("tarea actualizada");
                    init();
                });
            });
        })


        procesoBtn.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                timestamp = Date.now();
                console.log(btn.id);
                console.log("click proceso");
                let tarea = model.tareas.filter(t => t.ticket.id == btn.id);
                tarea[0].acciones = 'enProceso';
                tarea[0].fecha = timestamp;
                //console.log("la tarea actual", tarea, "todas las tareas", model.tareas, "el index", index);
                updateTarea(tarea[0]).then(() => {
                    console.log("tarea actualizada");
                    init();
                });
            })
        });

        noRealizadoBtn.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                timestamp = Date.now();
                console.log(btn.id);
                console.log("click realizado");
                let tarea = model.tareas.filter(t => t.ticket.id == btn.id);
                tarea[0].acciones = 'noRealizado';
                tarea[0].fecha = timestamp;
                //console.log("la tarea actual", tarea, "todas las tareas", model.tareas, "el index", index);
                updateTarea(tarea[0]).then(() => {
                    console.log("tarea actualizada");
                    init();
                });
            });
        });
    }


    


    function searchFields() {
        document.getElementById('searchTarea').oninput = event => {
            search('searchTarea', 'tarea');
        }
    }

    function search(fieldId, field) {
        let currentInput = (document.getElementById(fieldId).value).toUpperCase();

        console.log("mis asignaciones", model.tareas, currentInput);
        //clear filter result 
        model.filterResult = [];

        if (currentInput !== "" && currentInput !== null && currentInput !== undefined) {
            // #1 crear array de 'clientes' que contengan el string en 'name'
            model.filterResult = model.tareas.filter(element => element[field].includes(currentInput));
            // #2 sort by position: los que incluyen en el primer nombre
            model.filterResult.sort(function (a, b) {
                if (a[field].split(' ')[0].includes(currentInput)) {
                    return -1;
                } else {
                    return 1;
                }
            });
            // #3 sort by FIRST name length
            model.filterResult.sort((a, b) => a[field].split(' ')[0].length - b[field].split(' ')[0].length);
            // #4 sort by position
            model.filterResult.sort(function (a, b) {
                if (a[field].split(' ')[0].includes(currentInput)) {
                    return -1;
                } else {
                    return 1;
                }
            });

            console.log('mi filter result', model.filterResult);

            frontCharge(model.filterResult);
            buttonsFunction();
            searchFields();
           
        } else if (currentInput == "") {
            frontCharge(model.tareas);
            buttonsFunction();
            searchFields();
            
        } else {
            frontCharge(model.tareas);
            buttonsFunction();
            searchFields();
            
        }
    }
}