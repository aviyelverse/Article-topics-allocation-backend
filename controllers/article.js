import _ from 'lodash';
import formidable from 'formidable'; // for file upload
import fs from "fs";
import Article from "../models/article.js";
import {dbErrorHandle} from "../helpers/databaseErrorHandle.js";


const articleById = (req, res, next, id) => {
    Article.findById(id).exec((err, article) => {
        if (err || !article) {
            return res.status(400).json({
                error: "article not found"
            });
        }
        req.article = article;
        next();
    });
}

const readArticle = (req, res) => {
    req.article.photo = undefined;
    return res.json(req.article);
}

const createArticle = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Article project Images could not be uploaded"
            });
        }

        // check all fields 
        const {
            name,
            description,
            project,
            quantity,
            assigned
        } = fields;

        if (
            !name ||
            !description ||
            !project ||
            !quantity ||
            !assigned
        ) {
            return res.status(400).json({
                error: "Fields required"
            });
        }

        let article = new Article(fields);

        if (files.photo) {
            if (files.photo.size > 7000000) {
                return res.status(400).json({
                    error: "Image too large"
                });
            }
            article.photo.data = fs.readFileSync(files.photo.path);
            article.photo.contentType = files.photo.type;
        }

        article.save((err, result) => {
            if (err) {
                return res.staus(400).json({
                    error: dbErrorHandle(err)
                });
            }
            res.json(result);
        });
    });
};


const deleteArticle = (req, res) => {
    let article = req.article;
    article.remove((err, article) => {
        if (err) {
            return res.status(400).json({
                error: dbErrorHandle(err)
            });
        }
        res.json({message: "Article deleted successfully" });
    });
}

const updateArticle = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Article project Images could not be uploaded"
            });
        }

        // check all fields 
        const {
            name,
            description,
            project,
            quantity,
            assigned
        } = fields;

        if (
            !name ||
            !description ||
            !project ||
            !quantity ||
            !assigned
        ) {
            return res.status(400).json({
                error: "Fields required"
            });
        }

        let article = req.article;
        article = _.extend(article, fields);

        if (files.photo) {
            if (files.photo.size > 7000000) {
                return res.status(400).json({
                    error: "Image too large"
                });
            }
            article.photo.data = fs.readFileSync(files.photo.path);
            article.photo.contentType = files.photo.type;
        }

        article.save((err, result) => {
            if (err) {
                return res.staus(400).json({
                    error: dbErrorHandle(err)
                });
            }
            res.json(result);
        });
    });
}


export {createArticle, articleById, readArticle, deleteArticle, updateArticle};