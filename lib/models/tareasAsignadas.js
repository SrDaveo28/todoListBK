import { render, addNavbarFunc, animationNavbar } from '../others/utils.js';
import { tareasListFront, tareasAsignadasFront } from '../views/templates.js';
import { getTareasAll } from '../apis/bdCall.js';
import { updateTarea } from '../apis/bdPut.js';

export function tareasAsignadas(view, model) {
    view = {};

    view.tareasListFront = tareasListFront(model.user);
    view.tareasAsignadasFront = tareasAsignadasFront();

    render(view, true);


    document.getElementById('tareasAsig').innerHTML = `
    <div class="d-flex align-items-center mt-5">
        <strong>Cargando...</strong>
        <div class="spinner-border text-primary ms-auto" role="status" aria-hidden="true"></div>
    </div>
    `;
    addNavbarFunc();
    animationNavbar();
    init();
    function init() {
        getTareasAll().then(result => {
            model.asignados = result;

            frontCharge(model.asignados);
            searchFields();
            buttonsFunctions();
            
        })
    }


    function frontCharge(tareas) {
        console.log('frontCharge', tareas);
        let valuesAsig = ``;
        let valuesProcess = ``;
        let valuesRealiz = ``;
        let valuesNoRealiz = ``;


        let tareasFilter = tareas.filter(t => t.ticket.estado !== false);

        tareasFilter.forEach((tarea, index) => {
            if (tarea.acciones === "asignado") {
                valuesAsig += `<li class="list-group-item">${tarea.tarea} <br> <strong class="me-1">Funcionario:</strong> ${tarea.ticket.asignado_user}<span class="icon deleteButton" id="${tarea.ticket.id}"><i
                class="fas fa-trash mt-3"></i></span></li>`;

            } else if (tarea.acciones === "enProceso") {
                valuesProcess += `<li class="list-group-item">${tarea.tarea} <br> <strong class="me-1">Funcionario:</strong> ${tarea.ticket.asignado_user}<span class="icon deleteButton" id="${tarea.ticket.id}"><i
                class="fas fa-trash mt-3"></i></span></li>`;

            } else if (tarea.acciones === "Realizado") {
                valuesRealiz += `<li class="list-group-item">${tarea.tarea}<br> <strong class="me-1">Funcionario:</strong>${tarea.ticket.asignado_user}<span class="icon deleteButton" id="${tarea.ticket.id}"><i
                class="fas fa-trash mt-3"></i></span></li>`;

            } else if (tarea.acciones === "noRealizado") {
                valuesNoRealiz += `<li class="list-group-item">${tarea.tarea} <br> <strong>Funcionario:</strong> ${tarea.ticket.asignado_user}<span class="icon deleteButton" id="${tarea.ticket.id}"><i
                class="fas fa-trash mt-3"></i></span></li>`;
            }
        })



        document.getElementById('tareasAsig').innerHTML = ``;

        document.getElementById('tareasAsig').innerHTML = /* html */`
        <div class="row">
                    <div class="col">
                        <div class="wrapper">
                            <header>Asignados</header>
                            
                            <ul class="list-group todoList mt-4">
                                <!-- data are comes from forEach -->
                                ${valuesAsig}
                               
                            </ul>

                        </div>
                    </div>
                    <div class="col">
                        <div class="wrapper">
                            <header>En Proceso</header>
                           <!-- <div class="inputField">
                                <input type="text" placeholder="Buscar..." id="searchProceso" style="text-transform: uppercase;">
                                <button type="button" id="buscarProces"><i class="fas fa-search"></i></button>
                            </div> -->
                            <ul class="list-group todoList mt-4">
                                <!-- data are comes from forEach -->

                                ${valuesProcess}  
                            </ul>

                        </div>
                    </div>
                    <div class="col">
                        <div class="wrapper">
                            <header>Realizados</header>
                            <!--<div class="inputField">
                                <input type="text" placeholder="Buscar..." id="searchRealizados" style="text-transform: uppercase;">
                                <button type="button" id="buscarRealiz"><i class="fas fa-search"></i></button>
                            </div>-->
                            <ul class="list-group todoList mt-4">


                                <!-- data are comes from forEach -->
                                ${valuesRealiz}
                            </ul>

                        </div>
                    </div>
                    <div class="col">
                        <div class="wrapper">
                            <header>No Realizados</header>
                           <!-- <div class="inputField">
                                <input type="text" placeholder="Buscar..." id="searchNoRealizados" style="text-transform: uppercase;">
                                <button type="button" id="buscarNoRealiz"><i class="fas fa-search"></i></button>
                            </div> -->
                            <ul class="list-group todoList mt-4">
                                <!-- data are comes from forEach -->


                                ${valuesNoRealiz} 
                            </ul>

                        </div>
                    </div>
                </div>
        
        
        `;

    }



    function buttonsFunctions() {
        let deleteButtons = document.querySelectorAll('.deleteButton');

        let timestamp;
        deleteButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                timestamp = Date.now();
                console.log(btn.id);
                console.log("click delete");
                let tarea = model.asignados.filter(t => t.ticket.id == btn.id);
                tarea[0].ticket.estado = false;
                tarea[0].fecha = timestamp;

                console.log('la tarea a eliminar', tarea[0]);
                updateTarea(tarea[0]).then(() => {
                    init();
                });
            });
        })
    }


    function searchFields() {
        
        document.getElementById('searchTarea').oninput = event => {
            search('searchTarea', 'tarea');

        }

        document.getElementById('searchTecnico').oninput = event => {
            searchTec('searchTecnico', 'asignado_user');

        }
    }

    function search(fieldId, field) {
        let currentInput = (document.getElementById(fieldId).value).toUpperCase();

        console.log("mis asignaciones", model.asignados, currentInput);
        //clear filter result 
        model.filterResult = [];

        if (currentInput !== "" && currentInput !== null && currentInput !== undefined) {
            // #1 crear array de 'clientes' que contengan el string en 'name'
            model.filterResult = model.asignados.filter(element => element[field].includes(currentInput));
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

            frontCharge(model.filterResult, model.filterResultTecnicos);
            buttonsFunctions();
            searchFields();
           
        } else if (currentInput == "") {
            frontCharge(model.asignados);
            buttonsFunctions();
            searchFields();
            
        } else {
            frontCharge(model.asignados);
            buttonsFunctions();
            searchFields();
           
        }

    }
    function searchTec(fieldId, field) {
        let currentInput = document.getElementById(fieldId).value;

        
        //clear filter result 
        model.filterResult = [];

        if (currentInput !== "" && currentInput !== null && currentInput !== undefined) {
            // #1 crear array de 'clientes' que contengan el string en 'name'

            model.filterResult = model.asignados.filter(element => element.ticket[field].includes(currentInput));
            
            // #2 sort by position: los que incluyen en el primer nombre

            console.log("mis asignaciones", model.filterResult, currentInput);
            model.filterResult.sort(function (a, b) {
                if (a.ticket[field].split(' ')[0].includes(currentInput)) {
                    return -1;
                } else {
                    return 1;
                }
            });
            // #3 sort by FIRST name length
            model.filterResult.sort((a, b) => a.ticket[field].split(' ')[0].length - b.ticket[field].split(' ')[0].length);
            // #4 sort by position
            model.filterResult.sort(function (a, b) {
                if (a.ticket[field].split(' ')[0].includes(currentInput)) {
                    return -1;
                } else {
                    return 1;
                }
            });

            console.log('mi filter result', model.filterResult);

            frontCharge(model.filterResult, model.filterResultTecnicos);
            buttonsFunctions();
            searchFields();
           
        } else if (currentInput == "") {
            frontCharge(model.asignados);
            buttonsFunctions();
            searchFields();
           
        } else {
            frontCharge(model.asignados);
            buttonsFunctions();
            searchFields();
           
        }

    }

}
