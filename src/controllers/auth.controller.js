const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const AuthService = require('../services/auth.service');

const authService = new AuthService();

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await authService.register(name, email, password);
  new ApiResponse(res, 201, 'User registered successfully', { user });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const token = await authService.login(email, password);
  new ApiResponse(res, 200, 'Login successful', { token });
});

exports.getMe = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user.id);
  new ApiResponse(res, 200, 'User retrieved successfully', { user });
});