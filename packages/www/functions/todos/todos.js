const { ApolloServer, gql } = require('apollo-server-lambda');
const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET_KEY });
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

const resolvers = {
  Query: {
    todos: async () => {
      //Get todos
      const result = await client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection('todos'))),
          q.Lambda(x => {
            return q.Get(x);
          })
        ));
      return result.data.map(todo => {
        return { ...todo.data, id: todo.ref.id };
      });
    },
  },
  Mutation: {
    addTodo: async (_, { text, completed }) => {
      //save todo to FaunaDB
      
      try {
        const result = await client.query(
          q.Create(
            q.Collection("todos"),
            { data: { text, completed } }
          )
        );
        return {
          id: result.ref.id,
          text,
          completed,
        };
      } catch (e) {
        console.log(e);
      }
    },
    removeTodo: async (_, { id }) => {
      const result = await client.query(
        q.Delete(
          q.Ref(q.Collection('todos'), id)
        )
      );
      return {
        id: result.ref.id
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
