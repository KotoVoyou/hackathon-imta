import express from "express";
import cors from "cors";

import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json());

interface MathAPIRequest {
    number: number;
}

interface MathJsAPIResponse {
    result: string;
    error: string | null;
}

function isMathAPIRequest(request: any): request is MathAPIRequest {
    return request.number !== undefined && request.number !== null;
}

app.put("/api/multiply2", (req, res) => {
    if (!isMathAPIRequest(req.body))
        return res.status(400).send("Request is wrong");

    let { number } = req.body;

    res.status(200).json({
        result: number * 2,
    });
});

app.put("/api/divide2", (req, res) => {
    if (!isMathAPIRequest(req.body))
        return res.status(400).send("Request is wrong");

    let { number } = req.body;

    axios
        .post("http://api.mathjs.org/v4/", {
            expr: `${number}/2`,
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

// Servce static directory containing the website
const staticDirectory = `${__dirname}/${process.env.STATIC_DIR || "dist"}`;
app.use(express.static(staticDirectory));
console.log(`Serving static directory ${staticDirectory}`);

export { app };
