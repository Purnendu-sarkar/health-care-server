import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PaymentService } from "./payment.service";
import sendResponse from "../../../shared/sendResponse";
import { stripe } from "../../../helpers/stripe";
import config from "../../config";

const handleStripeWebhookEvent = catchAsync(async (req: Request, res: Response) => {

    const sig = req.headers["stripe-signature"] as string;
    const webhookSecret = config.stripeWebhookSecret as string;

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err: any) {
        console.error("⚠️ Webhook signature verification failed:", err.message);
        return sendResponse(res, {
            statusCode: 400,
            success: false,
            message: 'Webhook signature verification failed',
            data: null,
        });
    }

    try {
        await PaymentService.handleStripeWebhookEvent(event);
    } catch (err: any) {
        console.error("⚠️ Webhook processing failed:", err.message);
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Webhook processing failed',
            data: null,
        });
    }

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Webhook req send successfully',
        data: null,
    });
});
export const PaymentController = {
    handleStripeWebhookEvent
}