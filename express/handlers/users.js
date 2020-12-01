const axios = require('axios')

const userHandler = {
    getUsers: async (req) => {
        return await axios.get('', {
            headers: {
                'authorization': req.headers['authorization'],
            }
        }).then((res) => {
            return {
                __typename: 'UserList',
                results: res.data.map(user => {
                    let result = {
                        id: user.id,
                        name: user.name,
                        status: user.status,
                        email: user.email,
                        created: user.created_time
                    }
                    return result
                })
            }
        }).catch((e) => {
            console.error(e)
            let res = e.response
            return {
                __typename: 'Error',
                statusCode: res.status,
                statusText: res.statusText,
                message: res.data.message
            }
        })
    },
    getUserById: async (id, req) => {
        return await axios.get(``, {
            headers: {
                'authorization': req.headers['authorization'],
            }
        }).then((res) => {
            const user = res.data[0]
            let result = {
                __typename: 'User',
                id: user.id,
                name: user.name,
                email: user.email,
                status: user.status,
                created: user.created_time,
            }
            return result
        }).catch((e) => {
            console.error(e)
            let res = e.response
            return {
                __typename: 'Error',
                statusCode: res.status,
                statusText: res.statusText,
                message: res.data.message
            }
        })
    }
}

module.exports = userHandler
