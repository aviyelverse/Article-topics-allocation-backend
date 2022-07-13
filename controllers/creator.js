import Creator from '../models/creator.js';

const signup = (req, res) => {
    console.log("req.body",req.body);
   const creator = new Creator(req.body);
   creator.save()
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

