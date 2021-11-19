let listaMascotas = document.getElementById("lista-mascotas");
let tipo = document.getElementById("tipo");
let nombre = document.getElementById("nombre");
let dueno = document.getElementById("dueno");
let indice = document.getElementById("indice");
let form = document.getElementById("form");

let btnGuardar = document.getElementById("btn-guardar");
let btnNuevo = document.getElementById("btn-nuevo");

const url = "http://127.0.0.1:4000/mascotas";

let mascotas = [];

async function listarMascotas(){
    try{
        const resp = await fetch(url);
        const mascotasServer = await resp.json();

        if(Array.isArray(mascotasServer) ){ 
            mascotas = mascotasServer;
        }
        if(mascotasServer.length > 0){
            const htmlMascotas = mascotas.map((mascota, index) => `<tr>
                <th scope="row">${index + 1}</th>
                <td>${mascota.tipo}</td>
                <td>${mascota.nombre}</td>
                <td>${mascota.dueno}</td>
                <td>
                    <button type="button" class="btn btn-info editar"  data-bs-toggle="modal" data-bs-target="#ModalForm" onclick="editarMascota(${index})"><i class="fas fa-edit"></i></button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="eliminarMascota(${index})" ><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>`).join("");
            listaMascotas.innerHTML = htmlMascotas;
            return;
        }

        const htmlMascotas = `<tr>
            <td colspan = "5" style="text-align : center;" > No hay mascotas </td>
        </tr>`

        listaMascotas.innerHTML = htmlMascotas;
        //Array.from(document.getElementsByClassName('editar')).forEach((botonEditar,index) => botonEditar.onclick = editar(index));

    }catch(error){
        document.getElementsByClassName("alert")[0].classList.add('show');
        document.getElementsByClassName("alert")[0].style.display="block";
    }
}

async function enviarDatos(e){ 
    try {
        e.preventDefault();
        const datos = {
            tipo:tipo.value,
            nombre:nombre.value,
            dueno:dueno.value
        };
        const accion = btnGuardar.innerHTML;
        let method = 'POST';
        let urlEnvio = url;
        if( accion == "Editar"){
            method = 'PUT';
            //mascotas[indice.value] = datos;
            urlEnvio = `${url}/${indice.value}`;
        }
    
        const respuesta = await fetch(urlEnvio,{
        method,
        headers:{
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(datos),
        })
    
        if( respuesta.ok ){
            listarMascotas();
        }
    } catch (error) {
        document.getElementsByClassName("alert")[0].classList.add('show');
        document.getElementsByClassName("alert")[0].style.display="block";
    }
}

function editarMascota(index){

    btnGuardar.innerHTML = "Editar";
    const mascota = mascotas[index];
    dueno.value = mascota.dueno;
    nombre.value = mascota.nombre;
    tipo.value = mascota.tipo;

    indice.value = index;
}

async function eliminarMascota(index){
    const urlEnvio = `${url}/${index}`;
    //console.log(urlEnvio);
    try {
        const respuesta = await fetch(urlEnvio,{
        method:'DELETE',
        })
        if( respuesta.ok ){
            listarMascotas();
        }else{
            console.log("aaaa");
        }
    } catch (error) {
        document.getElementsByClassName("alert")[0].classList.add('show');
        document.getElementsByClassName("alert")[0].style.display="block";
    }
    //mascotas = mascotas.filter( (_mascota, indiceMascota) => indiceMascota !== index);
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