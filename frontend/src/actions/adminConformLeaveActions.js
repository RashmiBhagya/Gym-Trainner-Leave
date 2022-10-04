import {
    ADMINCONFORMLEAVE_LIST_FAIL,
    ADMINCONFORMLEAVE_LIST_REQUEST,
    ADMINCONFORMLEAVE_LIST_SUCCESS,
    ADMINCONFORMLEAVE_UPDATE_FAIL,
    ADMINCONFORMLEAVE_UPDATE_REQUEST,
    ADMINCONFORMLEAVE_UPDATE_SUCCESS,
  } from "../constants/adminConformLeaveConstants";
  import axios from "axios";
  import swal from "sweetalert";

  export const adminConformLeaveActions = () => async (dispatch, getState) => {
    console.log("addmin confirm leave");
    try {
        dispatch({
            type:ADMINCONFORMLEAVE_LIST_REQUEST ,
        });

        const {
            admin_Login: { adminInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${adminInfo.token}`,
            },
        };

        const { data } = await axios.get(`/user/admin/trainer/trainer_leaves?id=${adminInfo._id}`, config);
        console.log(data);
        dispatch({
            type:ADMINCONFORMLEAVE_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type:ADMINCONFORMLEAVE_LIST_FAIL,
            payload: message,
        });
    }
};


export const updateAdminApproveLeaveAction =
	(
		id,
		fullName,
		nic,
		division,
		number_of_days,
		date_for_commencing_leave,
		date_for_resuming_duties,
		reasons_for_leave,
        approved
	) =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: ADMINCONFORMLEAVE_UPDATE_REQUEST });

			const {
				admin_Login: { adminInfo },
			} = getState();
			const config = {
				headers: {
					Authorization: `Bearer ${adminInfo.token}`,
				},
			};
			const { data } = await axios.put(
				`/user/admin/trainer/trainer_leaves/approve/${id}`,
				{
					fullName,
					nic,
					division,
					number_of_days,
					date_for_commencing_leave,
					date_for_resuming_duties,
					reasons_for_leave,
                    approved
				},
				config
			);

			swal({
				title: "Success !!!",
				text: "Leave Conform Successful.",
				icon: "success",
				timer: 2000,
				button: false,
			});
			setTimeout(function () {
				window.location.href = "/adminConformLeave";
			}, 2000);

			dispatch({ type: ADMINCONFORMLEAVE_UPDATE_SUCCESS, payload: data });
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: ADMINCONFORMLEAVE_UPDATE_FAIL,
				payload: message,
			});
		}
	};



