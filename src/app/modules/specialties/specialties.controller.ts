import { Request, Response } from "express";
import httpStatus from "http-status";
import { SpecialtiesService } from "./specialties.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

const inserIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await SpecialtiesService.inserIntoDB(req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Specialties created successfully!✅",
        data: result
    });
});


export const SpecialtiesController = {
    inserIntoDB
};