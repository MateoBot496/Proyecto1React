import { useEffect, useMemo, useState } from 'react'
import './App.css'
import TareaList from './components/tareaList'

function App() {
  //VARIABLES
  //TAREAS
  const [tareas, setTareas] = useState(() => {
    const antiguasTareas = window.localStorage.getItem("tareas")
    if ( antiguasTareas ) {
      return JSON.parse(antiguasTareas)
    }
    return [{id: 0, titulo: "Tarea0", prioridad: "Alta", hecha: false},
    {id: 1, titulo: "Tarea1", prioridad: "Alta", hecha: true},
    {id: 2, titulo: "Tarea2", prioridad: "Media", hecha: false},
    {id: 3, titulo: "Tarea3", prioridad: "Baja", hecha: true},
    {id: 4, titulo: "Tarea4", prioridad: "Baja", hecha: false}] 
  }
  
)
  //FILTROS
  const [filtro, setFiltro] = useState(() => {
    const antiguoFiltro = window.localStorage.getItem("filtro")
    if(antiguoFiltro){
      return JSON.parse(antiguoFiltro)
    }
    return ""
  })
  const [filtroPrio, setFiltroPrio] = useState(() => {
    const antiguoFiltro = window.localStorage.getItem("filtroPrio")
    if(antiguoFiltro){
      return JSON.parse(antiguoFiltro)
    }
    return ""
  })
  const [filtroHecho, setFiltroHecho] = useState(() => {
    const antiguoFiltro = window.localStorage.getItem("filtroHecho")
    if(antiguoFiltro){
      return JSON.parse(antiguoFiltro)
    }
    return ""
  })

  //FORM AñADIR TAREA
  const [titulo, setTitulo] = useState("")
  const [prioridad, setPrioridad] = useState("")

  //TAREAS FILTRADAS
  const tareasFiltradas = useMemo(() => {
    if (filtroHecho != "none"){
        return tareas.filter( t => t.titulo.includes(filtro) && t.prioridad.includes(filtroPrio) && t.hecha == filtroHecho )
        
      }else{
          return tareas.filter( t => t.titulo.includes(filtro) && t.prioridad.includes(filtroPrio))
          
      }
  }, [filtro, filtroPrio, filtroHecho, tareas])

  const handleSubmit = () =>{
    
    const newId = tareas[tareas.length -1].id +1;
    const newTitulo = titulo;
    const newPrioridad = prioridad;
    const nuevaTarea = {id: newId, titulo: newTitulo, prioridad: newPrioridad, hecha: false};
    
    setTareas(tareas => [...tareas, nuevaTarea]);
  }

  //ALMACENAR VARIABLES EN LOCALSTORAGE

  useEffect( () => {
    window.localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas])
  useEffect( () => {
    window.localStorage.setItem("filtro", JSON.stringify(filtro));
  }, [filtro])
  useEffect( () => {
    window.localStorage.setItem("filtroPrio", JSON.stringify(filtroPrio));
  }, [filtroPrio])
  useEffect( () => {
    window.localStorage.setItem("filtroHecho", JSON.stringify(filtroHecho));
  }, [filtroHecho])






  return (
    <div className='main'>
      <form action="" className='formulario'>
        Formulario de tareas
        <input type="text" placeholder='titulo' value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
        <input type="text" 
        placeholder='Prioridad: alta|media|baja' 
        value={prioridad}
        onChange={(e) => setPrioridad(e.target.value)} />
        
      </form>
      <button onClick={() => handleSubmit()}>Añadir tarea</button>

      
      <input type="text" placeholder='Filtro por titulo' value={filtro} onChange={(e)=>setFiltro(e.target.value)}/>
      <input type="text" placeholder='Filtro por prioridad (Alta...)' value={filtroPrio} onChange={(e)=>setFiltroPrio(e.target.value)}/>
      <select onChange={(e) => setFiltroHecho(e.target.value)} value={filtroHecho}>
        <option value="none"> Sin filtro </option>
        <option value="0"> No hechas </option>
        <option value="1"> Hechas </option>
      </select>
        <TareaList tareas = {tareasFiltradas} setTareas={setTareas}/>
      
    </div>
  )
}

export default App
