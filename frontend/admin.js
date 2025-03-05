// document.addEventListener("DOMContentLoaded", async () => {
//   const container = document.getElementById("products");

//   async function loadProducts() {
//     const response = await fetch("/api/products");
//     const products = await response.json();
//     container.innerHTML = products
//       .map(
//         (p) => `
//           <div class="card">
//               <h2>${p.title}</h2>
//               <p>Цена: ${p.price} руб.</p>
//               <p>${p.description}</p>
//               <button onclick="deleteProduct(${p.id})">Удалить</button>
//           </div>
//         `
//       )
//       .join("");
//   }

//   document
//     .getElementById("addProductForm")
//     .addEventListener("submit", async (e) => {
//       e.preventDefault();
//       const title = document.getElementById("title").value;
//       const price = document.getElementById("price").value;
//       const description = document.getElementById("description").value;

//       await fetch("/api/products", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title, price, description }),
//       });

//       loadProducts();
//     });

//   window.deleteProduct = async (id) => {
//     await fetch(`/api/products/${id}`, { method: "DELETE" });
//     loadProducts();
//   };

//   loadProducts();
// });
