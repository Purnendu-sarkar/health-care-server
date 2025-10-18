import { Request } from "express";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../helper/fileUploader";
import config from "../../config";
import { paginationHelper } from "../../helper/paginationHelper";
import { Prisma } from "@prisma/client";
import { userFilterableFields } from "./user.constant";


const createPatient = async (req: Request) => {
    if (req.file) {
        const uploadResult = await fileUploader.uploadToCloudinary(req.file);
        req.body.patient.profilePhoto = uploadResult?.secure_url
        //console.log({uploadResult})
    }


    const hashPassword = await bcrypt.hash(req.body.password, config.bcrypt_salt_rounds);

    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: {
                email: req.body.patient.email,
                password: hashPassword
            }
        });

        return await tnx.patient.create({
            data: req.body.patient
        })
    })

    return result;

}

const getAllFromDB = async (params: any, options: any) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = params;

    const andConditions: Prisma.UserWhereInput[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: userFilterableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                },
            }))
        })
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }

    const result = await prisma.user.findMany({
        skip,
        take: limit,

        where: {
            AND: andConditions
        },

        orderBy: {
            [sortBy]: sortOrder
        }
    });
    return result;
}

export const UserService = {
    createPatient,
    getAllFromDB
}