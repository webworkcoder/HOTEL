/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/endpoints";
import { toast } from "sonner";
import {
  CalendarDays,
  DoorOpen,
  IndianRupee,
  Users,
  PlusCircle,
  ListTodo,
  Loader2,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const Dashboard = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [roomsRes, bookingsRes] = await Promise.all([
          api.rooms.getAll(),
          api.bookings.getAll(),
        ]);
        setRooms((roomsRes as any)?.data || []);
        setBookings((bookingsRes as any)?.data || []);
      } catch (err: any) {
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Compute Stats
  const stats = useMemo(() => {
    const totalBookings = bookings.length;
    const availableRooms = rooms.filter((r) => r.availability === "AVAILABLE").length;
    
    const totalRevenue = bookings
      .filter((b) => b.paymentStatus === "SUCCESS")
      .reduce((sum, b) => sum + b.totalAmount, 0);

    // Active guests calculation (checkIn <= today <= checkOut, status not CANCELLED)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activeGuests = bookings.filter((b) => {
      if (b.bookingStatus === "CANCELLED") return false;
      const start = new Date(b.checkIn);
      const end = new Date(b.checkOut);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      return start <= today && end >= today;
    }).length;

    return [
      {
        label: "Total Bookings",
        value: totalBookings.toString(),
        sub: "Total reservations",
        icon: <CalendarDays className="h-5 w-5 text-blue-500" />,
      },
      {
        label: "Available Rooms",
        value: `${availableRooms}/${rooms.length}`,
        sub: "Live room inventory",
        icon: <DoorOpen className="h-5 w-5 text-green-500" />,
      },
      {
        label: "Total Revenue",
        value: `₹${totalRevenue.toLocaleString("en-IN")}`,
        sub: "From paid reservations",
        icon: <IndianRupee className="h-5 w-5 text-amber-500" />,
      },
      {
        label: "Active Stays",
        value: activeGuests.toString(),
        sub: "Guests currently in hotel",
        icon: <Users className="h-5 w-5 text-indigo-500" />,
      },
    ];
  }, [bookings, rooms]);

  // Chart Data: Last 6 Months Revenue & Bookings Trend
  const monthlyData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    interface MonthMetric {
      monthIndex: number;
      year: number;
      name: string;
      Revenue: number;
      Bookings: number;
    }
    const last6Months: MonthMetric[] = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      last6Months.push({
        monthIndex: d.getMonth(),
        year: d.getFullYear(),
        name: months[d.getMonth()],
        Revenue: 0,
        Bookings: 0
      });
    }
    
    bookings.forEach((booking) => {
      const date = new Date(booking.checkIn);
      const mIdx = date.getMonth();
      const yr = date.getFullYear();
      
      const match = last6Months.find((m) => m.monthIndex === mIdx && m.year === yr);
      if (match) {
        match.Bookings += 1;
        if (booking.paymentStatus === "SUCCESS") {
          match.Revenue += booking.totalAmount;
        }
      }
    });
    
    return last6Months.map(({ name, Revenue, Bookings }) => ({
      name,
      Revenue,
      Bookings
    }));
  }, [bookings]);

  // Recent Bookings (Take last 5)
  const recentBookingsList = useMemo(() => {
    return bookings.slice(0, 5).map((b) => {
      const checkInDate = new Date(b.checkIn).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      return {
        _id: b._id,
        name: b.guest?.fullName || "Guest",
        room: b.roomName || "Room",
        date: checkInDate,
        status: b.bookingStatus || "CONFIRMED",
      };
    });
  }, [bookings]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 min-h-[600px] gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground text-sm font-medium">Loading hotel analytics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-content-area w-[90%] mx-auto py-10 md:py-20 space-y-12">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold font-heading">Hotel Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time analytics and management interface.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map((item, i) => (
          <div
            key={i}
            className="p-6 bg-card shadow-md border border-border rounded-xl transition duration-300 hover:shadow-lg flex items-center justify-between"
          >
            <div className="space-y-1">
              <h2 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                {item.label}
              </h2>
              <p className="text-2xl font-bold text-foreground">{item.value}</p>
              <span className="text-xs text-muted-foreground block">{item.sub}</span>
            </div>
            <div className="p-3 bg-muted rounded-lg">{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      {isMounted && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Area Chart */}
          <div className="p-6 bg-card border border-border rounded-xl shadow-md lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-heading">Revenue Analysis</h3>
                <p className="text-xs text-muted-foreground">Monthly revenue trend (₹) from paid bookings</p>
              </div>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c5a27a" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#c5a27a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#a0a0a0" fontSize={12} tickLine={false} />
                  <YAxis stroke="#a0a0a0" fontSize={12} tickLine={false} />
                  <Tooltip formatter={(value: any) => [value !== undefined && value !== null ? `₹${value.toLocaleString()}` : "₹0", "Revenue"]} />
                  <Area
                    type="monotone"
                    dataKey="Revenue"
                    stroke="#c5a27a"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bookings Bar Chart */}
          <div className="p-6 bg-card border border-border rounded-xl shadow-md space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold font-heading">Reservations Count</h3>
              <p className="text-xs text-muted-foreground">Total room bookings over the last 6 months</p>
            </div>
            <div className="h-[240px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#a0a0a0" fontSize={12} tickLine={false} />
                  <YAxis stroke="#a0a0a0" fontSize={12} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="Bookings" fill="#c5a27a" radius={[4, 4, 0, 0]} barSize={25} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Quick Actions & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-heading">Quick Actions</h2>
          <div className="grid gap-3">
            <button
              onClick={() => router.push("/dashboard/rooms/create")}
              className="p-5 bg-card border border-border hover:border-primary rounded-xl flex items-center gap-4 cursor-pointer text-left transition duration-300"
            >
              <PlusCircle className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">Add Room</h3>
                <p className="text-xs text-muted-foreground">Create a new hotel room listing</p>
              </div>
            </button>
            <button
              onClick={() => router.push("/dashboard/rooms")}
              className="p-5 bg-card border border-border hover:border-primary rounded-xl flex items-center gap-4 cursor-pointer text-left transition duration-300"
            >
              <DoorOpen className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">Manage Rooms</h3>
                <p className="text-xs text-muted-foreground">Modify inventory status or prices</p>
              </div>
            </button>
            <button
              onClick={() => router.push("/dashboard/bookings")}
              className="p-5 bg-card border border-border hover:border-primary rounded-xl flex items-center gap-4 cursor-pointer text-left transition duration-300"
            >
              <ListTodo className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">Manage Bookings</h3>
                <p className="text-xs text-muted-foreground">View details of guest reservations</p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Bookings List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold font-heading">Recent Bookings</h2>
          <div className="bg-card border border-border shadow-md rounded-xl overflow-hidden divide-y divide-border">
            {recentBookingsList.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">
                No recent bookings recorded.
              </div>
            ) : (
              recentBookingsList.map((b) => (
                <div
                  key={b._id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition duration-200"
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-sm text-foreground">{b.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {b.room} • {b.date}
                    </p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      b.status === "CONFIRMED"
                        ? "bg-green-500/10 text-green-600"
                        : b.status === "PENDING"
                          ? "bg-yellow-500/10 text-yellow-600"
                          : "bg-red-50/10 text-red-500"
                    }`}
                  >
                    {b.status.toLowerCase()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
