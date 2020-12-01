const { gql } = require('apollo-server')

const schema = gql`
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
`

module.exports = schema
