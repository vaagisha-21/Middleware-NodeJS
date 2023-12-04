const express = require("express");
const router = express.Router();
const {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
} = require("../controllers/employeeController");
const validateToken = require("../middleware/validateTokenHandler");
const verifyRoles = require("../middleware/verifyRoles");


router.use(validateToken);
router.route("/").get(getEmployees).post(verifyRoles("admin"), createEmployee)
router.route("/:id").get(getEmployee).put(verifyRoles("admin", "supervisor"),updateEmployee).delete(verifyRoles("admin"), deleteEmployee)


module.exports = router