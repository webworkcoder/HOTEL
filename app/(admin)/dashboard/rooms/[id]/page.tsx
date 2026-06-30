import { RoomForm } from "@/components/pages/admin/dashboard/room-form";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const EditRoomPage = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <div>
      <RoomForm roomId={id} />
    </div>
  );
};

export default EditRoomPage;
