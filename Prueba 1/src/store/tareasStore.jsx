import { create } from "zustand";
import { persist } from "zustand/middleware";

const tareasIniciales = [
  { id: 0, titulo: "Tarea0", prioridad: "Alta", hecha: false },
  { id: 1, titulo: "Tarea1", prioridad: "Alta", hecha: true },
  { id: 2, titulo: "Tarea2", prioridad: "Media", hecha: false },
  { id: 3, titulo: "Tarea3", prioridad: "Baja", hecha: true },
  { id: 4, titulo: "Tarea4", prioridad: "Baja", hecha: false },
];

export const useTareasStore = create(
  persist(
    (set) => ({
      tareas: tareasIniciales,
      filtro: "",
      filtroPrio: "",
      filtroHecho: "none",

      setFiltro: (valor) => set({ filtro: valor }),
      setFiltroPrio: (valor) => set({ filtroPrio: valor }),
      setFiltroHecho: (valor) => set({ filtroHecho: valor }),

      agregarTarea: (titulo, prioridad) =>
        set((state) => {
          const newId =
            state.tareas.length > 0
              ? state.tareas[state.tareas.length - 1].id + 1
              : 0;

          const nuevaTarea = {
            id: newId,
            titulo,
            prioridad,
            hecha: false,
          };

          return { tareas: [...state.tareas, nuevaTarea] };
        }),

      cambiarTarea: (id) =>
        set((state) => ({
          tareas: state.tareas.map((t) =>
            t.id === id ? { ...t, hecha: !t.hecha } : t
          ),
        })),

      eliminarTarea: (id) =>
        set((state) => ({
          tareas: state.tareas.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "tareas-storage",
    }
  )
);