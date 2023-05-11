import GraphQLQuery from "./GraphQLQuery";
import { GRAPHQL } from "./constants";
import request from "./request";

/**
 * 
 * @param {String} email 
 * @param {String} password 
 * @returns {String} auth token 
 */
export const signin = async (email, password) => {
    try {
        const data = await request(new GraphQLQuery(GRAPHQL.query.signin, { email, password }));
        const token = data.signin;
        return token;
    } catch (errors) {
        throw errors;
    }
};
