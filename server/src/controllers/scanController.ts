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
      photos: [],
      status: 'draft',
      createdTime: '2025-04-18T06:06:38.214Z',
      updateTime: '2025-04-18T06:06:38.214Z',
      questions: [
        {
          type: 'radio',
          value: 'Do you have pain?',
          options: [
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ],
          answer: ['true'],
        },
        {
          type: 'checkbox',
          value: 'Where exactly do you feel pain?',
          options: [
            { label: 'Upper left', value: 'upper_left' },
            { label: 'Upper back', value: 'upper_back' },
            { label: 'Upper right', value: 'upper_right' },
            { label: 'Upper front', value: 'upper_front' },
            { label: 'Lower left', value: 'lower_left' },
            { label: 'Lower right', value: 'lower_right' },
            { label: 'Lower front', value: 'lower_front' },
          ],
          answer: ['upper_left', 'lower_right'],
        },
        {
          type: 'radio',
          value: 'Is the pain constant or does it occur periodically?',
          options: [
            { label: 'Constant', value: 'constant' },
            { label: 'Periodically', value: 'periodically' },
          ],
          answer: ['periodically'],
        },
        {
          type: 'radio',
          value:
            'How would you describe the pain — sharp, dull, aching, or pulsating?',
          options: [
            { label: 'Sharp', value: 'sharp' },
            { label: 'Dull', value: 'dull' },
            { label: 'Aching', value: 'aching' },
            { label: 'Pulsating', value: 'pulsating' },
          ],
          answer: ['aching'],
        },
        {
          type: 'radio',
          value: 'When did the pain first appear?',
          options: [
            { label: '1 day ago', value: '1_day' },
            { label: '3 days ago', value: '3_days' },
            { label: '5 days ago', value: '5_days' },
            { label: '7 days ago', value: '7_days' },
            { label: 'More than 7 days ago', value: 'more_than_7_days' },
          ],
          answer: ['3_days'],
        },
        {
          type: 'radio',
          value: 'Is there a reaction to hot or cold?',
          options: [
            { label: 'No', value: 'no' },
            { label: 'Yes, to cold', value: 'cold' },
            { label: 'Yes, to hot', value: 'hot' },
            { label: 'Yes, to both', value: 'both' },
          ],
          answer: ['cold'],
        },
        {
          type: 'checkbox',
          value: 'Does the pain increase when biting or chewing?',
          options: [
            { label: 'No increase', value: 'no_increase' },
            { label: 'When biting', value: 'biting' },
            { label: 'When chewing', value: 'chewing' },
          ],
          answer: ['biting', 'chewing'],
        },
        {
          type: 'radio',
          value:
            'Have you had an injury or have you bitten something hard recently?',
          options: [
            { label: 'No', value: 'no' },
            { label: 'Injury', value: 'injury' },
            { label: 'Bit something hard', value: 'bit_hard' },
          ],
          answer: ['bit_hard'],
        },
        {
          type: 'checkbox',
          value: 'Do neighboring teeth, gums, or jaw hurt?',
          options: [
            { label: 'No', value: 'no' },
            { label: 'Teeth', value: 'teeth' },
            { label: 'Gums', value: 'gums' },
            { label: 'Jaw', value: 'jaw' },
          ],
          answer: ['teeth', 'gums'],
        },
        {
          type: 'checkbox',
          value: 'Is there swelling, redness, or pus in this area?',
          options: [
            { label: 'No', value: 'no' },
            { label: 'Swelling', value: 'swelling' },
            { label: 'Redness', value: 'redness' },
            { label: 'Pus', value: 'pus' },
          ],
          answer: ['swelling'],
        },
      ],
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

const addQuestionsToScanController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { questions } = req.body;

    // Validate input
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      res.status(400).json({
        result: 'ERROR',
        data: null,
        message: 'Invalid input',
        details: 'Questions must be a non-empty array',
      });
      return;
    }

    // Find the scan
    const scan = await Scan.findById(id);

    if (!scan) {
      res.status(404).json({
        result: 'ERROR',
        data: null,
        message: 'Scan not found',
        details: `No scan found with ID: ${id}`,
      });
      return;
    }

    // Update the scan with the new questions
    const updatedScan = await Scan.findByIdAndUpdate(
      id,
      { $set: { questions: questions } },
      { new: true },
    );

    res.status(200).json({
      result: 'SUCCESS',
      data: updatedScan,
      message: 'Questions added to scan successfully',
      details: `Added ${questions.length} questions to scan with ID: ${id}`,
    });
  } catch (e) {
    console.error('ERROR (Scan.route-addQuestionsToScan):', e);
    sendErrorLog({
      res,
      url: `PUT api/scans/${req.params.id}/questions`,
      error: (e as Error).message,
    });
    res.status(500).json({
      result: 'ERROR',
      data: null,
      message: 'Server ERROR!',
      details: 'In route: add questions to scan',
    });
  }
};

export default {
  getScanByIdController,
  getScansByDoctorIdController,
  getScansByUserIdController,
  createScanController,
  addQuestionsToScanController,
};
