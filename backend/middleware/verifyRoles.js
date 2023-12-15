const asyncHandler = require("express-async-handler")

const verifyRoles = (...assumedRoles) => {
    return asyncHandler(async (req, res, next) => {
        if(!req?.user.roles) {
            res.status(401)
            throw new Error("User is not authorized")
        }

        const rolesArray = [...assumedRoles]
        const reqRoles = req.user.roles
        const result = reqRoles.map(role => rolesArray.includes(role)).find(val => val === true);
        
        if(!result) {
            res.status(401)
            throw new Error("User is not authorized")
        }
        next();
    })
}

module.exports = verifyRoles