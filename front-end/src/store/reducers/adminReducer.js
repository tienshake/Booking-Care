import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    gender: [],
    roles: [],
    position: [],
    users: [],
    topDoctor: [],
    allDoctor: [],
    detailDoctorById: {},
    allScheduleTime: [],
    //require doctor info
    allRequireDoctorInfo: [],
    extraInfoDoctor: {}
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state };
            copyState.gender = action.data;
            copyState.isLoadingGender = false;
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoadingGender = false;
            state.gender = []
            return {
                ...state,

            }
        //POSITION
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.position = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAIL:
            state.position = []
            return {
                ...state,

            }
        //ROLE
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.roles = []
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctor = action.dataDoctor;
            return {
                ...state,

            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.topDoctor = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctor = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.allDoctor = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_DETAIL_DOCTOR_SUCCESS:
            state.detailDoctorById = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_DETAIL_DOCTOR_FAILED:
            state.detailDoctorById = {};
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CODE_TIME_SUCCESS:
            state.allScheduleTime = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CODE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state,
            }
        //require doctor info
        // allRequireDoctorInfo
        case actionTypes.FETCH_DOCTOR_REQUIRE_INFO_SUCCESS:
            state.allRequireDoctorInfo = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_DOCTOR_REQUIRE_INFO_FAILED:
            state.allRequireDoctorInfo = [];
            return {
                ...state,
            }
        //extra doctor info
        case actionTypes.FETCH_DOCTOR_EXTRA_INFO_SUCCESS:
            state.extraInfoDoctor = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_DOCTOR_EXTRA_INFO_FAILED:
            state.extraInfoDoctor = {};
            return {
                ...state,
            }
        default:
            return state;
    }
}
export default adminReducer;