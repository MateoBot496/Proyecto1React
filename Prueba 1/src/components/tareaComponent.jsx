export default function TareaComponent({tareas, tarea, setTareas}){
    const handleCambiarEstado = (id) => {
        setTareas(
            prevTareas =>
                prevTareas.map( pt => {
                    if (pt.id == id) return {...pt, hecha: !pt.hecha}
                    return pt
                }
                     
                )
        )
    
    }


    const handleEliminar = (id) => {

        setTareas(tareas.filter(t => t.id !== id));
    }
   return(

          <div className='tareaCard' key={tarea.id}>
            <p>Tarea id: {tarea.id}</p> 
            <p>Titulo: {tarea.titulo}</p>
            <p>Prioridad: {tarea.prioridad}</p>
            <p> {tarea.hecha? ("Hecha") : ("No hecha") }</p>
            <button onClick={() => handleCambiarEstado(tarea.id)}>Cambiar estado</button>
            <button onClick={() => handleEliminar(tarea.id)}>Eliminar</button>
            
          
          </div>
    );
}