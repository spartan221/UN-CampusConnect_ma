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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjE0Y2E2MDdiM2VjZWMwMTkwYWJkNCIsImlhdCI6MTY4NDA5ODIxNCwiZXhwIjoxNjg0MTg0NjE0fQ.6uBLNWSxbgi1pM2ihdGbD18yTlMUm9KEGeb30h4rD3g'
    );
    return data.createTutorProfile;
  } catch (errors) {
    throw errors;
  }
};

export const getTutorProfile = async (id) => {
  try {
    const data = await request(new GraphQLQuery(GRAPHQL.query.getTutorProfile, { id }));
    return data.getTutorProfile;
  } catch (errors) {
    throw errors;
  }
};
