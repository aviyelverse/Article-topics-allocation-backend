import Project from "../models/project.js";
import {dbErrorHandle} from "../helpers/databaseErrorHandle.js";


const projectById = (req, res, next, id) => {
    Project.findById(id).exec((err, project) => {
        if (err || !project) {
            return res.status(400).json({
                error: "project not found"
            });
        }
        req.project = project;
        next();
    });
}

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

const readProject = (req, res) => {
    return res.json(req.project);
}

const updateProject = (req, res) => {
    const project = req.project;
    project.name = req.body.name;
    project.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: dbErrorHandle(err)
            });
        }

        res.json({ data });
    });
}

const deleteProject = (req, res) => {
    const project = req.project;
    project.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: dbErrorHandle(err)
            });
        }
        res.json({ message: "deleted successfully" });
    });
}

const allProjects = (req, res) => {
    Project.find().exec((err, projects) => {
        if (err) {
            return res.status(400).json({
                error: dbErrorHandle(err)
            });
        }
        res.json(projects);
    });
}

export {createProject, projectById, readProject, updateProject, deleteProject, allProjects};