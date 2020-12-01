const { ApolloServer } = require('apollo-server')
const schema = require('./schema')
const resolvers = require('./resolvers')

require('dotenv').config()

const server = new ApolloServer({ 
    typeDefs: schema, 
    resolvers: resolvers,
    context: ({ req }) => ({
        headers: req.headers
    }),
    onHealthCheck: () => {
        return new Promise((resolve, reject) => {
            resolve()
        })
    }
})

server.listen(3000).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
