const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',


    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'ADMIN_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',
    //admin
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAIL: 'FETCH_GENDER_FAIL',

    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAIL: 'FETCH_POSITION_FAIL',

    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAIL: 'FETCH_ROLE_FAIL',

    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILED: 'CREATE_USER_FAILED',

    DELETE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    DELETE_USER_FAILED: 'CREATE_USER_FAILED',

    FETCH_ALL_USER_SUCCESS: 'FETCH_ALL_USER_SUCCESS',
    FETCH_ALL_USER_FAILED: 'FETCH_ALL_USER_FAILED',

    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAILED: 'EDIT_USER_FAILED',


    FETCH_TOP_DOCTOR_SUCCESS: ' FETCH_TOP_DOCTOR_SUCCESS',
    FETCH_TOP_DOCTOR_FAILED: 'FETCH_TOP_DOCTOR_FAILED',

    FETCH_ALL_DOCTOR_SUCCESS: ' FETCH_ALL_DOCTOR_SUCCESS',
    FETCH_ALL_DOCTOR_FAILED: 'FETCH_ALL_DOCTOR_FAILED',

    SAVE_DETAIL_DOCTOR_SUCCESS: 'SAVE_DETAIL_DOCTOR_SUCCESS',
    SAVE_DETAIL_DOCTOR_FAILED: 'SAVE_DETAIL_DOCTOR_FAILED',

    FETCH_DETAIL_DOCTOR_SUCCESS: 'FETCH_DETAIL_DOCTOR_SUCCESS',
    FETCH_DETAIL_DOCTOR_FAILED: 'FETCH_DETAIL_DOCTOR_FAILED',

    FETCH_ALL_CODE_TIME_SUCCESS: 'FETCH_ALL_CODE_TIME_SUCCESS',
    FETCH_ALL_CODE_TIME_FAILED: 'FETCH_ALL_CODE_TIME_FAILED',

    FETCH_DOCTOR_REQUIRE_INFO_START: 'FETCH_DOCTOR_REQUIRE_INFO_START',
    FETCH_DOCTOR_REQUIRE_INFO_SUCCESS: 'FETCH_DOCTOR_REQUIRE_INFO_SUCCESS',
    FETCH_DOCTOR_REQUIRE_INFO_FAILED: 'FETCH_DOCTOR_REQUIRE_INFO_FAILED',

    FETCH_DOCTOR_EXTRA_INFO_START: 'FETCH_DOCTOR_EXTRA_INFO_START',
    FETCH_DOCTOR_EXTRA_INFO_SUCCESS: 'FETCH_DOCTOR_EXTRA_INFO_SUCCESS',
    FETCH_DOCTOR_EXTRA_INFO_FAILED: 'FETCH_DOCTOR_EXTRA_INFO_FAILED'
})

export default actionTypes;