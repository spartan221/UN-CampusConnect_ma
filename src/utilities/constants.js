import { DEV_IP, API_GATEWAY_URL, API_GATEWAY_PORT } from '@env';

export const SERVER = API_GATEWAY_URL && API_GATEWAY_PORT
    ? `http://${API_GATEWAY_URL}:${API_GATEWAY_PORT}/graphql`
    : `http:${DEV_IP}:5000/graphql`;

// GraphQL
export const GRAPHQL = {
    query: {
        signin: `
                query ($email: String!, $password: String!)
                {
                    signin( user: {
                        email: $email,
                        password: $password
                    })
                }
            `,
        getTutorProfile: `
                query ($id: String!)
                {
                    getTutorProfile(id: $id) {
                        name
                        last_name
                        birth_place
                        birthdate
                        address
                        email
                        phone
                        description
                        photo
                        skills {
                            id
                            name
                        }
                        languages {
                            id
                            name
                        }
                        tutor_languages {
                            language_id
                            level
                        }
                        jobs {
                            id
                            name
                        }
                        tutor_jobs {
                            job_id
                            position
                            start_year
                            end_year
                        }
                        schools {
                            id
                            name
                        }
                        tutor_schools {
                            school_id
                            start_year
                            end_year
                            title
                        }
                    }
                }
            `,
        getCalls: `
                query {
                    getCalls {
                      id
                      nameGroup
                      maximunParticipants
                      place
                      schedule
                      deadline
                      status
                      participants
                    }
                }
            `,
        getMyInfo: `
                {
                    getMyInfo {
                        id,
                        email,
                        username,
                        role,
                        status
                    }
                }

            `,
        resendEmail: `
                query ($email: String!) {
                    resendEmail(email: $email)
                }    
            `
        ,
        getPublications:
            `
                query {
                    getpublications {
                    title
                    content_publication
                    author_publication
                    publication_date
                    publication_id
                    image
                    }
                }
            `
        ,
    },
    mutation: {
        createTutorProfile: `
            mutation createTutorProfile($tutor: TutorProfileInput!) {
                createTutorProfile(tutor: $tutor) {
                    name
                    last_name
                    birth_place
                    birthdate
                    address
                    email
                    phone
                    description
                    photo
                    skills {
                        id
                        name
                    }
                    languages {
                        id
                        name
                    }
                    tutor_languages {
                        language_id
                        level
                    }
                    jobs {
                        id
                        name
                    }
                    tutor_jobs {
                        job_id
                        position
                        start_year
                        end_year
                    }
                    schools {
                        id
                        name
                    }
                    tutor_schools {
                        school_id
                        start_year
                        end_year
                        title
                    }
                }
            }
        `,
        addCall: `
            mutation addCall($maximunParticipants: Int!, $nameGroup: String!, $place: String!, $schedule: String!, $deadline: String!, $participants: [String], $status: String!) {
                addCall(Call: {maximunParticipants: $maximunParticipants, nameGroup: $nameGroup, place: $place, schedule: $schedule, deadline: $deadline, participants: $participants, status: $status}) {
                  nameGroup
                  place
                }
            }
        `,
        confirmEmail: `
                mutation ($token: String!) {
                    confirmEmail(token: $token)
                }
            `,
        signup: `
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
        createPublication:
            `
                mutation (
                    $title: String!, 
                    $content_publication: String!, 
                    $publication_date: String!,
                    $image: String!
                    ) {
                    createPublication(publication: {
                        title: $title,
                        content_publication: $content_publication,
                        publication_date: $publication_date,
                        image: $image
                    }) {
                        message
                    }
                }   
            `
        ,
    }
};

// Available roles for the app
export const ROLES = ['student', 'tutor'];
export const TRANSLATED_ROLES = {
    student: 'estudiante',
    tutor: 'tutor',
};

// Validations error messages
export const validationMessages = {
    required: "Este campo es obligatorio",
    email: "El correo electrónico no es válido",
    password: "La contraseña debe poseer al menos 8 carácteres",
    repeatPassword: "La contraseña no coincide",
    activationCode: "El código de activación no es válido",
    maxlength255: "Solo esta permitido 255 carácteres"
}

// Screen names
export const screens = Object.freeze({
    home: 'Inicio',
    signip: 'Iniciar Sesión',
    signup: 'Registro',
    emailConfirmationNavigator: 'Activación de cuenta',
    emailConfirmation: 'Confirmación de correo',
    resendEmailConfirmation: 'Reenviar código de activación',
    bienestarNavigator: 'Bienestar',
    createPublication: 'Crear publicación',
    showPublications: 'Publicaciones',
    tutorProfile: 'Hoja de Vida',
    callForm: 'Crear Convocatoria',
    calls: 'Convocatorias',
});
