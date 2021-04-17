const { ApolloServer, gql } = require('apollo-server-lambda');
const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({ secret: "fnAEG8GNUaACCOs1E7b8WDqDHc5b7atzEQovpmWN" });
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
  
  type Completed {
    completed: Boolean!
  }
  
  type Mutation {
    addTodo(text: String!, completed: Boolean!) : Todo
    removeTodo(id: String!) : Id
    updateTodo(id: String!, completed: Boolean!) : Completed
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
      console.log(result.ref.id);
      return {
        id: result.ref.id
      };
    },
    updateTodo: async (_, { id, completed }) => {
      const result = await client.query(
        q.Update(
          q.Ref(q.Collection('todos'), id),
          { data: { completed } },
        )
      );
      
      console.log(typeof result.data.completed, result.data.completed);
      return {
        completed: result.data.completed
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
