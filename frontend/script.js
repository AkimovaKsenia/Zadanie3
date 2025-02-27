async function filterProducts() {
  const category = document.getElementById("categoryFilter").value;
  const response = await fetch(`/api/products?category=${category}`);
  const products = await response.json();

  const container = document.getElementById("products");
  container.innerHTML = products
    .map(
      (p) => `
        <div class="card">
          <h2>${p.title}</h2>
          <p>Цена: ${p.price} руб.</p>
          <p>${p.description}</p>
        </div>
      `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", filterProducts);
