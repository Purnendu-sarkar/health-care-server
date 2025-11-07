import { UserRole } from "@prisma/client";
import { IJWTPayload } from "../../types/common";
import httpStatus from 'http-status'
import ApiError from "../../errors/ApiError";


const fetchDashboardMetaData = async (user: IJWTPayload) => {
    let metadata;
    switch (user.role) {
        case UserRole.ADMIN:
            metadata = "Admin Meta data";
            break;
        case UserRole.DOCTOR:
            metadata = "Doctor Meta Data";
            break;
        case UserRole.PATIENT:
            metadata = "Patient Meta Data";
            break;
        default:
            throw new ApiError(httpStatus.BAD_REQUEST, "Invalid user role!")
    }

    return metadata;
};




export const MetaService = {
    fetchDashboardMetaData
}