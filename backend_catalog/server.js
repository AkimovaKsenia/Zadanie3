const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Читаем товары из файла
const readData = () => {
  const data = fs.readFileSync(path.join(__dirname, "data.json"), "utf-8");
  return JSON.parse(data);
};

// Определяем GraphQL-схему
const schema = buildSchema(`
  type Product {
    id: ID!
    title: String!
    price: Int!
    description: String
    categories: [String!]
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }
`);

// Определяем резолверы
const root = {
  products: () => readData(),
  product: ({ id }) => readData().find((p) => p.id == id),
};

// Настраиваем GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true, // Включаем интерфейс GraphiQL для тестирования
  })
);

app.listen(PORT, () => {
  console.log(`GraphQL сервер запущен на http://localhost:${PORT}/graphql`);
});
