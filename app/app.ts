import DatabaseMiddleware from "./databaseMiddleware";

const { GraphQLServer } = require("graphql-yoga");

const typeDefs: string = `
type Query {
  info: String!
  recipes: [Recipe]
  recipe(name: String): [Recipe]
}

type Recipe {
  id: ID
  name: String
  tags: [String]
  difficulty: String
  time: String
}
`;

const resolvers: object = {
  Query: {
    info: () => "This is recipie app API",
    recipes: () => recipie.makeQuery(),
    recipe: (_, param: object) => recipie.makeQuery(param)
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));

const databaseUrl = "mongodb://localhost:27017";

const recipie = new DatabaseMiddleware(databaseUrl, "recipie", "recipies");
