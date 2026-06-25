/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaymentModel } from "@/models";

export const createPayment = (data: any) => {
  return PaymentModel.create(data);
};

export const updatePayment = (orderId: string, data: any) => {
  return PaymentModel.findOneAndUpdate(
    {
      razorpayOrderId: orderId,
    },
    data,
    {
      new: true,
    },
  );
};

export const getPaymentByOrderId = (orderId: string) => {
  return PaymentModel.findOne({
    razorpayOrderId: orderId,
  });
};
