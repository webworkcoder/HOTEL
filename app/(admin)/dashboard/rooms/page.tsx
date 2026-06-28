import { RoomsTable } from "@/components/pages/admin/dashboard/rooms-table";
import Link from "next/link";

const AdminRoomsPage = () => {
  return (
    <div className="space-y-8 max-w-content-area w-[90%] mx-auto py-10 md:py-20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-primary">
            Hotel Management
          </p>

          <h1 className="text-4xl font-heading">Room Management</h1>
        </div>

        <Link
          href="/dashboard/rooms/create"
          className="
            bg-primary
            text-white
            px-6
            py-3
            hover:opacity-90
            transition-all
          "
        >
          + Add Room
        </Link>
      </div>

      <RoomsTable />
    </div>
  );
};

export default AdminRoomsPage;
