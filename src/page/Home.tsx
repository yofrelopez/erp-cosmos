import { AuthContext } from "../context/auth/AuthContext"
import { useContext } from "react"






const HomePage = () => {



  const { isLoggedIn, cerrarSesion } = useContext(AuthContext)

  const logout = () => {
    cerrarSesion()
  }

  

  return (
    <>
      <div className="d-flex flex-grow-1 justify-content-center align-items-center" style={{'height':'100vh'}}>
          <div className="d-flex flex-column align-items-center" >
            <h1>Home</h1>
            <button className="btn btn-outline-primary" onClick={logout} >Logout</button>
            <p>¿Estas logueado? {JSON.stringify(isLoggedIn)}</p>

          </div>



      </div>
    
    </>
  )
}

export default HomePage