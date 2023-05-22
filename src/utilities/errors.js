import { alertWindow } from './alert';

export const manageError = (error) => {
    let errorMessage = '';
    // Error de conexión con el Api Gateway
    if (error.hasOwnProperty('message')) {
        errorMessage = 'Revisa tu conexión';
    }
    // Error de petición 
    else if (error[0].hasOwnProperty('description')) {
        errorMessage = error[0].description;
    }
    // Error de conexión con ms
    else {
        errorMessage = 'Error del servidor';
    }
    alertWindow('¡Ha ocurrido un error!', errorMessage, 'Aceptar');
};