import GraphQLQuery from "./utilities/GraphQLQuery";
import { GRAPHQL } from "./utilities/constants";
import request from "./utilities/request";

/**
 * @param {String} email 
 * @param {String} password 
 * @returns {String} auth token 
 */
export const signin = async (email, password) => {
    const data = await request(new GraphQLQuery(GRAPHQL.query.signin, { email, password }));
    const token = data.signin;
    return token;
}

/**
 * 
 * @param {String} username 
 * @param {String} email 
 * @param {String} password 
 * @param {String} role 
 * @returns {String} auth token
 */
export const signup = async (username, email, password, role) => {
    const data = await request(new GraphQLQuery(GRAPHQL.mutation.signup, { username, email, password, role }));
    const token = data.signup;
    return token;
}

/**
 * @param {String} token jwt token 
 * @returns {Object} Object with id, email, username and role of the user.
 */
export const getMyInfo = async (token) => {
    const data = await request(new GraphQLQuery(GRAPHQL.query.getMyInfo), token);
    const myInfo = data.getMyInfo;
    return myInfo;
}

/**
 * 
 * @param {String} email 
 * @returns {Object} Object with confirmation message of email with activation code sent
 */

export const resendEmail = async (email) => {
    const data = await request(new GraphQLQuery(GRAPHQL.query.resendEmail, { email }));
    const resendEmail = data.resendEmail;
    return resendEmail;
}

/**
 * 
 * @param {String} activationCode
 * @returns {Object} Object with confirmation message of verified email.
 */
export const confirmEmail = async (activationCode) => {
    const data = await request(new GraphQLQuery(GRAPHQL.mutation.confirmEmail, { token: activationCode }));
    const confirmEmail = data.confirmEmail;
    return confirmEmail;
}
