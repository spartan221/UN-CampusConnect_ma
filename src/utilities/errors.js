import { alertWindow } from './alert';

export const manageSubmitErrors = (errors) => {
    const error = errors[0];
    const errorMessage = error.description;
    alertWindow('¡Ha ocurrido un error!', errorMessage, 'Aceptar');
};

export const manageFieldErrors = (error) => {
    const errorMessage = error.message;
    return errorMessage;
};