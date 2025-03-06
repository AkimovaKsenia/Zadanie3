const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const fs = require("fs");
const path = require("path");
const { createServer } = require("http");
const { WebSocketServer } = require("ws");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLID,
} = require("graphql");

const app = express();
const server = createServer(app); // Создаем HTTP сервер
const wss = new WebSocketServer({ server }); // Создаем WebSocket сервер

const clients = new Set(); // Хранилище клиентов WebSocket

wss.on("connection", (ws) => {
  clients.add(ws);
  console.log("Пользователь подключился к чату");

  ws.on("message", (message) => {
    console.log("Сообщение:", message.toString());

    // Рассылаем сообщение всем клиентам
    clients.forEach((client) => {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Пользователь отключился от чата");
  });
});

// Схема GraphQL (остается без изменений)
const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    price: { type: GraphQLFloat },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      resolve() {
        try {
          const filePath = path.join(__dirname, "data.json");
          const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
          return data;
        } catch (err) {
          console.error("Ошибка при чтении файла:", err);
          return [];
        }
      },
    },
  },
});

const schema = new GraphQLSchema({ query: RootQuery });

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
  console.log(`WebSocket сервер запущен на ws://localhost:${PORT}`);
});
