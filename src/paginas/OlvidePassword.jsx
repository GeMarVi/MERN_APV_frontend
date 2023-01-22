import { Link } from 'react-router-dom'
import { useState } from 'react'
import clienteAxios from '../config/Axios'
import Alerta from '../components/Alerta'


const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
     e.preventDefault()

     if(email === '' || email.length < 5 || !email.indexOf('@')){
        setAlerta({
          msg: 'El mail es obligatorio',
          error : true
        })
        return
     }

     try {
        const { data } = await clienteAxios.post('/veterinarios/olvide-password',{ email })
        console.log(data)
        setAlerta({ msg: data.msg })
     } catch (error) {
        setAlerta({
          msg : error.response.data.msg,
          error : true
        })
     }
  }
  
  const { msg } = alerta

  return (
    <>
      
          <div>
             <h1 className="text-indigo-600 font-black text-6xl">Restablece tu contraseña e <span className="text-black">Inicia sesión</span> </h1>
          </div>

          <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {msg && <Alerta
                 alerta={alerta}
                />}
             <form onSubmit={handleSubmit}>

               <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                  <input 
                   type="email" 
                   placeholder="Email de registro" 
                   className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                   value={email}
                   onChange={ e => setEmail(e.target.value)}
                   />
               </div>
              
               <input type="submit" value="Siguiente" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />

             </form>

             <nav className='mt-10 lg:flex lg:justify-between'>
               <Link to="/registrar" className='block text-center my-5 text-gray-500'>¿No tienes una cuenta? Régistrate</Link>
               <Link to="/" className='block text-center my-5 text-gray-500'>Inicia Sesión</Link>
             </nav>

          </div>
          
    </>
  )
}

export default OlvidePassword
