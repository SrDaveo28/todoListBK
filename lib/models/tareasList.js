import { render, addNavbarFunc, animationNavbar, timeStampToDateForm, timestampToTime, tooltipEverywhere } from '../others/utils.js';
import { tareasListFront, toDoListSection, spinner } from '../views/templates.js';

import { getTareasAll, getTareasByUser } from "../apis/bdCall.js";

import { updateTarea } from "../apis/bdPut.js";

export function tareasList(view, model) {
    view = {};

    

    view.tareasListFront = tareasListFront(model.user);
    view.toDoListSection = toDoListSection();
    render(view, true);

    document.getElementById('taskTable').innerHTML = `
    <div class="d-flex align-items-center">
        <strong>Cargando...</strong>
        <div class="spinner-border text-primary ms-auto" role="status" aria-hidden="true"></div>
    </div>
    `;
    addNavbarFunc();
    animationNavbar();
    init();

    function init() {
        getTareasByUser(model.user.email).then(resultado => {
            console.log('resultado', resultado);
            delete view.toDoListSection

            model.tareas = resultado.tareas;

            frontCharge(model.tareas);

            buttonsFunction();
        });
    }


    function frontCharge(tareas) {

      
        let values = ``;

        let taskHistory = ``;

        let counter = 1;

        let misTareas = 0;

        let tareasFilter= tareas.filter(t => t.ticket.estado !== false);

        tareasFilter.forEach((tarea, index) => {

            let priorityClass = ''
            let stateClass = ''

            if (tarea.prioridad == 'Alta') {
                priorityClass = 'bg-danger'
            } else if (tarea.prioridad == 'Media') {
                priorityClass = 'bg-warning'
            } else if (tarea.prioridad == 'Baja') {
                priorityClass = 'bg-info'
            }

            if (tarea.acciones === "asignado") {
                stateClass = 'asign__bg';
            } else if (tarea.acciones === "enProceso") {
                stateClass = 'process__bg';
            } else if (tarea.acciones === "noRealizado") {
                stateClass = 'noRealizado__bg';
            }

            console.log(tarea.acciones, tarea);
            if (tarea.acciones !== "Realizado") {

                misTareas++;
                values += /* html */`
                    <tr>
                        <th>
                            <span class="me-2 levelTwo-role"><i
                                    class="fas fa-user-circle"></i></span>
                            <span class="ms-2">${tarea.ticket.asignado_por}</span>
                        </th>
                        <td class="align-middle">
                            <span>${tarea.tarea}</span>
                        </td>
                        <td class="align-middle text-center">
                            <h6 class="mb-0"><span class="badge ${priorityClass}">${tarea.prioridad}</span>
                            </h6>
                        </td>

                        <td class="align-middle text-center">
                            <h6 class="mb-0"><span class="badge ${stateClass}">${tarea.acciones}</span>
                            </h6>
                        </td>
                        <td class="align-middle text-center">
                            <a role="button" id="${tarea.ticket.id}" class="realizadoButton" data-bs-toggle="tooltip" data-bs-placement="top" title="Realizado"><i
                                    class="fas fa-check text-success me-3 "></i></a>
                            <a role="button" id="${tarea.ticket.id}" class="procesoButton" data-bs-toggle="tooltip" data-bs-placement="top" title="En Proceso"><i
                                    class="fas fa-minus text-warning me-3"></i></a>
                            <a role="button" id="${tarea.ticket.id}" class="noRealizadoButton" data-bs-toggle="tooltip" data-bs-placement="top" title="No realizado"><i
                                    class="fas fa-times text-danger me-3"></i></a>
    
                        </td>
                </tr>
                
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

        document.getElementById('taskTable').innerHTML = ``;
        document.getElementById('taskTable').innerHTML = `
            <div class="card">
                                <div class="card-header p-3">
                                    <h5 class="mb-0"><i class="fas fa-tasks me-2"></i> Mis Tareas <span class="badge bg-danger">${misTareas}</span> </h5>
                                </div>
                                <div class="card-body" data-mdb-perfect-scrollbar="true"
                                    style="position: relative; height: auto">
    
                                    <table class="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Asignado Por</th>
                                                <th scope="col">Tarea</th>
                                                <th class="text-center" scope="col">Prioridad</th>
                                                <th class="text-center" scope="col">Estado</th>
                                                <th class="text-center" scope="col">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${values}
                                        </tbody>
                                    </table>
    
                                </div>
    
                            </div>
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

            tooltipEverywhere();
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

}