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

// Hot topics and newly added

// topicPopularity

const allArticles = (req, res) => {
    let articleOrder = req.query.order ? req.query.order : "asc";
    let articleSortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let articleLimit = req.query.limit ? parseInt(req.query.limit) : 100;

    Article.find().select("-photo").populate("project").sort([[articleSortBy, articleOrder]]).limit(articleLimit).exec((err, articles) => {
        if (err) {
            return res.status(400).json({
                error: dbErrorHandle(err)
            });
        }
        res.send(articles);
    }
    );
}

const relatedArticles = (req, res) => {
    let articleLimit = req.query.limit ? parseInt(req.query.limit) : 6;
    Article.find({ _id: { $ne: req.article }, category: req.article.project })
        .limit(articleLimit)
        .populate("project", "_id name")
        .exec((err, articles) => {
            if (err) {
                return res.status(400).json({
                    error: "Article not found"
                });
            }
            res.json(articles);
        });
}

const allArticlesProjects = (req, res) => {
    Article.distinct("project", (err, projects) => {
        if (err) {
            return res.status(400).json({
                error: dbErrorHandle(err)
            });
        }
        res.json(projects);
    }
    );
}

// this code will
// list article by search
// show projects in radio box checboxes article availability 
// api request to show the article to the creators based on what they want

const articleSearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};


    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "topicPopularity") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Article.find(findArgs).select("-photo").populate("project").sort([[sortBy, order]]).skip(skip).limit(limit).exec((err, articles) => {
        if (err) {
            return res.status(400).json({
                error: dbErrorHandle(err)
            });
        }
        res.json({
            size: articles.length,
            articles
        });
    }
    );
}

const articleImages = (req, res, next) => {
    if (req.article.photo.data) {
        res.set("Content-Type", req.article.photo.contentType);
        return res.send(req.article.photo.data);
    }
    next();
}


export {createArticle, articleById, readArticle, deleteArticle, updateArticle, allArticles, relatedArticles, allArticlesProjects, articleSearch};