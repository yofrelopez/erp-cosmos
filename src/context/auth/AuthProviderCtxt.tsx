
import { FC, ReactNode, useState } from "react"
import { AuthContext } from "./AuthContext"
import { useNavigate } from 'react-router-dom';
import { supabase } from "../../supabase/client";





interface Props {
    children: ReactNode;
}


const AuthProviderCtxt:FC<Props> = ({children}) => {

    const navigate = useNavigate()

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    const [userId, setUserId] = useState<string | null | undefined>(null)




    const autenticarUsuario = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
              });
              if (error) {
                throw error
              }
            setUserId(data?.user?.id)
            setIsLoggedIn(true)
            console.log(data, 'error', error)
            return true

        } catch (error) {
            console.log(error)
            return false
        }
    }

    const cerrarSesion = async () : Promise<boolean> => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) {
                throw error
            }
            setIsLoggedIn(false)
            setUserId(null)
            navigate('/login')
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const escucharCambioSesion = () => {

        const { data: authListener  } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                setIsLoggedIn(true)
                setUserId(session?.user?.id)
                /* navigate('/') */

            }
            if (event === 'SIGNED_OUT') {
                setIsLoggedIn(false)
                setUserId(null)
                navigate('/login')

            }
        })

        return () => {
            authListener?.subscription.unsubscribe()
        }
    }


    






  return (
    <AuthContext.Provider value={{isLoggedIn, autenticarUsuario, userId, cerrarSesion, escucharCambioSesion}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProviderCtxt