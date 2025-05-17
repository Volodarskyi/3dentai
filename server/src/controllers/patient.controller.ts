import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/errorUtils";
import { sendResSuccess } from "@/utils/responseUtils";
import {User} from "@/models/User";

// GET /patient/doctor
const getDoctorDataByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const patient = req.user;

        console.log('[API] | [/api/patient/doctor] | [req.user] :', req.user);

        if (!patient) {
            throw new AppError("Unauthorized: Missing data", 401);
        }

        // Check access: user must be doctor or patient of this scan
        const patientFullData = await User.findById(patient.userId);
        console.log('FULL DATA:',patientFullData);
        if (!patientFullData) {
            throw new AppError("Patient is not found", 404);
        }

        if (!patientFullData.doctorId) {
            throw new AppError("This patient don't have doctor ID", 404);
        }

        const myDoctorData = await User.findById(patientFullData.doctorId)

        if (!myDoctorData) {
            throw new AppError("Dentist not found", 404);
        }

        const dentistData = {
            email: myDoctorData.email,
            dentistId: myDoctorData._id,
            firstName: myDoctorData.firstName,
            lastName: myDoctorData.lastName,
            phone: myDoctorData.phone,
        }

        sendResSuccess(res, `Doctor belong to patient with ID:${patient.userId}`, {dentistData
        });
    } catch (error) {
        console.error("[Message GetByScanId Error]:", error);
        next(error);
    }
}

export default {
    getDoctorDataByUserId
}
