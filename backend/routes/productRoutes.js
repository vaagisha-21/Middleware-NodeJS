const express = require("express");
const router = express.Router();
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");
const validateToken = require("../middleware/validateTokenHandler");
const verifyRoles = require("../middleware/verifyRoles");


router.use(validateToken);
router.route("/").get(getProducts).post(verifyRoles("admin"), createProduct)
router.route("/:id").get(getProduct).put(verifyRoles("admin", "supervisor"),updateProduct).delete(verifyRoles("admin"), deleteProduct)


module.exports = router