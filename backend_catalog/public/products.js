// fetch("/api/products")
//   .then((response) => response.json())
//   .then((products) => {
//     const productsDiv = document.getElementById("products");

//     products.forEach((product) => {
//       const productDiv = document.createElement("div");
//       productDiv.className = "product";
//       productDiv.innerHTML = `
//         <h3>${product.title}</h3>
//         <p>Цена: ${product.price} ₽</p>
//       `;
//       productsDiv.appendChild(productDiv);
//     });
//   })
//   .catch((error) => console.error("Ошибка загрузки товаров:", error));
