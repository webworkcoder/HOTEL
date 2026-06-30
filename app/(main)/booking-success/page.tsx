/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, Loader2, MailCheck } from "lucide-react";
import { api } from "@/lib/endpoints";
import { Button } from "@/components/ui/button";

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get("id");

  const [booking, setBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emailStatus, setEmailStatus] = useState<
    "generating" | "sent" | "error"
  >("generating");

  useEffect(() => {
    if (!bookingId) {
      setError("No booking reference ID found");
      setIsLoading(false);
      return;
    }

    const fetchBooking = async () => {
      try {
        setIsLoading(true);
        const res = await api.bookings.getById(bookingId);
        if ((res as any)?.success && (res as any)?.data) {
          const bookingData = (res as any).data;
          setBooking(bookingData);
          if (bookingData.invoiceUrl) {
            setEmailStatus("sent");
          }
        } else {
          setError("Booking details not found");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load booking details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  // Background invoice capture and upload to Cloudinary (which triggers backend email)
  useEffect(() => {
    const generateAndUploadInvoice = async () => {
      if (!booking || booking.invoiceUrl || !bookingId) return;

      try {
        setEmailStatus("generating");
        const element = document.getElementById("invoice-capture");
        if (!element) return;

        // Convert off-screen DOM element to Canvas image
        const html2canvas = (await import("html2canvas")).default;
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
        });
        const imgData = canvas.toDataURL("image/jpeg", 0.9);

        // Upload to Cloudinary
        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: imgData }),
        });

        const uploadData = await uploadRes.json();
        if (uploadData.success && uploadData.url) {
          // Update booking with the invoice URL (this triggers email sending on the backend!)
          await api.bookings.update(bookingId, { invoiceUrl: uploadData.url });
          setBooking((prev: any) => ({ ...prev, invoiceUrl: uploadData.url }));
          setEmailStatus("sent");
        } else {
          setEmailStatus("error");
        }
      } catch (err) {
        console.error("Failed to generate and upload invoice:", err);
        setEmailStatus("error");
      }
    };

    if (booking && !isLoading && !booking.invoiceUrl) {
      const timer = setTimeout(() => {
        generateAndUploadInvoice();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [booking, isLoading, bookingId]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground text-sm font-medium">
          Retrieving booking confirmation...
        </p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-5 text-center gap-4">
        <h2 className="text-2xl font-bold text-destructive">
          Unable to show booking status
        </h2>
        <p className="text-muted-foreground max-w-md">
          {error || "The booking you are looking for does not exist."}
        </p>
        <Button
          onClick={() => router.push("/")}
          className="mt-2 rounded-none px-6"
        >
          Go back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/10 flex flex-col items-center justify-center py-20 px-4">
      <div className="max-w-xl w-full bg-card border border-border rounded-none shadow-2xl p-8 md:p-12 space-y-8 relative overflow-hidden">
        {/* Top visual accents */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />

        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-2">
            <CheckCircle2 size={40} className="text-primary animate-bounce" />
          </div>
          <p className="uppercase tracking-[0.35em] text-primary text-xs font-semibold">
            Reservation Confirmed
          </p>
          <h1 className="text-4xl font-bold font-heading">Thank You!</h1>

          {emailStatus === "generating" && (
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-secondary/40 py-2 px-4 rounded-none max-w-xs mx-auto">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
              Generating invoice receipt...
            </div>
          )}

          {emailStatus === "sent" && (
            <div className="flex items-center justify-center gap-2 text-xs text-green-600 bg-green-500/10 border border-green-500/20 py-2 px-4 rounded-none max-w-xs mx-auto font-medium">
              <MailCheck size={14} />
              Invoice sent to {booking.guest?.email}
            </div>
          )}

          {emailStatus === "error" && (
            <div className="flex items-center justify-center gap-2 text-xs text-red-600 bg-red-500/10 border border-red-500/20 py-2 px-4 rounded-none max-w-xs mx-auto">
              Failed to send email receipt automatically.
            </div>
          )}
        </div>

        {/* Booking Summary */}
        <div className="border border-border p-6 bg-secondary/5 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Booking Reference
            </span>
            <span className="font-mono text-sm font-bold text-foreground">
              {booking.bookingId}
            </span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Guest Name</span>
              <span className="font-medium text-foreground">
                {booking.guest?.fullName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email Address</span>
              <span className="font-medium text-foreground">
                {booking.guest?.email}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Room Reserved</span>
              <span className="font-medium text-foreground">
                {booking.roomName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check-in</span>
              <span className="font-medium text-foreground">
                {formatDate(booking.checkIn)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check-out</span>
              <span className="font-medium text-foreground">
                {formatDate(booking.checkOut)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Stay Duration</span>
              <span className="font-medium text-foreground">
                {booking.nights} {booking.nights === 1 ? "Night" : "Nights"}
              </span>
            </div>
            <div className="flex justify-between pt-3 border-t border-border text-base font-bold">
              <span>Amount Paid</span>
              <span className="text-primary">
                ₹{booking.totalAmount?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Next actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
          <Button
            onClick={() => router.push("/")}
            className="rounded-none py-6 px-8 cursor-pointer flex-1"
          >
            Go to Homepage
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/rooms")}
            className="rounded-none py-6 px-8 cursor-pointer flex-1"
          >
            Browse More Rooms
          </Button>
        </div>
      </div>

      {/* Off-screen invoice markup for automated background capture */}
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <div
          id="invoice-capture"
          style={{
            width: "800px",
            padding: "50px",
            backgroundColor: "#ffffff",
            color: "#000000",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "2px solid #e5e7eb",
              paddingBottom: "30px",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "28px",
                  fontWeight: "800",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Hotel Blu Plaza
              </h1>
              <p
                style={{
                  margin: "5px 0 0",
                  fontSize: "13px",
                  color: "#6b7280",
                }}
              >
                Luxurious stays and premium experiences
              </p>
              <p
                style={{
                  margin: "15px 0 0",
                  fontSize: "11px",
                  color: "#4b5563",
                  lineHeight: "1.6",
                }}
              >
                Sector 5, Salt Lake, Kolkata, WB
                <br />
                Email: booking@hotel.com | Phone: +91 98765 43210
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  color: "#9ca3af",
                  letterSpacing: "2px",
                }}
              >
                Invoice
              </h2>
              <div
                style={{
                  marginTop: "15px",
                  fontSize: "11px",
                  color: "#4b5563",
                  lineHeight: "1.6",
                }}
              >
                <p style={{ margin: 0 }}>
                  <strong>Invoice Date:</strong>{" "}
                  {new Date(booking.createdAt).toLocaleDateString("en-IN")}
                </p>
                <p style={{ margin: "4px 0 0" }}>
                  <strong>Booking ID:</strong> {booking.bookingId}
                </p>
                <p style={{ margin: "4px 0 0" }}>
                  <strong>Status:</strong>{" "}
                  <span style={{ color: "#16a34a", fontWeight: "700" }}>
                    PAID
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "40px",
              padding: "30px 0",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <div style={{ fontSize: "11px" }}>
              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  color: "#9ca3af",
                  letterSpacing: "1px",
                }}
              >
                Bill To
              </h3>
              <p
                style={{
                  margin: "0 0 4px",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#1f2937",
                }}
              >
                {booking.guest?.fullName}
              </p>
              <p style={{ margin: "0 0 4px", color: "#4b5563" }}>
                {booking.guest?.email}
              </p>
              <p style={{ margin: 0, color: "#4b5563" }}>
                {booking.guest?.phone}
              </p>
            </div>

            <div style={{ fontSize: "11px" }}>
              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  color: "#9ca3af",
                  letterSpacing: "1px",
                }}
              >
                Payment Summary
              </h3>
              <p style={{ margin: "0 0 4px", color: "#4b5563" }}>
                <strong>Order ID:</strong> {booking.razorpayOrderId || "N/A"}
              </p>
              <p style={{ margin: "0 0 4px", color: "#4b5563" }}>
                <strong>Transaction ID:</strong>{" "}
                {booking.razorpayPaymentId || "N/A"}
              </p>
              <p style={{ margin: 0, color: "#4b5563" }}>
                <strong>Gateway:</strong> Razorpay (INR)
              </p>
            </div>
          </div>

          {/* Table */}
          <div style={{ padding: "30px 0" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "11px",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "2px solid #d1d5db",
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  <th
                    style={{
                      textAlign: "left",
                      padding: "10px 0",
                      fontWeight: "600",
                    }}
                  >
                    Stay Description
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "10px 0",
                      fontWeight: "600",
                    }}
                  >
                    Check-in
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "10px 0",
                      fontWeight: "600",
                    }}
                  >
                    Check-out
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "10px 0",
                      fontWeight: "600",
                    }}
                  >
                    Nights
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "10px 0",
                      fontWeight: "600",
                    }}
                  >
                    Price / Night
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "10px 0",
                      fontWeight: "600",
                    }}
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody style={{ color: "#374151" }}>
                <tr>
                  <td style={{ padding: "15px 0" }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        fontWeight: "700",
                        color: "#111827",
                      }}
                    >
                      {booking.roomName}
                    </p>
                    <p
                      style={{
                        margin: "4px 0 0",
                        fontSize: "10px",
                        color: "#9ca3af",
                      }}
                    >
                      Guests: {booking.adults} Adults{" "}
                      {booking.children > 0
                        ? `, ${booking.children} Children`
                        : ""}
                    </p>
                  </td>
                  <td style={{ textAlign: "center", padding: "15px 0" }}>
                    {formatDate(booking.checkIn)}
                  </td>
                  <td style={{ textAlign: "center", padding: "15px 0" }}>
                    {formatDate(booking.checkOut)}
                  </td>
                  <td style={{ textAlign: "center", padding: "15px 0" }}>
                    {booking.nights}
                  </td>
                  <td style={{ textAlign: "right", padding: "15px 0" }}>
                    ₹
                    {(booking.totalAmount / booking.nights).toLocaleString(
                      "en-IN",
                    )}
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "15px 0",
                      fontWeight: "700",
                      color: "#111827",
                    }}
                  >
                    ₹{booking.totalAmount?.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary totals */}
          <div
            style={{
              borderTop: "2px solid #111827",
              paddingTop: "20px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{ width: "250px", fontSize: "11px", lineHeight: "1.8" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#4b5563",
                }}
              >
                <span>Subtotal</span>
                <span>₹{booking.totalAmount?.toLocaleString("en-IN")}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#4b5563",
                }}
              >
                <span>Taxes & Fees</span>
                <span>₹0</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid #e5e7eb",
                  paddingTop: "8px",
                  marginTop: "8px",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                <span>Amount Paid</span>
                <span>₹{booking.totalAmount?.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Footer terms */}
          <div
            style={{
              marginTop: "80px",
              paddingTop: "20px",
              borderTop: "1px solid #f3f4f6",
              textAlign: "center",
              fontSize: "10px",
              color: "#9ca3af",
              lineHeight: "1.5",
            }}
          >
            <p style={{ margin: 0 }}>
              * This is a computer-generated invoice and does not require a
              physical signature.
            </p>
            <p
              style={{ margin: "5px 0 0", fontWeight: "600", color: "#6b7280" }}
            >
              Thank you for choosing Hotel Blu Plaza. We look forward to hosting
              your stay!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground text-sm font-medium">
            Loading...
          </p>
        </div>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
}
