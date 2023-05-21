import axios from 'axios';
import { SERVER } from './constants';
import GraphQLQuery from './GraphQLQuery';

const axiosInstance = axios.create({
  baseURL: SERVER,
  method: 'post',
});

/**
 * Perform http request to the API GATEWAY
 * @param {GraphQLQuery} graphQLQuery
 * @param {String} token - token based on jwt
 * @returns {Object} data object or error array from graphql response
 */
const request = async (graphQLQuery, token) => {
  const res = await axiosInstance({
    data: graphQLQuery,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  // Exist an error
  if (res.data.errors) throw res.data.errors;
  // Successful request
  return res.data.data;
};

export default request;
