const express = require("express");
const {
	registerTrainer,
	authTrainer,
	getTrainerProfile,
	updateTrainerProfile,
	deleteTrainerProfile,
} = require("../controllers/trainerController");
const { getCustomers, getCustomerProfileById } = require("../controllers/customerController");
const {
	createTrainerLeave,
	getTrainerLeaveById,
	updateTrainerLeave,
	deleteTrainerLeave,
	getTrainerLeaveForEachTrainer,
} = require("../controllers/trainerLeaveController");

const { protect } = require("../middleware/authTrainerMiddleware");
const router = express.Router();

//Routes for Trainer Account Operations
router.route("/register").post(registerTrainer);
router.route("/login").post(authTrainer);
router.route("/view").get(protect, getTrainerProfile);
router.route("/edit").put(protect, updateTrainerProfile);
router.route("/delete").delete(protect, deleteTrainerProfile);

//Routes for Customer account operations by trainer
router.route("/customers").get(protect, getCustomers);
router.route("/customer/profile/view/:_id").get(protect, getCustomerProfileById);

//Routes for Trainer leave management by trainer
router.route("/personal/trainer_leave/create").post(protect, createTrainerLeave);
router.route("/personal/trainer_leaves/:id").get(protect, getTrainerLeaveForEachTrainer);
router
	.route("/personal/trainer_leave/:id")
	.get(protect, getTrainerLeaveById)
	.put(protect, updateTrainerLeave)
	.delete(protect, deleteTrainerLeave);


module.exports = router;
