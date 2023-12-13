
import { FC } from "react";
import { Link } from "react-router-dom";
import { RUTAS } from "./rutas";




interface SidebarProps {
    children: React.ReactNode
}


const Sidebar:FC<SidebarProps> = ({children}) => {


        return (
            <>

            <nav className="d-flex d-md-none navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">Cosmos</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                </div>
            </nav> 

            <div className="d-flex">

                <div>

                    <div className="sidebar d-none d-md-block min-vh-100 d-flex flex-column" style={{'minWidth':'180px'}} >

                        <div className="d-flex justify-content-center py-4">
                            <img src="/logo_2.png" alt="logo" style={{ maxWidth: "100px" }} />
                        </div>
                        <hr />
                        <div className="ms-2">
                            {RUTAS?.map((ruta) => (
                                <Link key={ruta.name} to={ruta.path} className="link">
                                    <div className="icon"> {ruta.icon} </div>
                                    <div className="link-text">{ruta.name}</div>
                                </Link>
                            ))}
                        </div>

                    </div>                                  

                </div>               



                <main className="flex-grow-1">

                    {children}
                
                </main>
                
            </div>


            </>
        );
    };

export default Sidebar;
