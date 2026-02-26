import TareaComponent from "./tareaComponent";

export default function TareaList({tareas, setTareas}){


    
      
    return (
    <div className="tareaList">
        {
            tareas.map(tarea =>  
                
                
                
                    <TareaComponent key={tarea.id} tareas={tareas} tarea={tarea} setTareas={setTareas}/>
                
                
            )
        }
    </div>
    )
}