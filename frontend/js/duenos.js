let listaDuenos = document.getElementById("lista-duenos");

let pais = document.getElementById("pais");
let nombre = document.getElementById("nombre");
let identificacion = document.getElementById("identificacion");
let apellido = document.getElementById("apellido");
let indice = document.getElementById("indice");
let form = document.getElementById("form");

let btnGuardar = document.getElementById("btn-guardar");
let btnNuevo = document.getElementById("btn-nuevo");

let duenos = [
    {
        nombre:"Valeria",
        apellido:"Gamboa",
        pais:"Chile",
        identificacion:"1234567890"
    },
    {
        nombre:"Juan David",
        apellido:"Marin",
        pais:"Argentina",
        identificacion:"1234567891"
    },
];

function listarDuenos(){
    const htmlDuenos = duenos.map((dueno, index) => `<tr>
        <th scope="row">${index + 1}</th>
        <td>${dueno.identificacion}</td>
        <td>${dueno.pais}</td>
        <td>${dueno.nombre}</td>
        <td>${dueno.apellido}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info editar"  data-bs-toggle="modal" data-bs-target="#ModalForm" onclick="editarMascota(${index})"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn btn-danger" onclick="eliminarMascota(${index})" ><i class="fas fa-trash-alt"></i></button>
            </div>
        </td>
    </tr>`).join("");

    listaDuenos.innerHTML = htmlDuenos;
    //Array.from(document.getElementsByClassName('editar')).forEach((botonEditar,index) => botonEditar.onclick = editar(index));
}

function enviarDatos(e){

    e.preventDefault();
    const datos = {
        nombre:nombre.value,
        apellido:apellido.value,
        pais:pais.value,
        identificacion:identificacion.value
    };
    const accion = btnGuardar.innerHTML;

    switch(accion){
        case "Editar":
            duenos[indice.value] = datos;
            break;
        default:
            duenos.push(datos);
            break;
    }

    listarDuenos();
    
}

function editarMascota(index){

    btnGuardar.innerHTML = "Editar";

    const dueno = duenos[index];
    pais.value = dueno.pais;
    identificacion.value = dueno.identificacion;
    nombre.value = dueno.nombre;
    apellido.value = dueno.apellido;
    indice.value = index;
}

function eliminarMascota(index){
    listarDuenos = duenos.filter( (dueno, indiceDueno) => indiceDueno !== index);
    listarDuenos();
}

function resetModal(){
    
    pais.value = "";
    identificacion.value = "";
    nombre.value = "";
    apellido.value = "";
    indice.value = "";
    
    btnGuardar.innerHTML = "Crear";
}

listarDuenos();
form.onsubmit  = enviarDatos;
btnGuardar.onclick = enviarDatos;
btnNuevo.onclick = resetModal;