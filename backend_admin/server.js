const express = require("express");
const fs = require("fs");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
const PORT = 8080;

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
app.use(express.json());

const filePath = path.join(__dirname, "../backend_catalog/data.json");

const readData = () => {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

// Запись в JSON-файл
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Получение всех товаров
app.get("/api/products", (req, res) => {
  res.json(readData());
});

// Добавление товара
app.post("/api/products", (req, res) => {
  let products = readData();
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  writeData(products);
  res.status(201).json(newProduct);
});

// Редактирование товара по ID
app.put("/api/products/:id", (req, res) => {
  let products = readData();
  const index = products.findIndex((p) => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Товар не найден" });

  products[index] = { ...products[index], ...req.body };
  writeData(products);
  res.json(products[index]);
});

// Удаление товара
app.delete("/api/products/:id", (req, res) => {
  let products = readData();
  const filtered = products.filter((p) => p.id != req.params.id);
  writeData(filtered);
  res.json({ message: "Товар удалён" });
});

// Генерация документации
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Admin server running at http://localhost:${PORT}`);
});
