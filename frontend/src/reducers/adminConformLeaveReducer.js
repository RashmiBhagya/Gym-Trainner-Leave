import {
  
    ADMINCONFORMLEAVE_LIST_FAIL,
    ADMINCONFORMLEAVE_LIST_REQUEST,
    ADMINCONFORMLEAVE_LIST_SUCCESS,
    ADMINCONFORMLEAVE_UPDATE_FAIL,
    ADMINCONFORMLEAVE_UPDATE_REQUEST,
    ADMINCONFORMLEAVE_UPDATE_SUCCESS,

    
  } from "../constants/adminConformLeaveConstants";

export const AdminConformLeaveListReducer = (state = { leave: [] }, action) => {
    switch (action.type) {
      case ADMINCONFORMLEAVE_LIST_REQUEST:
        return { loading: true };
      case ADMINCONFORMLEAVE_LIST_SUCCESS:
        return { loading: false, trainerLeave: action.payload };
      case ADMINCONFORMLEAVE_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  export const AdminConformLeaveUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMINCONFORMLEAVE_UPDATE_REQUEST:
        return { loading: true };
      case ADMINCONFORMLEAVE_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case ADMINCONFORMLEAVE_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };


