const { GraphQLServer } = require('graphql-yoga')

// 1. typeDefs define GraphQL schema. The fields on root types (query, mutatino, subscription) are called root fields which define the available API operations
// since the schema is too big. it's necessary to move it to another file (schema.graphql)
//const typeDefs = ''

// test: dummy data
let links = [{ // used to store the links at run time
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for GraphQL'
    },
    { // used to store the links at run time
        id: 'link-1',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for GraphQL'
    }
]
let idCount = links.length

// 2. resolvers obhect is actual implementation of the schema
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links, // Thanks to the schema, GraphQL is smart enough to invoke the resolvers of the Link type below
  },
//   Link: { // this is trivial (not important), you can actually omit this
//     id: (parent) => parent.id, // parent is the result of the previous resolver executioin level
//     description: (parent) => parent.description,
//     url: (parent) => parent.url,
//   },
  Mutation: {
    // 2
    post: (parent, args) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    }
  },
}

// 3. the schema and resolvers are bundled and passed to the GraphQL Server which is imported from graphql-yoga. This tells the server 
//    what API operations are accepted and how they should be resolved
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql', // typedefs can be a string or reference to a file
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))