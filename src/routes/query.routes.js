const express = require('express');
const router = express.Router();
const { 
  createQuery,
  getUserQueries
} = require('../controllers/query.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /queries:
 *   post:
 *     summary: Create a new query (AI simulation)
 *     tags: [Queries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 example: "What's the main trend in this data?"
 *               datasetId:
 *                 type: integer
 *                 example: 1
 *                 required: false
 *     responses:
 *       201:
 *         description: Query created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Query'
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, createQuery);

/**
 * @swagger
 * /queries:
 *   get:
 *     summary: Get user's query history
 *     tags: [Queries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of queries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Query'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, getUserQueries);

module.exports = router;