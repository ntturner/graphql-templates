const express = require('express')
const graphql = require('graphql')
const cors = require('cors')
const expressGraphQL = require('express-graphql')
const schema = require('./schema')
const userHandler = require('./handlers/users')

require('dotenv').config()
const app = express()

const rootResolver = {
    users: (args, req) => userHandler.getUsers(req),
    user: (args, req) => userHandler.getUserById(args.id, req),
}

app.use(cors())

// Endpoint for health checks.
app.get('/ping', (req, res) => {
    res.status(200)
    res.send('OK')
})

app.post('/', expressGraphQL({
    schema: schema,
    rootValue: rootResolver,
    graphiql: false,
}));

app.listen(3000, () => {
    console.log('GraphQL server listening on port 3000')
})
