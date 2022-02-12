import { render, addNavbarFunc, animationNavbar, tooltipEverywhere } from '../others/utils.js';
import { userTable, tareasListFront, userModal, updateUserModal } from '../views/templates.js'
import { getUsersAll } from '../apis/bdCall.js';
import { postUsers } from '../apis/bdPost.js';
import { updateUser } from '../apis/bdPut.js';

export function userList(view, model) {
    view = {};

    console.log('model', model);
    view.tareasListFront = tareasListFront(model.user);
    view.userTable = userTable();
    view.userModal = userModal();
    view.updateUserModal = updateUserModal();
    render(view, true);

    document.getElementById('userList').innerHTML = `
    <div class="d-flex align-items-center">
        <strong>Cargando...</strong>
        <div class="spinner-border text-primary ms-auto" role="status" aria-hidden="true"></div>
    </div>
    `;
    addNavbarFunc();
    animationNavbar();
    init();

    function init() {
        getUsersAll().then(resultado => {


            delete view.userTable

            model.usuariosList = resultado;

            frontCharge(model.usuariosList);

            buttonsFunction();


        })
    }

    function frontCharge(usuarios) {


        let values = ``;

        let userFilter = usuarios.filter(u => u.estado !== false);

        userFilter.forEach((usuario, index) => {
            values += /* html */`
                <tr>
                    <td>${index + 1}</td>
                    <td>${usuario.name}</td>
                    <td>${usuario.surname}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.role}</td>
                    <td>
                        <button class="btn btn-warning editButton" id="${usuario.id}" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar">
                            <i class="fas fa-user-edit"></i>
                        </button>

                        <button class="btn btn-danger deleteButton" id="${usuario.id}" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>   
            `;

        })

        document.getElementById('userList').innerHTML = ``;
        document.getElementById('userList').innerHTML = /* html */`
        <div class="card">
                <div class="card-header p-3">
                    <h5 class="mb-0"><i class="fas fa-users me-2"></i> Usuarios </h5>
   
                </div>
                <div class="card-body" data-mdb-perfect-scrollbar="true" style="position: relative; height: auto">

                    <table class="table table-striped table-hover">
                        <thead>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>E-Mail</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </thead>

                        <tbody>
                           ${values}
                        </tbody>
                    </table>
                </div>

            </div> 
    
        `;

        tooltipEverywhere();
    }

    function buttonsFunction() {
        let saveButton = document.getElementById('btnSaveUser');
        let editButton = document.querySelectorAll('.editButton');
        let deleteButton = document.querySelectorAll('.deleteButton');

        let timestamp = Date.now();

        saveButton.addEventListener('click', () => {
            let name = (document.getElementById('inputName').value).toUpperCase();
            let surname = (document.getElementById('inputSurname').value).toUpperCase();
            let email = document.getElementById('inputEmail').value;
            let password = document.getElementById('inputPassword').value;
            let role = document.getElementById('roleSelect').value;

            let user = {
                id: timestamp,
                name: name,
                surname: surname,
                email: email,
                password: password,
                role: role
            }

            postUsers(user).then(resultado => {
                console.log('resultado', resultado);

                Swal.fire(
                    'Operación exitosa',
                    'Se ha creado el usuario',
                    'success'
                )

                document.getElementById('inputName').value = "";
                document.getElementById('inputSurname').value = "";
                document.getElementById('inputEmail').value = "";
                document.getElementById('inputPassword').value = "";
                document.getElementById('roleSelect').value = "-1";

                $('#userModal').modal('hide');

                init();
            });
        });


        editButton.forEach((btn, index) => {

            btn.addEventListener('click', () => {
                console.log('btn', btn);
                let user = model.usuariosList.filter(u => u.id == btn.id);
                fillForm(user[0]);


                document.getElementById('btnEditUser').onclick = event => {
                    let name = (document.getElementById('inputEditName').value).toUpperCase();
                    let surname = (document.getElementById('inputEditSurname').value).toUpperCase();
                    let email = document.getElementById('inputEditEmail').value;
                    let password = document.getElementById('inputEditPassword').value;
                    let role = document.getElementById('roleEditSelect').value;

                    let userEdit = {
                        uid: user[0].uid,
                        id: btn.id,
                        name: name,
                        surname: surname,
                        email: email,
                        password: password,
                        role: role,
                        estado: true
                    }

                    console.log('user', userEdit);

                    updateUser(userEdit).then(resultado => {
                        console.log('resultado', resultado);

                        Swal.fire(
                            'Operación exitosa',
                            'Se ha editado el usuario',
                            'success'
                        )

                        document.getElementById('inputEditName').value = "";
                        document.getElementById('inputEditSurname').value = "";
                        document.getElementById('inputEditEmail').value = "";
                        document.getElementById('inputEditPassword').value = "";
                        document.getElementById('roleEditSelect').value = "-1";

                        $('#updateUserModal').modal('hide');

                        init();
                    });

                }
            })
        });


        deleteButton.forEach((btn, index) => {


            btn.addEventListener('click', () => {
                let userDelete = model.usuariosList.filter(u => u.id == btn.id);

                userDelete[0].estado = false;

                console.log('userDelete', userDelete[0]);
                Swal.fire({
                    title: '¿Esta seguro que desea eliminar al usuario?',
                    showDenyButton: true,
                    confirmButtonText: 'Si, eliminar',
                    denyButtonText: `No, cancelar`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        Swal.fire('Se ha eliminado!', '', 'success')
                        updateUser(userDelete[0]).then(resultado => {
                            init();
                        })
                    } else if (result.isDenied) {
                        Swal.fire('Se ha cancelado la operación', '', 'info')
                    }
                })

            })

        });
    }

    // fillForm
    function fillForm(props) {
        console.log('props', props);

        $('#updateUserModal').modal('show');

        document.getElementById('inputEditName').value = props.name;
        document.getElementById('inputEditSurname').value = props.surname;
        document.getElementById('inputEditEmail').value = props.email;
    }

}
