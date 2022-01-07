import express from "express";
import cors from "cors";

import axios from "axios";

const app = express();

app.use(cors());
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

interface MathJsAPIResponse {
    result: string;
    error: string | null;
}

app.put("/api/divide2", (req, res) => {
    if (!req.body.number) return res.status(400).send("Number is missing");

    let x: number = req.body.number;

    axios
        .post("http://api.mathjs.org/v4/", {
            expr: `${x}/2`,
        })
        .then((response) => response.data as MathJsAPIResponse)
        .then((data) => {
            if (data.error) return res.status(400).send(data.error);
            return res.status(200).json({
                result: parseFloat(data.result),
            });
        })
        .catch((_) => res.status(500).send("An error occurs"));
});

const staticDirectory = `${__dirname}/${process.env.STATIC_DIR || "dist"}`;
app.use(express.static(staticDirectory));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(`Serving static directory ${staticDirectory}`);
});
