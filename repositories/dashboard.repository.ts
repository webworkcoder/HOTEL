import { BookingModel, RoomModel } from "@/models";
import { RoomAvailability } from "@/constants/room-availability";
import { PaymentStatus } from "@/constants/payment-status";

export const getDashboardStats = async () => {
  const [totalRooms, availableRooms, totalBookings, revenue] =
    await Promise.all([
      RoomModel.countDocuments(),
      RoomModel.countDocuments({
        availability: RoomAvailability.AVAILABLE,
      }),

      BookingModel.countDocuments(),
      BookingModel.aggregate([
        {
          $match: {
            paymentStatus: PaymentStatus.SUCCESS,
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$totalAmount",
            },
          },
        },
      ]),
    ]);

  return {
    totalRooms,
    availableRooms,
    totalBookings,
    revenue: revenue[0]?.total || 0,
  };
};
