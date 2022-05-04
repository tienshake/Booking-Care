import actionTypes from './actionTypes';
import {
    getAllCodeService,
    createNewUserService,
    getAllUser,
    deleteUserService,
    editUserService,
    getTopDocsService,
    getAllDoctor,
    saveDataDetailDoctor,
    getDetailDoctorById,
    getExtraInfoDoctorById,
    getAllSpecialty
} from '../../services/userService';
import { toast } from 'react-toastify';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            const res = await getAllCodeService('gender');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (e) {
            dispatch(fetchGenderFail());
            console.log('fetchGenderStart error:', e)
        }
    }
}


export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

//position

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllCodeService('position');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFail());
            }
        } catch (e) {
            dispatch(fetchGenderFail());
            console.log('fetchGenderStart error:', e)
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})
//role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllCodeService('role');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFail());
            }
        } catch (e) {
            dispatch(fetchGenderFail());
            console.log('fetchGenderStart error:', e)
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            toast.success("Create user success!")
            const res = await createNewUserService(data);
            console.log('check redux create user:', res)
            if (res && res.errCode === 0) {
                dispatch(saveUserSusses());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('fetchGenderStart error:', e)
        }
    }
}

export const saveUserSusses = (roleData) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

//redux user all
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllUser('ALL');
            if (res && res.errCode === 0) {
                const users = res.user.reverse();
                dispatch(fetchAllUserSuccess(users));
            } else {
                dispatch(fetchAllUserFailed());
            }
        } catch (e) {
            dispatch(fetchAllUserFailed());
            console.log('fetchGenderStart error:', e)
        }
    }
}


export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})

//delete user

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            const res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete user success!")
                dispatch(deleteUserSuccess());
            } else {
                toast.success("Delete the user error!")

                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.log('delete user error:', e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})
//edit 
// EDIT_USER_SUCCESS
// EDIT_USER_FAILED

export const editUSer = (user) => {
    return async (dispatch, getState) => {
        try {
            const res = await editUserService(user);
            if (res && res.errCode === 0) {
                toast.success("Edit user success!")
                dispatch(editUserSuccess());
            } else {
                toast.success("Edit the user error!!!")
                dispatch(editUserFailed());
            }
        } catch (e) {
            dispatch(editUserFailed());
            console.log('Edit user error:', e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})
//top doctor
// const resDoctor = await getTopDocsService(10);
export const fetchTopDocs = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getTopDocsService(10);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctor: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
            })
        }
    }
}

//get doctor
export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllDoctor();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
            })
        }
    }
}
// SAVE_DETAIL_DOCTOR_SUCCESS

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await saveDataDetailDoctor(data);
            if (res && res.errCode === 0) {
                toast.success("Save detail doctor success")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                toast.error("Error detail doctor ")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            console.log('Error detail doctor ', e)
            toast.error("Error detail doctor ")
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            })
        }
    }
}
//get detail doctor by id


export const fetchDetailDoctorById = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await getDetailDoctorById(id);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_DETAIL_DOCTOR_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_DETAIL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            console.log('Error detail by id doctor ', e)
            toast.success("Error detail detail by id doctor ")
            dispatch({
                type: actionTypes.FETCH_DETAIL_DOCTOR_FAILED,
            })
        }
    }
}

export const fetchTimeAllScheduleDoctor = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllCodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_CODE_TIME_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_CODE_TIME_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_CODE_TIME_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_ALL_CODE_TIME_FAILED,
            })
        }
    }
}

//get price doctor
export const getRequireDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_DOCTOR_REQUIRE_INFO_START
            })
            const resPrice = await getAllCodeService('price');
            const resPayment = await getAllCodeService('payment');
            const resProvince = await getAllCodeService('province');
            const resSpecialty = await getAllSpecialty();
            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_DOCTOR_REQUIRE_INFO_SUCCESS,
                    data: {
                        resPrice: resPrice.data,
                        resPayment: resPayment.data,
                        resProvince: resProvince.data,
                        resSpecialty: resSpecialty.data
                    }
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_DOCTOR_REQUIRE_INFO_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_DOCTOR_PRICE_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_DOCTOR_REQUIRE_INFO_FAILED
            })
        }
    }
}
//get doctor info

export const fetchExtraInfoDoctorById = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_DOCTOR_EXTRA_INFO_START
            })
            const res = await getExtraInfoDoctorById(id);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_DOCTOR_EXTRA_INFO_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_DOCTOR_EXTRA_INFO_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_DOCTOR_EXTRA_INFO_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_DOCTOR_EXTRA_INFO_FAILED
            })
        }
    }
}