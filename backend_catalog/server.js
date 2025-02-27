const express = require("express");
const fs = require("fs");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
const PORT = 3000;

// добавляют конфигурацию для Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Admin API",
      version: "1.0.0",
      description: "API для управления товарами",
    },
  },
  apis: ["./server.js"], // Добавили путь к файлу с API
};

app.use(express.static(path.join(__dirname, "../frontend")));

// Получение списка товаров
// Получение списка товаров по категории (например, /api/products?category=Электроника)
app.get("/api/products", (req, res) => {
  fs.readFile(path.join(__dirname, "data.json"), "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Ошибка чтения данных" });

    let products = JSON.parse(data);
    const { category } = req.query;

    if (category) {
      products = products.filter((p) => p.categories.includes(category));
    }

    res.json(products);
  });
});

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Catalog server running at http://localhost:${PORT}`);
});
