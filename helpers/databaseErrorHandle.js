// database error handler
// This function will be used to handle database errors.

const dbErrorHandle = (err) => {
    let message = "";
    if (err.code === 11000) {
        message = "Duplicate field value entered";
    } else {
        message = "Database error";
    }
    return message;
}

export { dbErrorHandle };