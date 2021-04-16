const { ApolloServer, gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Query {
    todos: [TODO]
  }
  
  type TODO {
    id: ID!
    text: String!
    completed: Boolean!
  }
`;

const todos = [
  { id: "1", text: 'Terry Pratchett', completed: false },
  { id: "2", text: 'Stephen King', completed: true },
  { id: "3", text: 'JK Rowling', completed: false },
];

const resolvers = {
  Query: {
    todos: async () => {
      return todos;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
