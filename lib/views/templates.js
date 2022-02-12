import { timeStampToDateForm } from "../others/utils.js";
export function loginForm() {
    return /* html */`
    
    <section class="login-body">
        <div class="login-container">
            <div class="login-info-container">
              <h1 class="title mt-5 mb-5">Iniciar Sesión</h1>
              <div class="social-login">
                 <!-- <div class="social-login-element">
                      <img src="assets/img/google.svg" alt="google-image">
                      <span>Google</span>
                  </div>
                  <div class="social-login-element">
                      <img src="assets/img/facebook.svg" alt="facebook-image">
                      <span>Facebook</span>
                  </div> -->
              </div>
              <!--<p>o mediante</p>-->
              <div class="inputs-container">
                  <input class="input" type="email" placeholder="Usuario" id="inputEmail">
                  <input class="input" type="password" placeholder="Contraseña" id="inputPassword">
                  <!-- <p>Forgot password? <span class="span">Click here</span></p> -->
                  <button class="button" id="buttonLogin">login</button>
                  <!-- <p>Don't have an account? <span class="span">Sign Up</span></p> -->
              </div>
            </div>
              <img class="image-container" src="assets/img/login.svg" alt="">
        </div>
    </section>

    
    `;
}

export function addTareaFront() {



    return /* html */`
    <section class="home-section">
            <div class="home-content">
                <i class="fas fa-bars m-2" style="font-size: 25px;"></i>
                <!-- <i class='bx bx-menu'></i> -->
                <span class="text">ToDo List</span>
            </div>


            <section class="mt-3">
                <div class="container py-5 h-100" id="addTareasCard">
                    
                </div>
            
            </section>




        </section>
    <!--<section class="vh-100">
        
    </section>-->
    
    `;
}


export function spinner() {
    return /* html */ `
    <div class="d-flex align-items-center">
        <strong>Cargando...</strong>
        <div class="spinner-border text-primary ms-auto" role="status" aria-hidden="true"></div>
    </div>
    
    `;
}
export function tareasListFront(props) {

    console.log("mis props", props);

    return /* html */`

    <div class="sidebar close">
            <div class="logo-details">
                <i class="far fa-calendar-alt"></i>
                <span class="logo_name">ToDo List</span>
            </div>
            <ul class="nav-links">
                <li>
                    <a id="btnNewTaskM" role="button">
                        <i class="fas fa-plus"></i>
                        <span class="link_name">Nueva Tarea</span>
                    </a>

                    <ul class="sub-menu blank">
                        <li><a class="link_name" role="button" id="btnNewTask">Nueva Tarea</a></li>
                    </ul>
                </li>


                <li>
                    <a id="btnTaskM" role="button">
                        <i class="fas fa-tasks"></i>
                        <span class="link_name">Mis Tareas</span>
                    </a>

                    <ul class="sub-menu blank">
                        <li><a class="link_name" role="button" id="btnTask">Mis Tareas</a></li>
                    </ul>
                </li>


                <li>
                    <a id="btnAsigTaskM" role="button">
                        <i class="fas fa-bullhorn"></i>
                        <span class="link_name">Tareas Asignadas</span>
                    </a>

                    <ul class="sub-menu blank">
                        <li><a class="link_name" role="button" id="btnAsigTask">Tareas Asignadas</a></li>
                    </ul>
                </li>


                <li>
                    <div class="iocn-link">
                        <a href="#">
                            <i class="fas fa-comments"></i>
                            <span class="link_name">Chat</span>
                        </a>
                       
                    </div>
                    <ul class="sub-menu">
                        <li><a class="link_name" href="#">Chat</a></li>
                        
                    </ul>


                </li>


                <li>
                    <div class="iocn-link">
                        <a href="#">
                            <i class="fas fa-history"></i>
                            <span class="link_name">Historial</span>
                        </a>
                        
                    </div>
                    <ul class="sub-menu">
                        <li><a class="link_name" href="#">Historial</a></li>
                       
                    </ul>
                </li>


                <li>
                    <div class="iocn-link">
                        <a id="btnUsers" href="#">
                            <i class="fas fa-users"></i>
                            <span class="link_name">Usuarios</span>
                        </a>

                        <!--<i class="fas fa-chevron-down arrow"></i>-->
                        
                    </div>
                    <ul class="sub-menu">
                        <li><a class="link_name" href="#" id="btnUsersM">Usuarios</a></li>
                       
                    </ul>
                </li>

                <li>
                    <a href="#">
                        <i class="fas fa-chart-line"></i>
                        <span class="link_name">Chart</span>
                    </a>
                    <ul class="sub-menu blank">
                        <li><a class="link_name" href="#">Chart</a></li>
                    </ul>
                </li>


                <li>
                    <div class="profile-details">
                        <div class="profile-content">
                            <i class="fas fa-user"></i>
                            <!-- <img src="image/profile.jpg" alt="/"> -->
                        </div>
                        <div class="name-job">
                            <!--<div class="profile_name">${props.name + ' ' + props.surname}</div>-->
                            <div class="job">${props.email}</div>
                        </div>
                        <a role="button" id="logout" data-bs-toggle="tooltip" title="Cerrar Sesión"><i class="fas fa-sign-out-alt"></i></a>
                    </div>
                </li>
            </ul>
        </div>
        
    
    
    
    `;
}

export function toDoListSection() {


    return /* html */ `
    
    <section class="home-section">
            <div class="home-content">
                <i class="fas fa-bars m-2" style="font-size: 25px;"></i>
                <!-- <i class='bx bx-menu'></i> -->
                <span class="text">ToDo List</span>
            </div>


            <section class="mt-3">

                <div class="m-3">

                    <div class="navbar navbar-light bg-light ">
                        <div class="container-fluid">

                            <div class="d-flex justify-content-end">
                                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                    Historial <i class="fas fa-chevron-right" style="font-size: 18px;"></i>
                                </button>

                            </div>

                            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar"
                                aria-labelledby="offcanvasNavbarLabel">
                                <div class="offcanvas-header">
                                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel"><i class="fas fa-history"></i>
                                        Historial</h5>
                                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                                        aria-label="Close"></button>
                                </div>
                                <div class="offcanvas-body" id="historialList">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div>

                    <div class="m-4" id="taskTable">
                        
                    </div>

                </div>
            </section>



        
        </section>
    
    
    `;
}

export function tareasAsignadasFront() {
    return /* html */ `

    <section class="home-section">
        <div class="home-content">
            <i class="fas fa-bars m-2" style="font-size: 25px;"></i>
            <!-- <i class='bx bx-menu'></i> -->
            <span class="text">ToDo List</span>
        </div>


        <section class="bg__section">

            <div class="container inputField d-flex justify-content-center mt-4">
                <input type="text" class="me-2" placeholder="Tarea..." id="searchTarea" style="text-transform: uppercase;">
               
                <input type="text" placeholder="TÉCNICO..." id="searchTecnico">
              
            </div>
            <div class="container-fluid" id="tareasAsig">
                
            </div>

        </section>




    </section>

    
    `;
}

export function userModal() {
    return /* html */`
    <!-- Modal -->
    <div class="modal fade" id="userModal"  data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"><i class="fas fa-user-plus me-2"></i> Nuevo Usuario
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <!--Nombre-->
                    <div class="mb-3">
                        <span  class=" mt-2 align-center">Nombre</span>
                        <input type="text" class="form-control" placeholder="Ingrese un nombre" aria-label="Username"
                         id="inputName" style="text-transform: uppercase;">
                    </div>

                    <!--Apellido-->
                    <div class="mb-3">
                        <span class=" mt-2 align-center">Apellido</span>
                        <input type="text" class="form-control" placeholder="Ingrese un apellido" aria-label="Username"
                            aria-describedby="basic-addon2" id="inputSurname" style="text-transform: uppercase;">
                    </div>
                    <!--Correo-->
                    <div class="mb-3">
                        <span class=" mt-2 align-center">E-mail </span>
                        <input type="email" class="form-control" placeholder="Ingrese un correo" aria-label="Username"
                         id="inputEmail">
                    </div>
                    <!--password-->
                    <div class="mb-3">
                    <span class=" mt-2 align-center">Password:  </span>
                        <input type="password" class="form-control" aria-label="Username"
                         id="inputPassword">
                    </div>
                    <!--role-->
                    <div class="mb-3">
                        <span class=" mt-2 align-center">Rol:  </span>
                        <select class="form-select" aria-label="Default select example" id="roleSelect">
                            <option value="-1" selected disabled>Opciones</option>
                            <option value="ADMIN_ROLE">ADMIN_ROLE</option>
                            <option value="PLANNING_ROLE">PLANNING_ROLE</option>
                            <option value="TECH_ROLE">TECH_ROLE</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" id="btnSaveUser"><i class="fas fa-check"></i> Guardar</button>
                </div>
            </div>
        </div>
    </div>
    `;
}
export function updateUserModal() {
    return /* html */`
    <!-- Modal -->
    <div class="modal fade" id="updateUserModal"  data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"><i class="fas fa-user-plus me-2"></i> Nuevo Usuario
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <!--Nombre-->
                    <div class="mb-3">
                        <span  class=" mt-2 align-center">Nombre</span>
                        <input type="text" class="form-control" placeholder="Ingrese un nombre" aria-label="Username"
                         id="inputEditName" style="text-transform: uppercase;">
                    </div>

                    <!--Apellido-->
                    <div class="mb-3">
                        <span class=" mt-2 align-center">Apellido</span>
                        <input type="text" class="form-control" placeholder="Ingrese un apellido" aria-label="Username"
                            aria-describedby="basic-addon2" id="inputEditSurname" style="text-transform: uppercase;">
                    </div>
                    <!--Correo-->
                    <div class="mb-3">
                        <span class=" mt-2 align-center">E-mail </span>
                        <input type="email" class="form-control" placeholder="Ingrese un correo" aria-label="Username"
                         id="inputEditEmail">
                    </div>
                    <!--password-->
                    <div class="mb-3">
                    <span class=" mt-2 align-center">Password:  </span>
                        <input type="password" class="form-control" aria-label="Username"
                         id="inputEditPassword">
                    </div>
                    <!--role-->
                    <div class="mb-3">
                        <span class=" mt-2 align-center">Rol:  </span>
                        <select class="form-select" aria-label="Default select example" id="roleEditSelect">
                            <option value="-1" selected disabled>Opciones</option>
                            <option value="ADMIN_ROLE">ADMIN_ROLE</option>
                            <option value="PLANNING_ROLE">PLANNING_ROLE</option>
                            <option value="TECH_ROLE">TECH_ROLE</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" id="btnEditUser"><i class="fas fa-check"></i> Guardar</button>
                </div>
            </div>
        </div>
    </div>
    `;
}

export function userTable() {
    return /* html */`

    <section class="home-section">
        <div class="home-content">
            <i class="fas fa-bars m-2" style="font-size: 25px;"></i>
            <!-- <i class='bx bx-menu'></i> -->
            <span class="text">ToDo List</span>
        </div>

        <div class="m-3">
         <button type="button" class="btn btn-primary" id="newUser" data-bs-toggle="modal" data-bs-target="#userModal"><i class="fas fa-user-plus"></i>  Nuevo Usuario</button>
        </div>
        <section class="mt-3 container-fluid" id="userList">

            

        </section>

    </section>
    
   
    `;
}


/* sector Mobile */

export function navbarMobile() {
    return /* html */ `
    
    <nav class="navbar navbar-bg navbar-expand-lg navbar-dark " >
        <div class="container-fluid ">
            <a class="navbar-brand text-light" href="#">To Do List</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active text-light" aria-current="page" role="button" id="btnHome"><i class="fas fa-home"></i> Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active text-light" aria-current="page" role="button" id="btnNewTarea"><i class="fas fa-plus"></i> Nueva Tarea</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active text-light" role="button" id="btnTareasAsig"><i class="fas fa-bullhorn"></i> Tareas Asignadas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active text-light" role="button" id="btnLogout"><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</a>
                    </li>
                   
                </ul>
            
            </div>
        </div>
    </nav>
    
    
    
    `;
}

export function tareasListMobileFront() {
    return /* html */`


    <div class="inputField d-flex justify-content-center mt-4">
        <input type="text" placeholder="Buscar..." id="searchTarea" style="text-transform: uppercase;">
        <button type="button" id="buscarTarea"><i class="fas fa-search"></i></button>
    </div>

    <div class="m-3">
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                Historial <i class="fas fa-chevron-right" style="font-size: 18px;"></i>
            </button>
    </div>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel"><i class="fas fa-history"></i>
                Historial</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body" id="historialList">

        </div>
    </div>

    <div class="container" id="tareasList">
        
    </div>
    
    
    `;
}



export function tareasAsignadasMobile() {
    return /* html */`
        <section class="bg__section">
            
            <div class="container-fluid">
                <div class="row mt-2">
                    <div class="col-12 mb-2">
                  
                        <input type="text" class="me-2" placeholder="Buscar Tarea..." id="searchTarea" style="text-transform: uppercase;">


                    </div>
                    <div class="col-12">
            
                        <input type="text" placeholder="Buscar Técnico..." id="searchTecnico">
               
                    </div>
                </div>
            </div>
            
            <div class="container-fluid" id="tareasAsigMobile">
                
            </div>

        </section>
    
    `;
}

export function addTareasMobile() {
    return /* html */`
    
    <section class="mt-3">
        <div class="container py-5 h-100" id="addTareasCard">
                    
        </div>
            
    </section>
    `;
}