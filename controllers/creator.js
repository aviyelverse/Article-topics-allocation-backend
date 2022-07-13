import Creator from '../models/creator.js';

const signup = (req, res) => {
   const Creator = new Creator({    // create a new Creator object
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        about: req.body.about,
        role: req.body.role,
        history: req.body.history
    });
    Creator.save()
        .then(() => {
            res.send({
                message: 'Creator created successfully'
            });
        }   // save the new Creator object to the database
        )
        .catch(err => {
            res.status(400).send({
                message: err.message
            });
        }
        );
}   

export {signup};