import express from 'express'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import schema from './schema'
import resolvers from './resolvers'
import models, { sequelize } from './models'
import http from 'http'

const app = express()

// const eraseDatabaseOnSync = true
const isTest = !!process.env.TEST_DATABASE

const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
}

const server = new ApolloServer({
 typeDefs: schema,
 resolvers,
 formatError: error => {
  const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');
    return {
      ...error,
      message,
    }
 },
  context: async ({ req, connection }) => {
    if(connection) {
      return {
        models,
      }
    }
    if(req) {
      return {
        models,
        me: await getMe(req),
        secret: process.env.SECRET,
      }
    }
  },
})

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

server.applyMiddleware({ app, path: '/graphql' })

// force is a flag to determine whether to erase all data on server start
sequelize.sync({ force: isTest }).then(async () => {
  if({ isTest }) {
    createUser(new Date())
  }
  httpServer.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql')
   })
})

const createUser = async date => {
  await models.User.create(
    {
      username: 'jk',
      email:'jk@test.com',
      password: 'jk12345',
      firstName: 'Jas',
      lastName: "Kaur",
      role: "ADMIN",
      posts: [
        {
          title: 'Published the Road to learn React',
          body: 'description in body',
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
      ],
    },
    {
      include: [models.Post],
    },
  )
}
