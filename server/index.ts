import express from "express";

const app = express();
app.use(express.json());

app.put("/api/multiply2", (req, res) => {
    if (!req.body.number) {
        return res.status(400).send("Number is missing");
    }

    let x: number = req.body.number;

    res.status(200).json({
        result: x * 2,
    });
});

const staticDirectory = `${__dirname}/${process.env.STATIC_DIR || "dist"}`;
app.use(express.static(staticDirectory));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(`Serving static directory ${staticDirectory}`);
});
