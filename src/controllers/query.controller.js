const ApiResponse= require('../utils/apiResponse');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');
const QueryService = require('../services/query.service');

const createQuery = asyncHandler(async (req, res) => {
  const { question, datasetId } = req.body;
  
  if (!question) throw new ApiError(400, 'Campo "question" obrigatório');
  
  const query = await QueryService.createQuery(
    req.user.id,
    question,
    datasetId ? parseInt(datasetId) : undefined
  );
  
  new ApiResponse(res, 201, 'Consulta criada', { query });
});

const getUserQueries = asyncHandler(async (req, res) => {
  const queries = await QueryService.getUserQueries(req.user.id);
  new ApiResponse(res, 200, 'Histórico de consultas', { queries });
});

module.exports = {
  createQuery,
  getUserQueries
};