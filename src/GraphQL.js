import GraphQLQuery from "./utilities/GraphQLQuery";
import { GRAPHQL } from "./utilities/constants";
import request from "./utilities/request";

/**
 * 
 * @param {String} email 
 * @param {String} password 
 * @returns {String} auth token 
 */
export const signin = async (email, password) => {
    const data = await request(new GraphQLQuery(GRAPHQL.query.signin, { email, password }));
    const token = data.signin;
    return token;
};

/**
 * @param {String} token jwt token 
 * @returns {Object} Object with id, email, username and role of the user.
 */
export const getMyInfo = async (token) => {
    const data = await request(new GraphQLQuery(GRAPHQL.query.getMyInfo), token);
    const myInfo = data.getMyInfo;
    return myInfo;
};