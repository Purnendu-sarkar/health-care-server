import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helper/pick";

const createPatient = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createPatient(req);
    // console.log(result)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully!✅",
        data: result
    })
})


const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, ["status", "role", "email", "searchTerm"])
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"])
    //const { page, limit, searchTerm, sortBy, sortOrder, role, status } = req.query;
    const result = await UserService.getAllFromDB(filters, options);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User retrieved successfully!✅",
        data: result
    })
})

export const UserController = {
    createPatient,
    getAllFromDB
}