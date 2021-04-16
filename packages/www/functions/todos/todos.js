const { ApolloServer, gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Query {
    todos: [Todo]
  }
  
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }
  
  type Id {
    id: String!
  }
  
  type Mutation {
    addTodo(text: String!, completed: Boolean!) : Todo
    removeTodo(id: String!) : Id
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
  Mutation: {
    addTodo: async (_, { text, completed }) => {
      return {
        id: new Date().toISOString(),
        text,
        completed,
      };
    },
    removeTodo: async (_, { id }) => {
      return {
        id
      };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
