import { IRuta } from "../../interface/interfaces"
import { FaHome, FaGlassMartiniAlt, FaDoorOpen, FaUser, FaWindowMaximize, FaBox, FaImage, FaFileInvoiceDollar, FaShoppingCart } from 'react-icons/fa';


export const RUTAS:IRuta[] =
[

    {
        path:'/',
        name:'Inicio',
        icon: <FaHome />,
    },
    {
        path:'/vidrios',
        name:'Vidrios',
        icon: <FaGlassMartiniAlt />,
    },
    {
        path:'/cuadros',
        name:'Cuadros',
        icon: <FaImage />,
    },
    {
        path:'/ventaservicios',
        name:'Otros',
        icon: <FaWindowMaximize />,
    },
    {
        path:'/puertas',
        name:'Puertas',
        icon: <FaDoorOpen />,
    },
    {
        path:'/productos',
        name:'Productos',
        icon: <FaBox />,
    },
    {
        path:'/cliente',
        name:'Cliente',
        icon: <FaUser />,
    },
    {
        path:'/carrito',
        name:'Carrito',
        icon: <FaShoppingCart />,
    },
    {
        path:'/lista_cotizaciones',
        name:'Cotizaciones',
        icon: <FaFileInvoiceDollar />,
    }


]    

export const RUTAS_ADMIN = 
[
    {
        path:'/clientes',
        name:'Clientes',
        icon: 'FaUser',
    },
    {
        path:'/cotizaciones',
        name:'Cotizaciones',
        icon: 'FaFileInvoiceDollar',
    },
    {
        path:'/productos',
        name:'Productos',
        icon: 'FaBox',
    },
    {
        path:'/tarifario',
        name:'Tarifario',
        icon: 'FaMoneyBillAlt',
    },
]