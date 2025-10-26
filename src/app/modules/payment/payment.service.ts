import Stripe from "stripe";
import { prisma } from "../../shared/prisma";
import { PaymentStatus } from "@prisma/client";

const handleStripeWebhookEvent = async (event: Stripe.Event) => {
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as any;

            const appointmentId = session.metadata?.appointmentId;
            const paymentId = session.metadata?.paymentId;

            const paymentStatus = session.payment_status === "paid" ? PaymentStatus.PAID : PaymentStatus.UNPAID;

            await prisma.$transaction([
                prisma.appointment.update({
                    where: { id: appointmentId },
                    data: { paymentStatus }
                }),
                prisma.payment.update({
                    where: { id: paymentId },
                    data: {
                        status: paymentStatus,
                        paymentGatewayData: {
                            sessionId: session.id,
                            paymentStatus: session.payment_status,
                            amountTotal: session.amount_total,
                            currency: session.currency,
                            paymentIntent: session.payment_intent
                        }
                    }
                })
            ]);
            break;
        }

        default:
            console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }
};

export const PaymentService = {
    handleStripeWebhookEvent
}