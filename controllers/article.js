import _ from 'lodash';
import formidable from 'formidable'; // for file upload
import fs from "fs";
import Article from "../models/article.js";
import {dbErrorHandle} from "../helpers/databaseErrorHandle.js";

const createArticle = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Article project Images could not be uploaded"
            });
        }
        let article = new Article(fields);

        if (files.photo) {
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


export {createArticle};