import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente"

const ListaPacientes = () => {

  const { pacientes } = usePacientes()

  return (
    <>
      { pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Lista de pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
              Administra tus {""}
              <span className="text-indigo-600 font-bold">Citas y Pacientes</span>
          </p>
          { pacientes.map( paciente => (
              <Paciente 
                 key = {paciente._id}
                 paciente = {paciente}
              />
          ))}
        </>

      ) : (
        <>
            <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Comienza agregando pacientes {""}
                <span className="text-indigo-600 font-bold">Aparecerán es este lugar</span>
            </p>
        </>
      ) }
    </>
  )
}

export default ListaPacientes