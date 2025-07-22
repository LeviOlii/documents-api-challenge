const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');
const DatasetService = require('../services/dataset.service');


const uploadDataset = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'Nenhum arquivo enviado');
  
  const dataset = await DatasetService.createDataset(
    req.user.id,
    req.body.name || req.file.originalname,
    req.file
  );
  
  new ApiResponse(res, 201, 'Dataset criado com sucesso', { dataset });
});

const getDatasets = asyncHandler(async (req, res) => {
  const datasets = await DatasetService.getUserDatasets(req.user.id);
  new ApiResponse(res, 200, 'Datasets recuperados', { datasets });
});

const getDatasetRecords = asyncHandler(async (req, res) => {
  const records = await DatasetService.getDatasetRecords(
    parseInt(req.params.id),
    req.user.id
  );
  new ApiResponse(res, 200, 'Registros recuperados', { records });
});

const searchRecords = asyncHandler(async (req, res) => {
  if (!req.query.query) throw new ApiError(400, 'Parâmetro "query" obrigatório');
  
  const results = await DatasetService.searchRecords(
    req.user.id,
    req.query.query
  );
  
  new ApiResponse(res, 200, 'Busca realizada', { results });
});

module.exports = {
  uploadDataset,
  getDatasets,
  getDatasetRecords,
  searchRecords
};