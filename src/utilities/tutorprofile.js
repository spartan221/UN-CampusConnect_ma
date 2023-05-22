import GraphQLQuery from './GraphQLQuery';
import { GRAPHQL } from './constants';
import request from './request';

/**
 *
 * @param {Object} tutor
 * @returns {Object} tutor profile
 *
 */

export const createTutorProfile = async (tutor) => {
  try {
    const data = await request(
      new GraphQLQuery(GRAPHQL.mutation.createTutorProfile, { tutor }),
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmI3NTc3YTNjOTYyZjUxOGY5ZmUzNSIsImlhdCI6MTY4NDc2NDAyMywiZXhwIjoxNjg0ODUwNDIzfQ.DLuInOduJayzTJNPNZPMoGwCAiTQlay3ugck1efO8Gg'
    );
    return data.createTutorProfile;
  } catch (errors) {
    throw errors;
  }
};

/**
 *
 * @param {String} id
 * @returns {Object} tutor profile
 *
 */

export const getTutorProfile = async (id) => {
  try {
    const data = await request(new GraphQLQuery(GRAPHQL.query.getTutorProfile, { id }));
    return data.getTutorProfile;
  } catch (errors) {
    throw errors;
  }
};
