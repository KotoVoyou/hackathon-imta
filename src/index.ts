import express from "express";

const app = express();

app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.get("scalingo", (req, res) => {
    res.send("Hello scalingo!");
});

const port = 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
