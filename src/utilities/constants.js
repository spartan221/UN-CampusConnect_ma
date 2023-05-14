import GraphQLQuery from "./GraphQLQuery";
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
                        role
                    }
                }

            `
    },
    mutation: {

    }
};