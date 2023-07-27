import { motion } from "framer-motion"
import { FC } from "react"
import { Link } from "react-router-dom"
import { RUTAS } from "./rutas"
/* import {BiSearch} from 'react-icons/bi' */




interface SidebarProps {
    children: React.ReactNode
}


const Sidebar:FC<SidebarProps> = ({children}) => {
  return (
    <div className="main-container">
        <motion.div
            animate={{ minWidth : '200px'}}
            className="sidebar"        
        >
            <section>

                <div className="d-flex justify-content-center py-4" >
                    <img src="/logo_2.png" alt="logo" style={{'maxWidth':'100px'}} />
                </div>

                <hr />

                {/* <div className="search">
                    <div className="search_icon">
                        <BiSearch />
                    </div>
                    <input placeholder="Buscar..." />
                </div> */}

                <div className="rutas ms-4">
                    {
                        RUTAS?.map( ruta => (
                            <Link key={ruta.name} to={ruta.path} className="link" >
                                <div className="icon"> {ruta.icon} </div>
                                <div className="link-text">{ruta.name}</div>
                            </Link>
                        ))

                    }
                </div>

            </section>
        </motion.div>

        <main>
            {children}
        </main>

    </div>
  )
}

export default Sidebar