import Creator from "../models/creator.js";

const creatorById = (req, res, next, id) => {
    Creator.findById(id).exec((err, creator) => {
        if (err || !creator) {
            return res.status(400).json({
                error: "creator not found"
            });
        }
        req.profile = creator;
        next();
    });
};

export {creatorById};