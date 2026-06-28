export const Dashboard = () => {
  const stats = [
    {
      label: "Total Bookings",
      value: "1,248",
      sub: "+12% this month",
    },
    {
      label: "Available Rooms",
      value: "86",
      sub: "Live inventory",
    },
    {
      label: "Revenue",
      value: "₹4.2L",
      sub: "+8% growth",
    },
    {
      label: "Active Guests",
      value: "312",
      sub: "Currently staying",
    },
  ];

  const quickActions = [
    {
      label: "Add Room",
      desc: "Create new room listing",
    },
    {
      label: "New Booking",
      desc: "Manually add booking",
    },
    {
      label: "Manage Rooms",
      desc: "Edit room details",
    },
  ];

  const recentBookings = [
    {
      name: "Rahul Sharma",
      room: "Deluxe Suite",
      date: "28 June 2026",
      status: "Confirmed",
    },
    {
      name: "Ankit Verma",
      room: "Standard Room",
      date: "27 June 2026",
      status: "Pending",
    },
    {
      name: "Neha Singh",
      room: "Luxury Suite",
      date: "26 June 2026",
      status: "Completed",
    },
  ];

  return (
    <div className="max-w-content-area w-[90%] mx-auto py-10 md:py-20 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back, manage your hotel easily.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map((item, i) => (
          <div
            key={i}
            className="p-5 bg-primary-foreground shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-gray-500 text-sm">{item.label}</h2>
            <p className="text-2xl font-bold mt-2">{item.value}</p>
            <span className="text-xs text-green-600">{item.sub}</span>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {quickActions.map((item, i) => (
            <div
              key={i}
              className="p-5 bg-linear-to-br from-white to-gray-50 border hover:shadow-sm cursor-pointer transition"
            >
              <h3 className="font-semibold">{item.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>

        <div className="bg-primary-foreground border shadow-sm overflow-hidden">
          {recentBookings.map((b, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-5 py-4 border-b last:border-none hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">{b.name}</p>
                <p className="text-sm text-gray-500">
                  {b.room} • {b.date}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium
                  ${
                    b.status === "Confirmed"
                      ? "bg-green-100 text-green-600"
                      : b.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-100 text-gray-600"
                  }`}
              >
                {b.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
