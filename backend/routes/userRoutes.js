const express = require("express")
const { registerUser, loginUser, currentUser, getUsersList, updateUserDetails, deleteUser } = require("../controllers/userController")
const validateToken = require("../middleware/validateTokenHandler")
const verifyRoles = require("../middleware/verifyRoles")
const router = express.Router()


router.post("/register", registerUser)
router.post("/login", loginUser)
router.use(validateToken);
router.get("/current", currentUser)
router.get("/usersList", verifyRoles("admin"), getUsersList)
router.route("/:id").patch(verifyRoles("admin"), updateUserDetails).delete(verifyRoles("admin"), deleteUser)
module.exports = router