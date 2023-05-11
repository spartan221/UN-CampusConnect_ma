/** Class representing a GraphQLQuery */
class GraphQLQuery {
    /**
     * Create a GraphQLQuery.
     * @param {String} query - query or mutation based on graphql syntax.
     * @param {Object} [variables] - object whose properties are the paramaters used in the query.
     */
    constructor(query = '', variables = {}) {
        this.query = query;
        this.variables = variables;
    }
}

export default GraphQLQuery;