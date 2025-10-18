import { Request } from "express";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../helper/fileUploader";
import config from "../../config";


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

const getAllFromDB = async ({ page, limit, searchTerm }: { page: number, limit: number, searchTerm?: any }) => {
    const skip = (page - 1) * limit;
    const result = await prisma.user.findMany({
        skip,
        take: limit,

        where: {
            email: {
                contains: searchTerm,
                mode: "insensitive"
            }
        }
    });
    return result;
}

export const UserService = {
    createPatient,
    getAllFromDB
}