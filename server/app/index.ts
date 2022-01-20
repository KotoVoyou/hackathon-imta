import express from "express";
import cors from "cors";

import { getCourses } from "./controllers/course";
import { teacherModel, studentModel } from "../database/models/user";
import { tafModel } from "../database/models/taf";

export interface AppConfig {
    staticDirectory?: string;
}

const app = (config: AppConfig = {}) => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.get("/api/courses", (req, res) => {
        getCourses()
            .then((courses) => res.status(200).json(courses))
            .catch((error) => res.status(400).json(error));
    });

    app.get("/api/teachers", (req, res) => {
        teacherModel
            .find()
            .then((teachers) => res.status(200).json(teachers))
            .catch((error) => res.status(400).json(error));
    });

    app.post("/api/teachers", (req, res) => {
        let { name } = req.body;

        teacherModel
            .create({ name })
            .then((teacher) => res.status(200).json(teacher))
            .catch((error) => res.status(400).json(error));
    });

    app.get("/api/students", (req, res) => {
        studentModel
            .find()
            .populate("taf")
            .then((students) => res.status(200).json(students))
            .catch((error) => res.status(400).json(error));
    });

    app.post("/api/students", (req, res) => {
        let { name, taf } = req.body;

        studentModel
            .create({ name, taf })
            .then((student) => res.status(200).json(student))
            .catch((error) => res.status(400).json(error));
    });

    app.get("/api/taf", (req, res) => {
        tafModel
            .find()
            .then((tafs) => res.status(200).json(tafs))
            .catch((error) => res.status(400).json(error));
    });

    app.post("/api/taf", (req, res) => {
        let { name } = req.body;

        tafModel
            .create({ name })
            .then((taf) => res.status(200).json(taf))
            .catch((error) => res.status(400).json(error));
    });

    // Serve static directory containing the website
    if (config.staticDirectory) {
        app.use(express.static(config.staticDirectory));
        console.log(`Serving static directory ${config.staticDirectory}`);
    }

    return app;
};

export { app };
