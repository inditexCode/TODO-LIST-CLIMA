const fecha = document.getElementById('fecha')
const lista = document.getElementById('lista')
const input = document.getElementById('input')
const botonEnter = document.getElementById('enter')
const check = 'bi bi-check-circle';
const uncheck = 'bi bi-circle';
const lineThrough = 'line-through'
let id
let listaArray
//---------------------------clima-------------------
let urlBase = 'https://api.openweathermap.org/data/2.5/weather';
let api_key = 'c8543f44e9c1d72543b4282bf2b07284';
let diKelvin = 273.15;
let botonBusqueda = document.getElementById('botonBusqueda')
let ciudadEntrada = document.getElementById('ciudadEntrada')

botonBusqueda.addEventListener('click',() =>{
    const ciudad = ciudadEntrada.value ;
    if(ciudad){
      fetchDatosClima(ciudad)
    }else{

    }
});

function fetchDatosClima(ciudad){
    fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
    .then(response =>{
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => mostrarDatosClima(data))
    .catch(error =>{
        console.error('Error:', error);
        mostrarMensajeError('Por favor ingrese una ciudad o país correcto')
    });
    }
//--------------clckk en cualquier parte de la pantalla--------------------------------------------
    document.addEventListener('click', (event) => {
        const divDatoClima = document.getElementById('datosClima');
    
        // Verificar si el clic fue dentro del área de datos del clima
        if (!divDatoClima.contains(event.target)) {
            // Ocultar los datos del clima
            divDatoClima.style.display = 'none';
            
        // Limpiar el valor del input
        ciudadEntrada.value = '';
        }
        
    });

    function mostrarDatosClima(data){
        console.log(data)
        const divDatoClima = document.getElementById('datosClima');
        divDatoClima.innerHTML = ''
        divDatoClima.style.display = 'block';

        const ciudadNombre = data.name
        const pais = data.sys.country
        const temperatura = data.main.temp
        const temperaturamax = data.main.temp_max
        const temperaturamin = data.main.temp_min
        const humedad = data.main.humidity;
        const sensaciontermica = data.main.feels_like
        const presion = data.main.pressure;        
        const descripcion = data.weather[0].description;
        const visibilidad = data.visibility
        const icono = data.weather[0].icon;
   


        const ciudadTitulo = document.createElement('h2')
        ciudadTitulo.textContent = ciudadNombre

         
        const paisNombre = document.createElement('h2')
        paisNombre.textContent = pais

        const temperaturaInfo = document.createElement('p')
        temperaturaInfo.textContent = `La temperatura es: ${Math.floor(temperatura-diKelvin)}°C`

        const temperaturaInfo1 = document.createElement('p')
        temperaturaInfo1.textContent = `Temp. max: ${Math.floor(temperaturamax-diKelvin)}°C`

        const temperaturaInfo2 = document.createElement('p')
        temperaturaInfo2.textContent = `Temp. min: ${Math.floor(temperaturamin-diKelvin)}°C`

        const humedadInfo = document.createElement('p')
        humedadInfo.textContent = `Humedad: ${humedad}%`

        const sensacionInfo = document.createElement('p')
        sensacionInfo.textContent = `Sens.  térmica: ${Math.floor(sensaciontermica-diKelvin)}°`

        const presionInfo = document.createElement('p')       
        presionInfo.textContent = `Pres. atmosférica ${presion} hPa`

        const iconoInfo = document.createElement('img');
        iconoInfo.src = `https://openweathermap.org/img/wn/${icono}@2x.png`;
        iconoInfo.classList.add('claseIcono'); 
       

        const descripcionInfo = document.createElement('p')
        descripcionInfo.textContent = `Descrip. metereológica: ${descripcion}`
        descripcionInfo.classList.add('claseDescripcion');
 
    
        const visibilidadInfo = document.createElement('p')
        visibilidadInfo.textContent = `Visibilidad: ${visibilidad} metros`;
        visibilidadInfo.classList.add('claseVisibilidad')

       divDatoClima.appendChild(ciudadTitulo)
       divDatoClima.appendChild(paisNombre)
       divDatoClima.appendChild(temperaturaInfo)
       divDatoClima.appendChild(temperaturaInfo1)
       divDatoClima.appendChild(temperaturaInfo2)
       divDatoClima.appendChild(humedadInfo)
       divDatoClima.appendChild(sensacionInfo)
       divDatoClima.appendChild(presionInfo)
       divDatoClima.appendChild(iconoInfo);
       divDatoClima.appendChild(descripcionInfo)
       divDatoClima.appendChild(visibilidadInfo)
      
    }
// clima---------------------------------------------------------------

// Función para actualizar la hora
function actualizarHora() {
    const FECHA_ACTUALIZADA = new Date();
    const fechaContenedor = document.getElementById('fecha');
    fechaContenedor.innerHTML = `<div class="fechaContenedor">${FECHA_ACTUALIZADA.toLocaleDateString('es-ES', { weekday: 'long', month: 'short', day: 'numeric' })}</div><div class="horaContenedor">${FECHA_ACTUALIZADA.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>`;
    
}
setInterval(actualizarHora, 1000);
//creacion de fecha 
const FECHA = new Date()

function agregarTarea(tarea,id,realizado,eliminado){
    if(eliminado){return}
           const REALIZADO = realizado ?check:uncheck
           const LINE = realizado ?lineThrough:''
     const elemento = `<li id="elemento">
                        <i class="bi ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="bi bi-trash" data="eliminado" id="${id}"></i>

                         </li>`
        lista.insertAdjacentHTML("beforeend", elemento)

}

//tarea realizada--------------------
function tareaRalizada(element){
    element.classList.toggle('bi-check-circle');
    element.classList.toggle('bi-circle');
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    listaArray[element.id].realizado = listaArray[element.id].realizado ? false:true
}

//tarea eliminada--------------------
function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    listaArray[element.id].eliminado = true
}


// agrega tarea--------------------
botonEnter.addEventListener('click',()=>{
    const tarea = input.value 
    if(tarea){
        agregarTarea(tarea,id,false,false)
        listaArray.push({
            nombre:tarea,
            id:id,
            realizado:false,
            eliminado:false
        })
    }
    localStorage.setItem('TODO',JSON.stringify(listaArray))
    input.value = ''
    id++;
})
document.addEventListener('keyup',function(event){
    if(event.key== 'Enter'){
        const tarea = input.value
        if(tarea){
            agregarTarea(tarea,id,false,false)
            listaArray.push({
                nombre:tarea,
                id:id,
                realizado:false,
                eliminado:false
            })
        }
        localStorage.setItem('TODO',JSON.stringify(listaArray))
        input.value = ''
        id++;
    }
})


lista.addEventListener('click',function(event){
    const element = event.target
    const elementData = element.attributes.data.value
    if(elementData==='realizado'){
        tareaRalizada(element)
    }
    else if(elementData==='eliminado'){
        tareaEliminada(element)
    }
    localStorage.setItem('TODO',JSON.stringify(listaArray))
})

// localStorage get item
let data = localStorage.getItem('TODO')
if(data){
    listaArray=JSON.parse(data)
    id = listaArray.length 
    cargarListas(listaArray)

}else{
    listaArray = []
    id = 0
}
function cargarListas(data){
    data.forEach(function(i){
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
    });
}
//--------------------------------------------------------------------
