/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  User,
  Phone,
  Mail,
  CreditCard,
  CheckCircle2,
  Clock3,
  XCircle,
  Eye,
  Search,
  Loader2,
} from "lucide-react";
import { api } from "@/lib/endpoints";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const BookingsTable = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await api.bookings.getAll();
      setBookings((res as any)?.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load bookings");
      toast.error(err.message || "Failed to load bookings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

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

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.bookingId.toLowerCase().includes(search.toLowerCase()) ||
        booking.guest.fullName.toLowerCase().includes(search.toLowerCase()) ||
        booking.roomName.toLowerCase().includes(search.toLowerCase());

      const matchesPayment =
        paymentFilter === "ALL" ||
        booking.paymentStatus === paymentFilter ||
        (paymentFilter === "PAID" && booking.paymentStatus === "SUCCESS") ||
        (paymentFilter === "SUCCESS" && booking.paymentStatus === "PAID");

      const matchesStatus =
        statusFilter === "ALL" || booking.bookingStatus === statusFilter;

      return matchesSearch && matchesPayment && matchesStatus;
    });
  }, [search, paymentFilter, statusFilter, bookings]);

  const paginatedBookings = filteredBookings.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const totalPages = Math.ceil(filteredBookings.length / pageSize);

  const paymentBadge = (status: string) => {
    switch (status) {
      case "SUCCESS":
      case "PAID":
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1  bg-green-500/10 text-green-600 text-xs">
            <CheckCircle2 size={14} />
            Paid
          </span>
        );

      case "PENDING":
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs">
            <Clock3 size={14} />
            Pending
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-600 text-xs">
            <XCircle size={14} />
            Failed
          </span>
        );
    }
  };

  return (
    <>
      <div className="border border-border bg-card overflow-hidden max-w-content-area w-[90%] mx-auto my-20">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-heading">Bookings</h2>
            <p className="text-muted-foreground">Manage hotel reservations</p>
          </div>

          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
            <CalendarDays className="text-primary" size={28} />
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-62.5">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2"
              size={18}
            />

            <input
              placeholder="Search bookings..."
              className="w-full border pl-10 pr-4 py-3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="border px-4 py-3"
          >
            <option value="ALL">All Payments</option>
            <option value="PAID">Paid</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {error && (
            <div className="bg-red-50 border-b border-red-200 p-4 text-red-700 text-sm">
              Error loading bookings: {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-16 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="text-muted-foreground text-sm font-medium">
                Loading reservations...
              </span>
            </div>
          ) : paginatedBookings.length === 0 ? (
            <div className="text-center p-16 text-muted-foreground">
              No bookings found.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="p-5 text-left">Booking ID</th>
                  <th className="p-5 text-left">Guest</th>
                  <th className="p-5 text-left">Room</th>
                  <th className="p-5 text-left">Stay</th>
                  <th className="p-5 text-left">Amount</th>
                  <th className="p-5 text-left">Payment</th>
                  <th className="p-5 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedBookings.map((booking) => (
                  <tr key={booking._id} className="border-t hover:bg-muted/50">
                    <td className="p-5 font-semibold">{booking.bookingId}</td>

                    <td className="p-5">
                      <div className="space-y-2">
                        <div className="flex gap-2 items-center">
                          <User size={14} />
                          {booking.guest.fullName}
                        </div>

                        <div className="flex gap-2 items-center text-sm text-muted-foreground">
                          <Mail size={14} />
                          {booking.guest.email}
                        </div>

                        <div className="flex gap-2 items-center text-sm text-muted-foreground">
                          <Phone size={14} />
                          {booking.guest.phone}
                        </div>
                      </div>
                    </td>

                    <td className="p-5">{booking.roomName}</td>

                    <td className="p-5">
                      {formatDate(booking.checkIn)}
                      <div className="text-muted-foreground text-sm">
                        to {formatDate(booking.checkOut)}
                      </div>
                    </td>

                    <td className="p-5 font-semibold text-primary">
                      ₹{booking.totalAmount.toLocaleString()}
                    </td>

                    <td className="p-5">
                      {paymentBadge(booking.paymentStatus)}
                    </td>

                    <td className="p-5">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="h-10 w-10 border flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="p-6 flex justify-center gap-3">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`h-10 w-10 border cursor-pointer ${
                  page === index + 1 ? "bg-primary text-white" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog
        open={!!selectedBooking}
        onOpenChange={() => setSelectedBooking(null)}
      >
        <DialogContent className="bg-popover border border-border rounded-none">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4 pt-4 text-foreground">
              <p>
                <strong>Booking ID:</strong> {selectedBooking.bookingId}
              </p>

              <p>
                <strong>Guest:</strong> {selectedBooking.guest.fullName}
              </p>

              <p>
                <strong>Email:</strong> {selectedBooking.guest.email}
              </p>

              <p>
                <strong>Phone:</strong> {selectedBooking.guest.phone}
              </p>

              <p>
                <strong>Room:</strong> {selectedBooking.roomName}
              </p>

              <p>
                <strong>Stay:</strong> {formatDate(selectedBooking.checkIn)} to{" "}
                {formatDate(selectedBooking.checkOut)} ({selectedBooking.nights}{" "}
                {selectedBooking.nights === 1 ? "night" : "nights"})
              </p>

              <p>
                <strong>Total Amount:</strong> ₹
                {selectedBooking.totalAmount.toLocaleString()}
              </p>

              <p>
                <strong>Payment Status:</strong> {selectedBooking.paymentStatus}
              </p>

              <p>
                <strong>Booking Status:</strong> {selectedBooking.bookingStatus}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
