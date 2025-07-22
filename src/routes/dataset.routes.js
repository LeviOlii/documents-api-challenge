const express = require('express');
const router = express.Router();
const { 
  uploadDataset,
  getDatasets,
  getDatasetRecords,
  searchRecords
} = require('../controllers/dataset.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const uploadMiddleware = require('../middlewares/upload.middleware');

/**
 * @swagger
 * /datasets/upload:
 *   post:
 *     summary: Upload a dataset file (CSV/PDF)
 *     tags: [Datasets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded and processed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dataset'
 *       400:
 *         description: Invalid file format
 *       401:
 *         description: Unauthorized
 */
router.post('/upload', authMiddleware, uploadMiddleware.single('file'), uploadDataset);

/**
 * @swagger
 * /datasets:
 *   get:
 *     summary: Get all user's datasets
 *     tags: [Datasets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of datasets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dataset'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, getDatasets);

/**
 * @swagger
 * /datasets/{id}/records:
 *   get:
 *     summary: Get records from a specific dataset
 *     tags: [Datasets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Dataset ID
 *     responses:
 *       200:
 *         description: List of records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Record'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Dataset not found
 */
router.get('/:id/records', authMiddleware, getDatasetRecords);

/**
 * @swagger
 * /datasets/records/search:
 *   get:
 *     summary: Search records across all datasets
 *     tags: [Datasets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search term
 *     responses:
 *       200:
 *         description: Matching records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Record'
 *       401:
 *         description: Unauthorized
 */
router.get('/records/search', authMiddleware, searchRecords);

module.exports = router;