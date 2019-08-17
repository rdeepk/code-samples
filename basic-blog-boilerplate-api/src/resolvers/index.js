import { GraphQLDateTime } from 'graphql-iso-date'

import userResolvers from './user'
import postResolvers from './post'
import commentResolvers from './comment'

const customScalarResolver = {
  Date: GraphQLDateTime,
}

export default [customScalarResolver, userResolvers, postResolvers, commentResolvers]
