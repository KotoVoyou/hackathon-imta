import express from "express";

const app = express();

app.get("/", function (req, res) {
    res.send("Hello Scalingo!");
});

const port = 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
