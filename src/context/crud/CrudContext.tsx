
import { createContext } from 'react';
import { ITarifarioVidrios } from '../../components/tarifarios/Vidrios';


interface ContextProps {
    tarifarioVidrios: any[] | undefined | null;
    getTarifarioVidrios: () => Promise<boolean>;
    deleteTarifarioVidrios: (id: number | undefined ) => Promise<boolean>;
    updateTarifarioVidrios: (producto: ITarifarioVidrios ) => Promise<boolean>;
    productoParaActualizar: ITarifarioVidrios | null;
    setProductoParaActualizar: (producto: ITarifarioVidrios | null) => void;
    escucharCambios : boolean;
    setEscucharCambios : (value: boolean) => void;

}


export const CrudContext = createContext({} as ContextProps);