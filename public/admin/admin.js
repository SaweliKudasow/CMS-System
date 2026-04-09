async function loadProducts() {
    const res = await fetch("/products");
    const products = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    products.forEach((p) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "delete-btn";
        btn.dataset.id = String(p.id);
        btn.textContent = "Delete";
        li.appendChild(document.createTextNode(`${p.name} - ${p.price} `));
        li.appendChild(btn);
        list.appendChild(li);
    });
}

async function addProduct() {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;

    await fetch("/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: Date.now(),
            name,
            price,
        }),
    });

    loadProducts();
}

async function deleteProduct(id) {
    await fetch(`/products/${id}`, {
        method: "DELETE",
    });

    loadProducts();
}

document.getElementById("addBtn").addEventListener("click", addProduct);

document.getElementById("list").addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-btn");
    if (!btn) return;
    deleteProduct(btn.dataset.id);
});

loadProducts();
