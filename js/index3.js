import {saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask, getUser , getTaskInsp, updateTask2 } from './firebase.js'


// capturar el div del index
const taskContainer = document.getElementById('task-container')
const taskContainerInspUp = document.getElementById('task-container-up2');



// para saber si esta editando
let editStatus = false;
// guardamos el id para poder editar
let id ='';

// fin de agragad datos al index
window.addEventListener('DOMContentLoaded',  async() => {
    // const datafomDB = await getTask();
    onGetTasks( (datafomDB) => {
        let html ='';
    // para ver todos los doc por consola
    datafomDB.forEach(doc => {
    var datosLibreta =doc.data();
        html +=`
      <div >
      
      </br>
      <h3 class="h5">N° de libreta : ${datosLibreta.LibIdentificador}</h3>
      <p> Categoria de libreta : ${datosLibreta.LibCategoria}</p>
      <p>Nombre del conductor : ${datosLibreta.LibName}</p>
      <p>Cedula del conductor : ${datosLibreta.LibCedula}</p>
      <p>Vencimiento de la libreta : ${datosLibreta.LibVto}</p>
      <p>Observaciones de la libreta : ${datosLibreta.LibObservaciones}</p>
      <p>Puntos de la libreta : ${datosLibreta.LibPuntos}</p>
      <p>Libreta habilitada : ${datosLibreta.LibStatus}</p>
      <br/>
      <button class='btn-delete' data-id="${doc.id}">Borrar</button>
      <button class='btn-Edit' data-id="${doc.id}">Actualizar</button>
      <div>
      </div>
    </div>`;
        
        console.log(doc.data());
        initIMG();
    });
    // borar datos

    // ingresar los datos
    taskContainer.innerHTML += html;
    // selecionar todos los botnes delete para borrar
    const btnDelete = taskContainer.querySelectorAll('.btn-delete')
    btnDelete.forEach(btn =>{
         btn.addEventListener('click', ({target:{dataset}})=> {
            deleteTask(dataset.id)
        })
    })
    

    // funcion para editar
 const btnsEdit = taskContainer.querySelectorAll('.btn-Edit')
 btnsEdit.forEach((btn) => {
     btn.addEventListener('click', async(e) =>{
         const doc = await getTask(e.target.dataset.id)
         moverEditData();
         const  task = doc.data()
         taskForm['Lib-Id'].value = task.LibIdentificador
         taskForm['Lib-Cat'].value = task.LibCategoria
         taskForm['Lib-Name'].value = task.LibName
         taskForm['Lib-Ced'].value = task.LibCedula
         taskForm['Lib-Vto'].value = task.LibVto
         taskForm['Lib-Obser'].value = task.LibObservaciones
         taskForm['Lib-Ptos'].value = task.LibPuntos
         taskForm['Lib-State'].value = task.LibStatus


         editStatus = true;
         id = e.target.dataset.id;

         // cambiar valor de btm save a update
            taskForm['btn-task-form'].innerText = 'UPDATE';
     } )
 })
 
});
})


// guardar datos
const taskForm= document.getElementById('task-form');
taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
   
    const LibIdentificador = document.getElementById("Lib-Id").value;
    const LibCategoria = document.getElementById('Lib-Cat').value;
     const LibName = document.getElementById('Lib-Name').value;
    const LibCedula = document.getElementById('Lib-Ced').value;
    const LibVto = document.getElementById('Lib-Vto').value;
    const LibObservaciones = document.getElementById('Lib-Obser').value;
    const LibPuntos = document.getElementById('Lib-Ptos').value;
    const LibStatus = document.getElementById('Lib-State').value;

    
    // concicion para ver si edita
     if (!editStatus){
       saveTask(LibIdentificador, LibCategoria, LibName, LibCedula, LibVto, LibObservaciones, LibPuntos, LibStatus);
    initIMG();
    moverGuarData();
    }else{ 
        updateTask(id, {LibIdentificador, LibCategoria, LibName, LibCedula, LibVto, LibObservaciones, LibPuntos, LibStatus})
        moverGuarData();
         editStatus = false;
    initIMG(); 
    }    
    initIMG();
    // resreto de datos de index.html
    taskForm.reset();
})

function initIMG(){
    document.getElementById("IMGdata").style.display="block";
};
function initIMG2(){
    document.getElementById("IMGdata2").style.display="block";
};


/* const SelectMultas = document.getElementById('SelectMultas');
SelectMultas.addEventListener('change', (e) => {
    e.preventDefault()
    const MultaValueInsp = document.getElementById('Multas').value;
    console.log("los puntos que le quita la multa seleccionada son: "+MultaValueInsp);
}) */

// function buscarConductor(){
    
   const  taskInspectorForm = document.getElementById("task-inspector-form");
taskInspectorForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const  IdBUsInsp =  document.getElementById('IdBUsInsp').value
    const IdBUsInspUPP = IdBUsInsp.toUpperCase();
    if(IdBUsInspUPP !=''){
        console.log("buscando conductor ...");
    console.log("Datos de libreta buscada : " +IdBUsInspUPP);
    const idLibretasSearch = searchLibretasInsp(IdBUsInspUPP);
    
    
    moverbuscarData();
    clear();
    idLibretasSearch;
    
    }else{
        console.log("falla");
    }
  
    
})
// }

function moverGuarData(){
    window.scrollTo(0, 3900);
}
function moverbuscarData(){
    window.scrollTo(0, 2200);
}
function moverEditData(){
    window.scrollTo(0, 1200);
}
function clear(){
    document.getElementById('IdBUsInsp').value ='';
}



function searchLibretasInsp(IdBUsInspUPP){
    onGetTasks( (datafomDB) => {
        let html3 ='';
    // para ver todos los doc por consola
    datafomDB.forEach(doc => {
    var datosLibreta =doc.data();
     
        
        console.log(doc.data());
        console.log("la data para buscar : " +doc.data());
        console.log("la data para buscar : " +datosLibreta.LibIdentificador);
        // prueba importar datos
        if(IdBUsInspUPP == datosLibreta.LibIdentificador ){
            console.log("Macht "+IdBUsInspUPP +" y "+ datosLibreta.LibIdentificador);
            html3 +=`
      <div >
      <h2> Datos del ispector xxxxx</h2>
      </br>
      <h3 class="h5">N° de libreta : ${datosLibreta.LibIdentificador}</h3>
      <p> Categoria de libreta : ${datosLibreta.LibCategoria}</p>
      <p>Nombre del conductor : ${datosLibreta.LibName}</p>
      <p>Cedula del conductor : ${datosLibreta.LibCedula}</p>
      <p>Vencimiento de la libreta : ${datosLibreta.LibVto}</p>
      <p>Observaciones de la libreta : ${datosLibreta.LibObservaciones}</p>
      <p>Puntos de la libreta : ${datosLibreta.LibPuntos}</p>
      <p>Libreta habilitada : ${datosLibreta.LibStatus}</p>
      <br/>
      
      <button class='btn-Edit-INs' data-id="${doc.id} onclick="actInsp();">Sancionar</button>
      <div>
      </div>
    </div>`;
    taskContainerInspUp.innerHTML += html3;

        }
        else{
            console.log("libreta no encontrada!! ")

        }
        initIMG();
    });
    // borar datos

    // ingresar los datos
    // taskContainerInspUp.innerHTML += html3;
    // select
});
}

// actualizar insp
function actInsp(){
        const SelectMultas = document.getElementById('SelectMultas');
        // var SelectMultasData = document.getElementById('SelectMultas2');
SelectMultas.addEventListener('change', (e) => {
    e.preventDefault()
    // const doc = await getTask(e.target.dataset.id)
    onGetTasks( (datafomDB) => {
    datafomDB.forEach(doc => {
        const  taskWithMulta = doc.data()
    const MultaValueInsp = document.getElementById('Multas').value;
    
    document.getElementById('SelectMultas2').innerHTML = "Le quitaremos : "+MultaValueInsp+ " Puntos a esta libreta ";
    console.log("los puntos que le quita la multa seleccionada son: "+MultaValueInsp);
    /* onGetTasks( (datafomDB) => {
    // para ver todos los doc por consola
    datafomDB.forEach(doc => {
    var datosLibretaMUlta =doc.data();*/

    const id = doc.id;
    const PtosConMulta = taskWithMulta.LibPuntos - MultaValueInsp;
    const LibIdentificador = taskWithMulta.LibIdentificador;
    const LibCategoria = taskWithMulta.LibCategoria
    const LibName = taskWithMulta.LibName
    const LibCedula = taskWithMulta.LibCedula
    const LibVto = taskWithMulta.LibVto
    const LibObservaciones = taskWithMulta.LibObservaciones
    const LibStatus = taskWithMulta.LibStatus;  
    const LibPuntos = PtosConMulta;
    console.log("aplicando multa : "+taskWithMulta.LibPuntos);
    console.log("La multa te ha dejado con :"+PtosConMulta+ " puntos");
    // let textCmulta = "La multa te ha dejado con :"+PtosConMulta+ " puntos"
    document.getElementById('QuitaDePuntos').innerHTML = "La multa te ha dejado con :"+PtosConMulta+ " puntos"; 
    // guardar datos
    updateTask(id, { LibIdentificador, LibCategoria, LibName, LibCedula, LibVto, LibObservaciones, LibPuntos, LibStatus});
    console.log(id+ " este es el id del archivo multado");
    console.log("los datos mezclados con db son : "+ LibIdentificador, LibCategoria, LibName, LibCedula, LibVto, LibObservaciones, LibPuntos, LibStatus);
}) 
    })
})
    }
// } 

    taskContainerInspUp.addEventListener('click', (e) => {
        e.preventDefault()
        console.log("multando ....")
        document.getElementById("SelectMultas").style.display="block";
        actInsp();
    })
    