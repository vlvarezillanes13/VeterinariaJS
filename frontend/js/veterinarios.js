let listaVeterinarios = document.getElementById("lista-veterinarios");

let nombre = document.getElementById("nombre");
let documento = document.getElementById("documento");
let apellido = document.getElementById("apellido");
let indice = document.getElementById("indice");
let form = document.getElementById("form");

const urlV = "http://127.0.0.1:4000/veterinarios";
let btnGuardar = document.getElementById("btn-guardar");
let btnNuevo = document.getElementById("btn-nuevo");

let veterinarios = [];

async function listarVeterionarios(){
    try{
        const resp = await fetch(urlV);
        const veterinariosServer = await resp.json();

        if(Array.isArray(veterinariosServer) ){ 
            veterinarios = veterinariosServer;
        }

        if(veterinariosServer.length > 0){
            const htmlVeterinarios = veterinarios.map((vet, index) => `<tr>
                <th scope="row">${index + 1}</th>
                <td>${vet.documento}</td>
                <td>${vet.nombre}</td>
                <td>${vet.apellido}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-info editar"  data-bs-toggle="modal" data-bs-target="#ModalForm" onclick="editarVeterinario(${index})"><i class="fas fa-edit"></i></button>
                        <button type="button" class="btn btn-danger" onclick="eliminarVeterinario(${index})" ><i class="fas fa-trash-alt"></i></button>
                    </div>
                </td>
            </tr>`).join("");

            listaVeterinarios.innerHTML = htmlVeterinarios;
            //Array.from(document.getElementsByClassName('editar')).forEach((botonEditar,index) => botonEditar.onclick = editar(index));
            return;
        }else{
            listaVeterinarios.innerHTML =  `<tr>
                <td colspan = "5" style="text-align : center;" > No hay veterinarios </td>
            </tr>`;
        }
    }catch(error){
        console.log(error);
        document.getElementsByClassName("alert")[0].classList.add('show');
        document.getElementsByClassName("alert")[0].style.display="block";
    }
}

async function enviarDatos(e){
    try{
        e.preventDefault();
        const datos = {
            nombre:nombre.value,
            apellido:apellido.value,
            documento:documento.value
        };
        const accion = btnGuardar.innerHTML;
        let urlEnvio = urlV ;
        let method = 'POST';
        if(accion == "Editar"){
                urlEnvio += `/${indice.value}`;
                method = 'PUT';
        }
        const respuesta = await fetch(urlEnvio,{
            method,
            headers:{
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(datos),
        })

        if( respuesta.ok ){
            listarVeterionarios();
        }
    }catch(error){
        console.log(error);
        document.getElementsByClassName("alert")[0].classList.add('show');
        document.getElementsByClassName("alert")[0].style.display="block";
    }    
}

function editarVeterinario(index){

    btnGuardar.innerHTML = "Editar";

    const vet = veterinarios[index];
    documento.value = vet.documento;
    nombre.value = vet.nombre;
    apellido.value = vet.apellido;
    indice.value = index;
}

async function eliminarVeterinario(index){
    const urlEnvio = `${urlV}/${index}`
    console.log(urlEnvio);
    try {
        const respuesta = await fetch(urlEnvio,{
        method:'DELETE',
        })
        if( respuesta.ok ){
            listaVeterinarios();
        }
    } catch (error) {
        document.getElementsByClassName("alert")[0].classList.add('show');
        document.getElementsByClassName("alert")[0].style.display="block";
    }
}

function resetModal(){
    
    documento.value = "";
    nombre.value = "";
    apellido.value = "";
    indice.value = "";
    
    btnGuardar.innerHTML = "Crear";
}

listarVeterionarios();
form.onsubmit  = enviarDatos;
btnGuardar.onclick = enviarDatos;
btnNuevo.onclick = resetModal;