const graphql = require('graphql')
const GraphQLJSON = require('graphql-type-json')

const schema = graphql.buildSchema(`
    scalar JSON

    # Change to interface to implement more Error types.
    type Error {
        statusCode: Int
        statusText: String
        message: String
    }

    type User {
        id: Int!
        name: String
        status: String
        email: String
        created: String
    }

    type UserList {
        results: [User]
    }

    union UserResponse = User | Error
    union UserListResponse = UserList | Error

    type Query {
        users: UserListResponse
        user(id: Int!): UserResponse
    }
`)

// Resolve JSON scalar type.
Object.assign(schema._typeMap.JSON, GraphQLJSON)

module.exports = schema
