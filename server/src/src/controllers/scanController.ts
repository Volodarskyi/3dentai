import { Request, Response } from 'express';
import { sendErrorLog } from '@/utils/api';
import { Scan } from '@/models/Scan';
import { Message } from '@/models/Message';
import { EScanStatus } from '@/types/enums/ScanEnums';
import mongoose from 'mongoose';

const getScanByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const scan = await Scan.findById(id).populate('message_id');

    if (!scan) {
      res.status(404).json({
        result: 'ERROR',
        data: null,
        message: 'Scan not found',
        details: `No scan found with ID: ${id}`,
      });
      return;
    }

    res.status(200).json({
      result: 'SUCCESS',
      data: scan,
      message: 'Scan retrieved successfully',
      details: `Retrieved scan with ID: ${id}`,
    });
  } catch (e) {
    console.error('ERROR (Scan.route-getScanById):', e);
    sendErrorLog({
      res,
      url: `GET api/scans/${req.params.id}`,
      error: (e as Error).message,
    });
    res.status(500).json({
      result: 'ERROR',
      data: null,
      message: 'Server ERROR!',
      details: 'In route: get scan by ID',
    });
  }
};

const getScansByDoctorIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { doctorId } = req.params;

    const scans = await Scan.find({
      doctor_id: new mongoose.Types.ObjectId(doctorId),
    }).populate('message_id');

    res.status(200).json({
      result: 'SUCCESS',
      data: scans,
      message: 'Scans retrieved successfully',
      details: `Retrieved ${scans.length} scans for doctor with ID: ${doctorId}`,
    });
  } catch (e) {
    console.error('ERROR (Scan.route-getScansByDoctorId):', e);
    sendErrorLog({
      res,
      url: `GET api/scans/doctor/${req.params.doctorId}`,
      error: (e as Error).message,
    });
    res.status(500).json({
      result: 'ERROR',
      data: null,
      message: 'Server ERROR!',
      details: 'In route: get scans by doctor ID',
    });
  }
};

const getScansByUserIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params;

    const scans = await Scan.find({
      user_id: new mongoose.Types.ObjectId(userId),
    }).populate('message_id');

    res.status(200).json({
      result: 'SUCCESS',
      data: scans,
      message: 'Scans retrieved successfully',
      details: `Retrieved ${scans.length} scans for user with ID: ${userId}`,
    });
  } catch (e) {
    console.error('ERROR (Scan.route-getScansByUserId):', e);
    sendErrorLog({
      res,
      url: `GET api/scans/user/${req.params.userId}`,
      error: (e as Error).message,
    });
    res.status(500).json({
      result: 'ERROR',
      data: null,
      message: 'Server ERROR!',
      details: 'In route: get scans by user ID',
    });
  }
};

const createScanController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const scanData = req.body;

    const newMessage = new Message({ messages: [] });
    const savedMessage = await newMessage.save();

    // Convert string IDs to ObjectId
    const processedScanData = {
      ...scanData,
      doctor_id: new mongoose.Types.ObjectId(scanData.doctor_id),
      user_id: new mongoose.Types.ObjectId(scanData.user_id),
    };

    const newScan = new Scan({
      ...processedScanData,
      message_id: savedMessage._id,
      status: EScanStatus.DRAFT,
    });

    const savedScan = await newScan.save();

    res.status(201).json({
      result: 'SUCCESS',
      data: savedScan,
      message: 'Scan created successfully',
      details: `Created scan with ID: ${savedScan._id}`,
    });
  } catch (e) {
    console.error('ERROR (Scan.route-createScan):', e);
    sendErrorLog({
      res,
      url: 'POST api/scans',
      error: (e as Error).message,
    });
    res.status(500).json({
      result: 'ERROR',
      data: null,
      message: 'Server ERROR!',
      details: 'In route: create scan',
    });
  }
};

export default {
  getScanByIdController,
  getScansByDoctorIdController,
  getScansByUserIdController,
  createScanController,
};
