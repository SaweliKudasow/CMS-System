const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const FILE = "products.json";

// получить товары
app.get("/products", (req, res) => {
    const data = JSON.parse(fs.readFileSync(FILE));
    res.json(data);
});

// добавить товар
app.post("/products", (req, res) => {
    const data = JSON.parse(fs.readFileSync(FILE));
    data.push(req.body);
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
});

// удалить товар
app.delete("/products/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE));
    data = data.filter(p => p.id != req.params.id);
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
});

// открыть админ панельку
app.get("/admin", (req, res) => {
    res.sendFile(__dirname + "/public/admin.html");
});

app.listen(3000, () => console.log("Server started"));