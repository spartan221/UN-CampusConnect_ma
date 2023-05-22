import GraphQLQuery from './GraphQLQuery';
import { GRAPHQL } from './constants';
import request from './request';

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
  try {
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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDgzNmU5N2ZiODc0NmZkY2EzMWU0NCIsImlhdCI6MTY4NDcxNzQ3NiwiZXhwIjoxNjg0ODAzODc2fQ.JOKcrZMrNCQbm76SQKA00TaLPpJJuF2LQZuzZUwY1ck'
    );
    return data.addCall;
  } catch (errors) {
    throw errors;
  }
};

/**
 *
 * @returns {Object} calls
 *
 * */

export const getCalls = async () => {
  try {
    const data = await request(new GraphQLQuery(GRAPHQL.query.getCalls));
    return data.getCalls;
  } catch (errors) {
    throw errors;
  }
};
