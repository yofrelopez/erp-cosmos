
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { useNavigate } from 'react-router-dom';



const LoginPage: React.FC = () => {

  const { autenticarUsuario, isLoggedIn } = useContext(AuthContext)

  const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   

    // conectarse con supabase

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        autenticarUsuario(email, password)  
          
    }

     useEffect(() => {
      if( isLoggedIn ){ 
            navigate('/')
        }


    }, [isLoggedIn])
       




  return (
    <div>

      <div className="form-signin w-100 m-auto">
          <form onSubmit={handleSubmit}>
              <img className="mb-4" src="/logo_2.png" alt="" width="110" height="57" />
              <h1 className="h3 mb-3 fw-normal">Please Login</h1>

              <div className="form-floating">

              <input type="email" className="form-control" id="floatingInput"
              placeholder="name@example.com"
              name='email'
              onChange={e => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
              </div>


              <div className="form-floating">

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