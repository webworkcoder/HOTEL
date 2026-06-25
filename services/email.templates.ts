/* eslint-disable @typescript-eslint/no-explicit-any */
export const bookingConfirmationEmail = (data: any) => {
  return `
  <div style="font-family: Arial, sans-serif; background:#f6f7fb; padding:20px;">
    
    <!-- HEADER -->
    <div style="max-width:600px;margin:auto;background:#111827;padding:20px;border-radius:10px 10px 0 0;color:white;text-align:center;">
      <h1 style="margin:0;">🏨 Luxury Stay Hotel</h1>
      <p style="margin:5px 0 0;">Booking Confirmation</p>
    </div>

    <!-- BODY -->
    <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:0 0 10px 10px;">

      <h2 style="color:#111827;">Hello ${data.guest.fullName} 👋</h2>

      <p style="color:#6b7280;">
        Your booking has been successfully confirmed. Below are your booking details.
      </p>

      <!-- BOOKING ID -->
      <div style="background:#f3f4f6;padding:12px;border-radius:8px;margin:15px 0;">
        <strong>Booking ID:</strong> ${data.bookingId}
      </div>

      <!-- ROOM INFO -->
      <h3 style="margin-bottom:5px;">Room Details</h3>
      <p style="margin:0;color:#374151;">
        <strong>Room:</strong> ${data.roomName}
      </p>

      <p style="margin:0;color:#374151;">
        <strong>Guests:</strong> ${data.adults} Adults, ${data.children} Children
      </p>

      <!-- DATES -->
      <h3 style="margin-top:15px;">Stay Details</h3>

      <p style="margin:0;color:#374151;">
        <strong>Check-in:</strong> ${new Date(data.checkIn).toDateString()}
      </p>

      <p style="margin:0;color:#374151;">
        <strong>Check-out:</strong> ${new Date(data.checkOut).toDateString()}
      </p>

      <p style="margin:0;color:#374151;">
        <strong>Nights:</strong> ${data.nights}
      </p>

      <!-- PAYMENT -->
      <h3 style="margin-top:15px;">Payment Summary</h3>

      <div style="background:#ecfdf5;padding:12px;border-radius:8px;">
        <p style="margin:0;color:#065f46;">
          <strong>Total Paid:</strong> ₹${data.totalAmount}
        </p>
        <p style="margin:0;color:#065f46;">
          Payment Status: SUCCESS ✅
        </p>
      </div>

      <!-- GUEST INFO -->
      <h3 style="margin-top:15px;">Guest Details</h3>

      <p style="margin:0;color:#374151;">
        <strong>Name:</strong> ${data.guest.fullName}
      </p>

      <p style="margin:0;color:#374151;">
        <strong>Email:</strong> ${data.guest.email}
      </p>

      <p style="margin:0;color:#374151;">
        <strong>Phone:</strong> ${data.guest.phone}
      </p>

      <!-- FOOTER -->
      <hr style="margin:20px 0;" />

      <p style="color:#6b7280;font-size:12px;text-align:center;">
        Thank you for choosing Luxury Stay Hotel.<br/>
        We look forward to hosting you!
      </p>

    </div>
  </div>
  `;
};

export const adminBookingEmail = (data: any) => {
  return `
  <div style="font-family: Arial; background:#f6f7fb; padding:20px;">
    
    <div style="max-width:600px;margin:auto;background:#111827;padding:20px;color:white;text-align:center;border-radius:10px;">
      <h1>📥 New Booking Alert</h1>
      <p>Luxury Stay Hotel Admin Panel</p>
    </div>

    <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:10px;">

      <h2>New Booking Received</h2>

      <div style="background:#f3f4f6;padding:12px;border-radius:8px;">
        <strong>Booking ID:</strong> ${data.bookingId}
      </div>

      <h3>Guest Information</h3>

      <p><strong>Name:</strong> ${data.guest.fullName}</p>
      <p><strong>Email:</strong> ${data.guest.email}</p>
      <p><strong>Phone:</strong> ${data.guest.phone}</p>

      <h3>Booking Details</h3>

      <p><strong>Room:</strong> ${data.roomName}</p>
      <p><strong>Check-in:</strong> ${new Date(data.checkIn).toDateString()}</p>
      <p><strong>Check-out:</strong> ${new Date(data.checkOut).toDateString()}</p>
      <p><strong>Nights:</strong> ${data.nights}</p>

      <div style="background:#ecfdf5;padding:12px;border-radius:8px;">
        <strong>Total Revenue:</strong> ₹${data.totalAmount}
      </div>

    </div>
  </div>
  `;
};
