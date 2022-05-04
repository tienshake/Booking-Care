import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';
import patientController from '../controllers/patientController';
import specialtyController from '../controllers/specialtyController'
const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/crud", homeController.getCrud);
    router.post("/post-crud", homeController.postCrud);
    router.get("/get-crud", homeController.displayGetCrud);
    router.get("/edit-crud", homeController.getEditCrud);
    router.post("/put-crud", homeController.putCrud);
    router.get("/delete-crud", homeController.deleteCrud);
    //API======================================================
    router.post("/api/login", userController.handleLogin);
    router.get("/api/getAllUser", userController.handleGetAllUser);
    router.post("/api/create-user", userController.handleCreateUser);
    router.put("/api/edit-user", userController.handleEditUser);
    router.delete("/api/delete-user", userController.handleDeleteUser);
    router.get("/api/AllCode", userController.handleAllCode);

    router.get("/api/top-doctor-home", doctorController.getDoctorHome);
    router.get("/api/get-all-doctor", doctorController.getAllDoctor);
    router.post("/api/save-info-doctor", doctorController.postSaveInfoDoctor);
    router.get("/api/get-detail-doctor-by-id", doctorController.getDetailDoctorById);
    router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
    router.get("/api/get-schedule-doctor-by-date", doctorController.getScheduleDoctorByDate);
    router.get("/api/get-extra-info-doctor-by-id", doctorController.getExtraInfoDoctorById);
    router.get("/api/get-profile-doctor-by-id", doctorController.getProfileDoctorById);
    router.get("/api/get-list-patient-for-doctor", doctorController.getListPatientsForDoctor);


    router.post("/api/patient-book-appointment", patientController.postBookAppointment);
    router.post("/api/verify-book-appointment", patientController.verifyBookAppointment);

    router.post("/api/create-new-specialty", specialtyController.createNewSpecialty);
    router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
    router.get("/api/get-detail-specialty-by-id", specialtyController.getSpecialtyById);

    return app.use("/", router);
}

export default initWebRoutes;