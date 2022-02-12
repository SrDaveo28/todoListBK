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
            /* Read more about isConfirmed, isDenied below */
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
    let tarea = document.getElementById('inTxtTarea').value;
    console.log(tarea);
    document.getElementById('inTxtTarea').value = ``;
});
