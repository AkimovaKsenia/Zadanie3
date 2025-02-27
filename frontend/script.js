document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/api/products");
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
});
