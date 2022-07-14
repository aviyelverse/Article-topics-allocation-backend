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

const readCreatorProfile = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

const updateCreatorProfile = (req, res) => {
    Creator.findOneAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true }, (err, creator) => {
        if (err) {
            return res.status(400).json({
                error: "Creator Not authorized"
            });
        }
        creator.hashed_password = undefined;
        creator.salt = undefined;
        res.json(creator);
    });
}


export {creatorById, readCreatorProfile, updateCreatorProfile};