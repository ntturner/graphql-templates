const userHandler = require('./handlers/ml_users')
const GraphQLJSON = require('graphql-type-json')

const resolvers = {
    JSON: GraphQLJSON,
    UserResponse: {
        __resolveType(obj, context, info) {
            if (obj.id) {
                return 'User'
            }

            if (obj.statusCode) {
                return 'Error'
            }

            return null
        }
    },
    UserListResponse: {
        __resolveType(obj, context, info) {
            if (obj.results) {
                return 'UserList'
            }

            if (obj.statusCode) {
                return 'Error'
            }

            return null
        }
    },
    Query: {
        users: (parent, args, req) => userHandler.getUsers(req),
        user: (parent, args, req) => userHandler.getUserById(args.id, req),
    }
}

module.exports = resolvers
