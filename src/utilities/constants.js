import { DEV_IP, API_GATEWAY_URL } from "@env";

export const SERVER = API_GATEWAY_URL || `http:${DEV_IP}:5000/graphql`;

// GraphQL
export const GRAPHQL = {
    query: {
        signin:
            `
                query ($email: String!, $password: String!)
                {
                    signin( user: {
                        email: $email,
                        password: $password
                    })
                }
            `
        ,
        getMyInfo:
            `
                {
                    getMyInfo {
                        id,
                        email,
                        username,
                        role,
                        status
                    }
                }

            `
        ,
        resendEmail:
            `
                query ($email: String!) {
                    resendEmail(email: $email)
                }    
            `
    },
    mutation: {
        confirmEmail:
            `
                mutation ($token: String!) {
                    confirmEmail(token: $token)
                }
            `
        ,
        signup:
            `
                mutation ($username: String!, $email: String!, $password: String!, $role: String!) {
                    signup(user: {
                        username: $username,
                        email: $email,
                        password: $password,
                        role: $role
                    })
                }
            `
        ,
    }
};

// Available roles for the app 
export const ROLES = ['student', 'tutor'];
export const TRANSLATED_ROLES = {
    student: 'estudiante',
    tutor: 'tutor'
};

// Validations error messages
export const validationMessages = {
    required: "Este campo es obligatorio",
    email: "El correo electrónico no es válido",
    password: "La contraseña debe poseer al menos 8 carácteres",
    repeatPassword: "La contraseña no coincide",
    activationCode: "El código de activación no es válido"
}

// Screen names
export const screens = Object.freeze({
    home: 'Inicio',
    signip: 'Iniciar Sesión',
    signup: 'Registro',
    emailConfirmationNavigator: 'Activación de cuenta',
    emailConfirmation: 'Confirmación de correo',
    ResendEmailConfirmation: 'Reenviar código de activación',
})