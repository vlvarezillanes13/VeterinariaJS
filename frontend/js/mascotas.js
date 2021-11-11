let listaMascotas = document.getElementById("lista-mascotas");
let tipo = document.getElementById("tipo");
let nombre = document.getElementById("nombre");
let dueno = document.getElementById("dueno");
let indice = document.getElementById("indice");
let form = document.getElementById("form");

let btnGuardar = document.getElementById("btn-guardar");
let btnNuevo = document.getElementById("btn-nuevo");

let mascotas = [
    {
        tipo:"Gato",
        nombre:"Manchas",
        dueno:"Esteban"
    },
    {
        tipo:"Perro",
        nombre:"Pancho",
        dueno:"Jhon"
    }
];

function listarMascotas(){
    const htmlMascotas = mascotas.map((mascota, index) => `<tr>
        <th scope="row">${index + 1}</th>
        <td>${mascota.tipo}</td>
        <td>${mascota.nombre}</td>
        <td>${mascota.dueno}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info editar"  data-bs-toggle="modal" data-bs-target="#ModalForm" onclick="editarMascota(${index})"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn btn-danger" onclick="eliminarMascota(${index})" ><i class="fas fa-trash-alt"></i></button>
            </div>
        </td>
    </tr>`).join("");

    listaMascotas.innerHTML = htmlMascotas;
    //Array.from(document.getElementsByClassName('editar')).forEach((botonEditar,index) => botonEditar.onclick = editar(index));
}

function enviarDatos(e){

    e.preventDefault();
    const datos = {
        tipo:tipo.value,
        nombre:nombre.value,
        dueno:dueno.value
    };
    const accion = btnGuardar.innerHTML;

    switch(accion){
        case "Editar":
            mascotas[indice.value] = datos;
            break;
        default:
            mascotas.push(datos);
            break;
    }

    listarMascotas();
    
}

function editarMascota(index){

    btnGuardar.innerHTML = "Editar";
    const mascota = mascotas[index];
    dueno.value = mascota.dueno;
    nombre.value = mascota.nombre;
    tipo.value = mascota.tipo;

    indice.value = index;
}

function eliminarMascota(index){
    mascotas = mascotas.filter( (mascota, indiceMascota) => indiceMascota !== index);
    listarMascotas();
}

function resetModal(){
    
    dueno.value = "";
    nombre.value = "";
    tipo.value = "";
    indice.value = "";
    btnGuardar.innerHTML = "Crear";
}

listarMascotas();
form.onsubmit  = enviarDatos;
btnGuardar.onclick = enviarDatos;
btnNuevo.onclick = resetModal;