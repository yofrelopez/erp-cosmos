import { Navigate } from 'react-router-dom'
import { FC, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';


interface PrivateRouteProps {
  children: JSX.Element
}

const PrivateRoute:FC<PrivateRouteProps> = ({ children }) => {

  const { escucharCambioSesion, isLoggedIn } = useContext(AuthContext)


  useEffect(() => {

    escucharCambioSesion()
    
  }, [])


  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }


  return children
}

export default PrivateRoute

