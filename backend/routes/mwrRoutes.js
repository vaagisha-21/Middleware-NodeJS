const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const verifyRoles = require("../middleware/verifyRoles");
const { getMwrDataList, createMwrData, getMwrData, updateMwrData, deleteMwrData } = require("../controllers/mwrController");


router.use(validateToken);
router.route("/").get(getMwrDataList).post(verifyRoles("admin"), createMwrData)
router.route("/:id").get(getMwrData)
                    .put(verifyRoles("admin", "supervisor"),updateMwrData)
                    .patch(verifyRoles("admin", "supervisor"),updateMwrData)
                    .delete(verifyRoles("admin"), deleteMwrData)


module.exports = router