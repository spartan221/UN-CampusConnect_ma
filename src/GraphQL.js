import GraphQLQuery from "./utilities/GraphQLQuery";
import { GRAPHQL } from "./utilities/constants";
import { getToken } from "./utilities/jwt";
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
};

/**
 *
 * @param {String} username
 * @param {String} email
 * @param {String} password
 * @param {String} role
 * @returns {String} auth token
 */
export const signup = async (username, email, password, role) => {
  const data = await request(
    new GraphQLQuery(GRAPHQL.mutation.signup, { username, email, password, role })
  );
  const token = data.signup;
  return token;
};

/**
 * @returns {Object} Object with id, email, username and role of the user.
 */
export const getMyInfo = async () => {
  const token = await getToken();
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
};

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


/**
 * 
 * @param {String} title 
 * @param {String} content_publication 
 * @param {String} publication_date 
 * @param {String} image url
 * @returns {String} response message
 */
export const createPublication = async (title, content_publication, publication_date, image) => {
  const token = await getToken();
  const data = await request(new GraphQLQuery(GRAPHQL.mutation.createPublication, {
    title,
    content_publication,
    publication_date,
    image
  }), token);
  const message = data.createPublication.message;
  return message;
}

/**
 * @returns {Array} an array with publications
 */
export const getPublications = async () => {
  const data = await request(new GraphQLQuery(GRAPHQL.query.getPublications));
  const publications = data.getpublications;
  return publications;
}

/**
 *
 * @param {Object} tutor
 * @returns {Object} tutor profile
 *
 */

export const createTutorProfile = async (tutor) => {
  const token = await getToken();
  const data = await request(
    new GraphQLQuery(GRAPHQL.mutation.createTutorProfile, { tutor }),
    token
  );
  return data.createTutorProfile;
};

/**
 *
 * @param {String} id
 * @returns {Object} tutor profile
 *
 */

export const getTutorProfile = async (id) => {
  const data = await request(new GraphQLQuery(GRAPHQL.query.getTutorProfile, { id }));
  return data.getTutorProfile;
};

/**
 *
 * @param {Object} call
 * @returns {Object} call
 *
 * */

export const addCall = async (
  maximunParticipants,
  nameGroup,
  place,
  schedule,
  deadline,
  participants,
  status
) => {
  const token = await getToken();
  const data = await request(
    new GraphQLQuery(GRAPHQL.mutation.addCall, {
      maximunParticipants,
      nameGroup,
      place,
      schedule,
      deadline,
      participants,
      status,
    }),
    token
  );
  return data.addCall;
};

/**
 *
 * @returns {Object} calls
 *
 * */

export const getCalls = async () => {
  const data = await request(new GraphQLQuery(GRAPHQL.query.getCalls));
  return data.getCalls;
};
