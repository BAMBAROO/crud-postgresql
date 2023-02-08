import express, { Router } from 'express';
import { getData, putData, deleteData, updateData } from '../controller/Controller.js';
const router = express.Router();

router.get('/get', getData);
router.post('/put', putData);
router.delete('/delete', deleteData);
router.patch('/update', updateData);

export default router;