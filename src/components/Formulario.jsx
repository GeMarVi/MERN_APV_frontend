import { useState, useEffect } from 'react'
import Alerta from './Alerta'
import usePacientes from '../hooks/usePacientes'

const Formulario = () => {


  const[nombre, setNombre] =useState("")
  const[propietario, setPropietario] =useState("")
  const[email, setEmail] =useState("")
  const[fecha, setFecha] =useState("")
  const[sintomas, setSintomas] =useState("")
  const [id, setId] = useState(null)
  
  const[alerta, setAlerta] =useState({})
 
  const { guardarPacientes, paciente } = usePacientes()
  
  useEffect( () => {
     if(paciente?.nombre){
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
        setId(paciente._id)
     }
  }, [paciente]);

  const handleSubmit = e => {
    e.preventDefault()
    //Validar el formulario
    if([nombre, propietario, email, fecha, sintomas].includes("")){
        setAlerta({
          msg: 'Todos los campos son obligatorios',
          error: true
        })
        return
    }

    guardarPacientes({nombre, propietario, email, fecha, sintomas, id})

    setAlerta({ msg:'Guardado correctamente' })

    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
    setId('')
  }

  const {msg} = alerta
  return (
    <>
         <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
              Agrega tus Pacientes y{""}
              <span className="text-indigo-600 font-bold">Administralos</span>
          </p>
          
       <form className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
             onSubmit={handleSubmit}
       >
           <div className="mb-5">
                <label
                  htmlFor="nombre"
                  className="uppercase text-gray-700 font-bold" 
                  >Nombre Mascota</label>
                <input 
                  type="text" 
                  id="nombre" 
                  placeholder="Nombre de la mascota" 
                  className="border-2 w-full p-2 mt-2 placeholder-gray rounded-md" 
                  value={nombre}
                  onChange={ e => setNombre(e.target.value)}
                  />
           </div> 
           
           <div className="mb-5">
                <label
                  htmlFor="propietario"
                  className="uppercase text-gray-700 font-bold" 
                  >Propietario</label>
                <input 
                  type="text" 
                  id="propietario" 
                  placeholder="Nombre del due??o" 
                  className="border-2 w-full p-2 mt-2 placeholder-gray rounded-md" 
                  value={propietario}
                  onChange={ e => setPropietario(e.target.value)}
                  />
           </div>

           <div className="mb-5">
                <label
                  htmlFor="email"
                  className="uppercase text-gray-700 font-bold" 
                  >Email</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Correo" 
                  className="border-2 w-full p-2 mt-2 placeholder-gray rounded-md" 
                  value={email}
                  onChange={ e => setEmail(e.target.value)}
                  />
           </div>

           <div className="mb-5">
                <label
                  htmlFor="fecha"
                  className="uppercase text-gray-700 font-bold" 
                  >Fecha de Alta</label>
                <input 
                  type="date" 
                  id="fecha" 
                  className="border-2 w-full p-2 mt-2 placeholder-gray rounded-md" 
                  value={fecha}
                  onChange={ e => setFecha(e.target.value)}
                  />
           </div>

           <div className="mb-5">
                <label
                  htmlFor="sintomas"
                  className="uppercase text-gray-700 font-bold" 
                  >Sintomas</label>
                <textarea 
                  id="sintomas" 
                  placeholder="Describe los sintomas de las mascota"
                  className="border-2 w-full p-2 mt-2 placeholder-gray rounded-md" 
                  value={sintomas}
                  onChange={ e => setSintomas(e.target.value)}
                  />
           </div>
           <input 
             type="submit" 
             value={ id ? "Guardar Cambios" : "Agregar Paciente"} 
             className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-poiter transition-colors" 
             />
       </form>
       {msg && <Alerta
              alerta={alerta}
           />}
    </>
  )
}

export default Formulario