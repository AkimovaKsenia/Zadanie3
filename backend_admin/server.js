const express = require("express");
const fs = require("fs");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { createServer } = require("http");
const { WebSocketServer } = require("ws");

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

const PORT = 8080;

// Хранилище подключенных WebSocket клиентов
const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  console.log("Администратор подключился к чату");

  ws.on("message", (message) => {
    console.log("Сообщение:", message.toString());

    // Пересылаем сообщение всем клиентам
    clients.forEach((client) => {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Администратор отключился от чата");
  });
});

// Опции для Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Admin API",
      version: "1.0.0",
      description: "API для управления товарами",
    },
  },
  apis: ["./routes/*.js"],
};

// Подключаем папку для статических файлов (например, HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

const filePath = path.join(__dirname, "../backend_catalog/data.json");

const readData = () => {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

// Запись в JSON-файл
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Генерация документации
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Прочие маршруты API для работы с товарами
app.get("/api/products", (req, res) => {
  res.json(readData());
});

app.post("/api/products", (req, res) => {
  let products = readData();
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  writeData(products);
  res.status(201).json(newProduct);
});

app.put("/api/products/:id", (req, res) => {
  let products = readData();
  const index = products.findIndex((p) => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Товар не найден" });

  products[index] = { ...products[index], ...req.body };
  writeData(products);
  res.json(products[index]);
});

app.delete("/api/products/:id", (req, res) => {
  let products = readData();
  const filtered = products.filter((p) => p.id != req.params.id);
  writeData(filtered);
  res.json({ message: "Товар удалён" });
});

// Маршрут для отдачи админ-страницы
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "admin.html"));
});

server.listen(PORT, () => {
  console.log(`Admin server running at http://localhost:${PORT}`);
  console.log(`WebSocket сервер запущен на ws://localhost:${PORT}`);
});
