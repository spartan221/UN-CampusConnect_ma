import GraphQLQuery from './GraphQLQuery';
import { DEV_IP, API_GATEWAY_URL } from '@env';

export const SERVER = API_GATEWAY_URL || `http:${DEV_IP}:5000/graphql`;

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
  },
  /*
  Petición de ejemplo para crear un tutor:
    mutation {
  createTutorProfile(tutor: {tutor: {name: "Daniel", last_name: "Bonilla", birth_place: "Usme", birthdate: "2001-01-01", address: "cra 1", email: "unal@gmail.com", phone: "123456789", description: "Soy un tutor de matemáticas", photo: "https://example.com/photo.jpg", skills_attributes: [{name: "Bailar"}, {name: "Correr"}], languages_attributes: [{name: "Inglés", level: "C1"}, {name: "Coreano", level: "B1"}], schools_attributes: [{name: "Colboy" start_year: "2002-02-02" end_year: "2003-02-02" title: "Ingeniero"}, {name: "UNAL" start_year: "2002-02-02" end_year: "2003-02-02" title: "Técnico"}], jobs_attributes: [{name: "IBM" position: "contador" start_year: "2022-01-01" end_year: "2023-01-01"}, {name: "Google" position: "Operador" start_year: "2022-01-01" end_year: "2023-01-01"}]}}) {
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
    */
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
  },
};
