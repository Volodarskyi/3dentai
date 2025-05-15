import { Request, Response, NextFunction } from "express";
import {Scan} from "@/models/Scan";
import {EScanStatus} from "@/types/enums/ScanEnums";
import {AppError} from "@/utils/errorUtils";
import {sendResSuccess} from "@/utils/responseUtils";
import mongoose from "mongoose";

// POST /api/scan/add
const add = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { doctorId, teeth, resultAI, questions } = req.body;
        const user = req.user;

        console.log('[API] | [api/scan/add] | [req.body] :', req.body);
        console.log('[API] | [api/scan/add] | [req.user] :', req.user);

        if (!user?.userId) {
            throw new AppError('Unauthorized: Missing user data', 401);
        }

        if (!doctorId || !Array.isArray(questions) || questions.length === 0) {
            throw new AppError('Missing required fields: doctorId or questions[]', 400);
        }

        const newScan = await Scan.create({
            userId: user.userId,
            doctorId,
            teeth,
            resultAI,
            questions,
            status: EScanStatus.IN_REVIEW,
        });

        sendResSuccess(res, 'Scan created successfully', {newScan});

    } catch (error) {
        console.error("[Scan Add Error]", error);
        next(error);
    }
};

// GET /api/scan/:id
const getById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const currentUser = req.user;
        console.log('[API] | [api/scan/:id] | [req.params] :', req.params);
        console.log('[API] | [api/scan/:id] | [req.user] :', req.user);

        if (!currentUser?.userId) {
            throw new AppError("Unauthorized: Missing data", 401);
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid scan ID format", 400);
        }

        const scan = await Scan.findById(id);

        if (!scan) {
            throw new AppError("Scan not found", 404);
        }

        // 🔐 security check for access
        const isOwnerOrDoctor =
            scan.userId.toString() === currentUser.userId ||
            scan.doctorId.toString() === currentUser.userId;

        if (!isOwnerOrDoctor) {
            throw new AppError("Access denied: You do not have permission to view this scan", 403);
        }

        sendResSuccess(res, `Scan by id: ${id}`, {scan});
    } catch (error) {
        console.error("[Scan GetById Error]:", error);
        next(error);
    }
};

// GET /api/scan/user
const getAllByUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const user = req.user;
        console.log('[API] | [api/scans/user] | [req.user] :', user);

        if (!user?.userId) {
            throw new AppError("Unauthorized: Missing user data", 401);
        }

        const scans = await Scan.find({ userId: user.userId }).sort({ createdAt: -1 });

        sendResSuccess(res, `Scan by user id: ${user.userId}`, {scans});

    } catch (error) {
        console.error("[Scan GetAllByUser Error]:", error);
        next(error);
    }
};

// GET /api/scans/doctor?userId=...&status=...
const getAllByDoctor = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const doctor = req.user;
        console.log('[API] | [/api/scans/doctor?userId=...&status=...] | [doctor] :', doctor);

        if (!doctor?.userId) {
            throw new AppError("Unauthorized: Missing doctor data", 401);
        }

        if (doctor.role !== "dentist") {
            throw new AppError("Access denied. Only doctors can access this route", 403);
        }

        const { userId, status } = req.query;

        const query: any = {
            doctorId: doctor.userId
        };

        if (userId && typeof userId === "string") {
            query.userId = userId;
        }

        if (status && typeof status === "string") {
            query.status = status;
        }

        const scans = await Scan.find(query).sort({ createdAt: -1 });

        sendResSuccess(res,`${doctor.firstName} ${doctor.lastName} scans loaded successfully`, {scans});
    } catch (error) {
        console.error("[Scan GetAllByDoctor Error]:", error);
        next(error);
    }
};

export default {
    add,
    getById,
    getAllByUser,
    getAllByDoctor
}
