import express from "express";

const app = express();

app.get("/hello", (req, res) => {
    res.send("Hello scalingo!");
});

// const staticDirectory = "/" + (process.env.STATIC_DIR || "dist");
const staticDirectory = `${__dirname}/${process.env.STATIC_DIR || "dist"}`;
app.use(express.static(staticDirectory));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(`Serving static directory ${staticDirectory}`);
});
