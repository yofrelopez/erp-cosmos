
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ListaDeProductos, getPreciosProductos } from '../utils/funcionesSupabase';
import { TarifarioContext } from '../context/tarifarioContext/TarifarioContext';
import { PreciosMoldurasProps } from '../context/tarifarioContext/TarifarioProvider';




const LoginPage: React.FC = () => {

  const { autenticarUsuario, isLoggedIn } = useContext(AuthContext)
  const { setListaProductos, listaProductos, setListaPreciosMolduras,
    listaPreciosMolduras, listaPreciosAglomerados, setListaPreciosAglomerados } = useContext(TarifarioContext)

  const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [tempMolduras, setTempMolduras] = useState<ListaDeProductos[] | null>(null)
    const [tempAglomerados, setTempAglomerados] = useState<ListaDeProductos[] | null>(null)
   

    // conectarse con supabase

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        autenticarUsuario(email, password)  
          
    }

     useEffect(() => {
      if( isLoggedIn ){ 
        // obtener lista de productos con la función getPreciosProductos de funcionesSupabase.ts

        const getListaProductos = async () => {
            try {
                const obtenerListaProductos = await getPreciosProductos();
                console.log('Lista de Productos:', obtenerListaProductos)
                if(obtenerListaProductos !== null) {
                  setListaProductos(obtenerListaProductos);
                }
            } catch (error) {
                console.log('Error en getListaProductos:', error);
            }
        }
        getListaProductos();        
      }

     }, [isLoggedIn])




     // extraer lista de precios de molduras y aglomerados de listaProductos
     // moplduras = 5

     useEffect(() => {
      if( listaProductos !== null && isLoggedIn ){
        const soloArreglodeMolduras = listaProductos.filter( producto => producto.categoria == '5');
        console.log('Solo Lista de Precios de Molduras:', soloArreglodeMolduras);
        setTempMolduras(soloArreglodeMolduras);
      }
     }, [listaProductos, isLoggedIn])


     useEffect(() => {
          if( tempMolduras !== null && isLoggedIn){
          // extraer con reduce() los precios de molduras y el code de cada moldura
          const preciosMolduras = tempMolduras?.reduce((acc, item) => {
            return {...acc, [item.code]: item.venta}
          }, {} as PreciosMoldurasProps)
          setListaPreciosMolduras(preciosMolduras);          
        }

      }, [tempMolduras, isLoggedIn])

      // Aglomerados = 6

      useEffect(() => {
        if( listaProductos !== null && isLoggedIn ){
          const soloArreglodeAglomerados = listaProductos.filter( producto => producto.categoria == '6');
          console.log('Solo Lista de Precios de Aglomerados:', soloArreglodeAglomerados);
          setTempAglomerados(soloArreglodeAglomerados);
        }
      }, [listaProductos, isLoggedIn])

      useEffect(() => {
        if( tempAglomerados !== null && isLoggedIn){
          // extraer con reduce() los precios de aglomerados y el code de cada aglomerado
          const preciosAglomerados = tempAglomerados?.reduce((acc, item) => {
            return {...acc, [item.code]: item.venta}
          }, {} as PreciosMoldurasProps)
          setListaPreciosAglomerados(preciosAglomerados);          
        }

      }, [tempAglomerados, isLoggedIn])



      useEffect(() => {
        if( listaPreciosMolduras !== null && listaPreciosAglomerados !== null && isLoggedIn ){
          console.log('Lista de Precios de Molduras:', listaPreciosMolduras)
          console.log('Lista de Precios de Aglomerados:', listaPreciosAglomerados)
          navigate('/')
        }
      } , [listaPreciosMolduras, isLoggedIn])






  return (
    <div>

      <div className="form-signin container pt-4 d-flex align-item-center justify-content-center w-50">
          <form onSubmit={handleSubmit} className='pt4 w-100'>
            <div className='d-flex justify-content-center'>
              <img className="mb-4" src="/logo_2.png" alt="" width="110" height="57" />
            </div>

              <h1 className="h3 mb-3 fw-normal">Please Login</h1>

              <div className="form-floating pb-2">

                <input type="email" className="form-control" id="floatingInput"
                placeholder="name@example.com"
                name='email'
                onChange={e => setEmail(e.target.value)}
                />

                
                <label htmlFor="floatingInput">Email address</label>
                </div>


              <div className="form-floating pb-2">

              <input type="password" className="form-control"
              id="floatingPassword"
              onChange={e => setPassword(e.target.value)}
              name='password'
              placeholder="Password"
              />
              
              <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="checkbox mb-3">
              <label>
                  <input type="checkbox" value="remember-me" /> Remember me
              </label>
              </div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
              <p className="mt-5 mb-3 text-body-secondary">© 2017-2023</p>
          </form>
      </div>
    </div>

  )
}

export default LoginPage