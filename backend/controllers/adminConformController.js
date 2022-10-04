const TrainerLeave = require("../models/trainerLeaveModel");
const asyncHandler = require("express-async-handler");

const getTrainerLeave = asyncHandler(async (req, res) => {
	const leave = await TrainerLeave.find();
	res.json(leave);
});


const approveTrainerLeaveByAdmin = asyncHandler(async (req, res) => {
	const { approved } = req.body;

	const leave = await TrainerLeave.findById(req.params.id);

	if (leave) {
		leave.approved = approved;

		const approvedLeave = await leave.save();
		res.json(approvedLeave);
	} else {
		res.status(404);
		throw new Error("Leave not Found");
	}
});



module.exports = {
	getTrainerLeave,
	approveTrainerLeaveByAdmin,
};
