import Project from "../models/project.js";
import {dbErrorHandle} from "../helpers/databaseErrorHandle.js";

const createProject = (req, res) => {
    const project = new Project(req.body);
    project.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: dbErrorHandle(err)
            });
        }
        res.json({ data });
    });
};

export {createProject};