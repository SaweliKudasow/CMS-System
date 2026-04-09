async function loadProducts() {
    const res = await fetch("/products");
    const products = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    products.forEach((p) => {
        const li = document.createElement("li");
        li.textContent = `${p.name} - ${p.price}`;
        list.appendChild(li);
    });
}

loadProducts();
