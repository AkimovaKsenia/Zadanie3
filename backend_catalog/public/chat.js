// // 1. Подключаем WebSocket
// const socket = new WebSocket("ws://localhost:3000");
// const messagesDiv = document.getElementById("messages");
// const messageInput = document.getElementById("messageInput");
// const sendButton = document.getElementById("sendButton");

// // 2. Обработка входящих сообщений в чат
// socket.onmessage = (event) => {
//   const message = document.createElement("p");
//   message.textContent = event.data;
//   messagesDiv.appendChild(message);
//   messagesDiv.scrollTop = messagesDiv.scrollHeight; // Прокрутка вниз
// };

// // 3. Отправка сообщения через WebSocket
// sendButton.addEventListener("click", () => {
//   const message = messageInput.value;
//   if (message) {
//     socket.send(message);
//     messageInput.value = ""; // Очистка поля ввода
//   }
// });

// // Отправка сообщения по клавише Enter
// messageInput.addEventListener("keypress", (event) => {
//   if (event.key === "Enter") {
//     sendButton.click();
//   }
// });

// // 4. GraphQL запрос для получения товаров
// async function fetchProducts() {
//   const query = `{
//     products {
//       title
//       price
//     }
//   }`;

//   const res = await fetch("http://localhost:3000/graphql", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ query }),
//   });

//   const { data } = await res.json();
//   const products = data.products;
//   renderProducts(products);
// }

// // 5. Отображение товаров
// function renderProducts(products) {
//   const productsDiv = document.getElementById("products");
//   productsDiv.innerHTML = products
//     .map(
//       (product) => `
//       <div class="product-card">
//         <h3>${product.title}</h3>
//         <p>Цена: ${product.price} руб.</p>
//       </div>
//     `
//     )
//     .join("");
// }

// // Загружаем товары при загрузке страницы
// document.addEventListener("DOMContentLoaded", () => {
//   fetchProducts();
// });
