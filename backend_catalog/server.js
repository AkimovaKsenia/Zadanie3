const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const fs = require("fs");
const path = require("path");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} = require("graphql");

// Пример схемы GraphQL для товаров
const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    price: { type: GraphQLFloat },
  }),
});

// Корневой запрос
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        try {
          // Чтение данных из файла data.json
          const filePath = path.join(__dirname, "data.json");
          const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
          return data; // Возвращаем все товары
        } catch (err) {
          console.error("Ошибка при чтении файла:", err);
          return []; // Возвращаем пустой массив в случае ошибки
        }
      },
    },
  },
});

// Создание схемы GraphQL
const schema = new GraphQLSchema({
  query: RootQuery,
});

const app = express();

// Настройка маршрута для GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true, // Включает интерфейс GraphiQL для тестирования запросов
  })
);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000/graphql");
});
