// validator

const creatorSignUpValidator = (req, res, next) => {
    req.check("name", "Name is required").notEmpty();
    req.check("email", "Email is required").notEmpty().matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).withMessage("Email is invalid");
    req.check("password", "Password is required").notEmpty();
    req.check("password", "Password must be at least 6 characters").isLength({ min: 6 }).withMessage("Password must be at least 6 characters");

     
    const errors = req.validationErrors();
      if (errors) {
        res.status(400).json({
            message: errors
        });
    }
    next();
}

export { creatorSignUpValidator };