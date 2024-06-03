
import { Routes, Route } from 'react-router-dom';
import HomePage from './page/Home';
import LoginPage from './page/LoginPage';
import NotFound from './page/NotFound';
import TarifarioPage from './page/Tarifario';
import AuthProviderCtxt from './context/auth/AuthProviderCtxt';
import CrudProviderCtxt from './context/crud/CrudProvider';
import CartProviderCtxt from './context/cart/CartProvider';
import ClienteProvider from './context/cliente/ClienteProvider';
import Vidrios from './page/Vidrios';
import VidriosProviderContext from './context/vidrios/VidriosProvider';

import './App.css';
import Sidebar from './components/ui/Sidebar';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import Cuadros from './page/Cuadros';
import CuadrosProviderContext from './context/cuadros/CuadrosProvider';
import Cart from './page/Cart';
import OrdenProvider from './context/invoice/OrdenProvider';
import ListaCotizaciones from './components/cotizaciones/ListaCotizaciones';
import FormVS from './components/ventaServicios/FormVS';
import TarifarioProvider from './context/tarifarioContext/TarifarioProvider';




function App() {


  return (
    <div>


      <div>
        <AuthProviderCtxt>
          <CrudProviderCtxt>
           <TarifarioProvider>
            <VidriosProviderContext>
              <CuadrosProviderContext>
                <CartProviderCtxt>
                  <ClienteProvider>
                    <OrdenProvider>


                      <Sidebar>

                      
                      <Routes>
                        <Route path="/" element={
                          <PrivateRoute>
                            <HomePage />
                          </PrivateRoute>

                        } />
                        <Route path="/login" element={<LoginPage />} />

                        <Route path="/tarifario" element={
                          <PrivateRoute>
                            <TarifarioPage />
                          </PrivateRoute>
                        }/> 

                        <Route path="/ventaservicios" element={<FormVS />} /> 

                        <Route path="/vidrios" element={
                          <PrivateRoute>
                            <Vidrios />
                          </PrivateRoute>
                        } />  

                        <Route path="/carrito" element={<Cart />} />

                        <Route path="/cuadros" element={
                          <PrivateRoute>
                            <Cuadros />
                          </PrivateRoute>
                        } />
                        <Route path="/lista_cotizaciones" element={<ListaCotizaciones/>} />
                        <Route path="/*" element={<NotFound />} />

                      </Routes>



                      </Sidebar>
                    
                    </OrdenProvider>
                  </ClienteProvider>      
                </CartProviderCtxt>
              </CuadrosProviderContext>                    
            </VidriosProviderContext>
            </TarifarioProvider>
          </CrudProviderCtxt>
        </AuthProviderCtxt>
      </div>


  </div>
  )
}

export default App
