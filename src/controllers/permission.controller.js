import { Permission } from "../models/permission.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

export const createPermission = asyncHandler(async (req, res)=>{
	const { name } = req.body
	const permission = await Permission.create({name})
    res.status(201).json(new ApiResponse(201, permission))
})