import DatabaseMiddleware from "./DatabaseMiddleware";

const { GraphQLServer } = require("graphql-yoga");

const typeDefs: string = `
type Query {
  info: String!
  recipes: [Recipe]
  recipe(name: String): [Recipe]
}

type Recipe {
  _id: ID
  name: String
  difficulty: String
  meals: [Meals]
  time: String
  cleaning: String
  tags: [String]
  macro: Macro
  ingredients: [Ingredients]
  preparation: [String]
}

enum Meals {
  breakfast
  brunch
  lunch
  tea
  dinner
  snack
}

type Macro {
  kcal: Int
  protein: Int
  carb: Int
  fat: Int
  percentage: PrecentageMacro
}

type PrecentageMacro {
  protein: String
  carb: String
  fat: String
}

type Ingredients {
  name: String
  quant: String
  price: Int
}
`;

const resolvers: object = {
  Query: {
    info: () => "This is recipie app API",
    recipes: () => recipie.makeQuery(),
    recipe: (_: undefined, param: object) => recipie.makeQuery(param)
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));

const databaseUrl = "mongodb://localhost:27017";

const recipie = new DatabaseMiddleware(databaseUrl, "recipie", "recipies");
