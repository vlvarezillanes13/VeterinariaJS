let listaVeterinarios = document.getElementById("lista-veterinarios");

let pais = document.getElementById("pais");
let nombre = document.getElementById("nombre");
let identificacion = document.getElementById("identificacion");
let apellido = document.getElementById("apellido");
let indice = document.getElementById("indice");
let form = document.getElementById("form");

let btnGuardar = document.getElementById("btn-guardar");
let btnNuevo = document.getElementById("btn-nuevo");

let veterinarios = [
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

function listarVeterionarios(){
    const htmlVeterinarios = veterinarios.map((vet, index) => `<tr>
        <th scope="row">${index + 1}</th>
        <td>${vet.identificacion}</td>
        <td>${vet.pais}</td>
        <td>${vet.nombre}</td>
        <td>${vet.apellido}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info editar"  data-bs-toggle="modal" data-bs-target="#ModalForm" onclick="editarMascota(${index})"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn btn-danger" onclick="eliminarMascota(${index})" ><i class="fas fa-trash-alt"></i></button>
            </div>
        </td>
    </tr>`).join("");

    listaVeterinarios.innerHTML = htmlVeterinarios;
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
            veterinarios[indice.value] = datos;
            break;
        default:
            veterinarios.push(datos);
            break;
    }

    listarVeterionarios();
    
}

function editarMascota(index){

    btnGuardar.innerHTML = "Editar";

    const vet = veterinarios[index];
    pais.value = vet.pais;
    identificacion.value = vet.identificacion;
    nombre.value = vet.nombre;
    apellido.value = vet.apellido;
    indice.value = index;
}

function eliminarMascota(index){
    veterinarios = veterinarios.filter( (vet, indiceVet) => indiceVet !== index);
    listarVeterionarios();
}

function resetModal(){
    
    pais.value = "";
    identificacion.value = "";
    nombre.value = "";
    apellido.value = "";
    indice.value = "";
    
    btnGuardar.innerHTML = "Crear";
}

listarVeterionarios();
form.onsubmit  = enviarDatos;
btnGuardar.onclick = enviarDatos;
btnNuevo.onclick = resetModal;