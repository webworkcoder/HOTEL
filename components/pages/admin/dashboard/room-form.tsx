/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCreateRoom } from "@/hooks/queries/use-create-room";
import { useAdminRoom } from "@/hooks/queries/useAdminRoom";
import { useUpdateRoom } from "@/hooks/queries/useUpdateRoom";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { X, Upload, Loader2 } from "lucide-react";
import Image from "next/image";

interface RoomData {
  _id: string;
  name: string;
  description: string;
  roomType: string;
  pricePerNight: number;
  maxAdults: number;
  maxChildren: number;
  amenities: string[];
  images: string[];
}

interface Props {
  roomId?: string;
}

export const RoomForm = ({ roomId }: Props) => {
  const router = useRouter();
  const isEdit = !!roomId;

  const createRoom = useCreateRoom();
  const updateRoom = useUpdateRoom();
  const { data: roomsData } = useAdminRoom(roomId || "");
  const room: RoomData | undefined = (roomsData as any)?.data?.data;

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
      roomType: "CLASSIC",
      pricePerNight: 0,
      maxAdults: 1,
      maxChildren: 0,
      amenities: "",
    },
  });

  useEffect(() => {
    if (!room) return;

    reset({
      name: room.name,
      description: room.description,
      roomType: room.roomType,
      pricePerNight: room.pricePerNight,
      maxAdults: room.maxAdults,
      maxChildren: room.maxChildren,
      amenities: room.amenities.join(", "),
    });
    setUploadedImages(room.images);
  }, [room, reset]);

  // Redirect after successful room creation
  useEffect(() => {
    if (createRoom.isSuccess && !isEdit) {
      setTimeout(() => {
        router.push("/dashboard/rooms");
      }, 1000);
    }
  }, [createRoom.isSuccess, isEdit, router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploadError("");
    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file type
        const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
        if (!validImageTypes.includes(file.type)) {
          setUploadError(`Invalid file type: ${file.name}. Only JPG, PNG, GIF, and WebP are allowed.`);
          continue;
        }

        // Convert file to base64 for upload
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const base64String = reader.result as string;
            
            // Call the API endpoint
            const response = await fetch("/api/admin/upload", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ file: base64String }),
            });

            const result = await response.json();

            if (response.ok && result.success && result.url) {
              setUploadedImages((prev: string[]) => [...prev, result.url as string]);
            } else {
              setUploadError(`Failed to upload ${file.name}: ${result.message || "Unknown error"}`);
            }
          } catch (error) {
            setUploadError(`Failed to upload ${file.name}`);
            console.error(error);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      setUploadError("Upload failed. Please try again.");
      console.error(error);
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev: string[]) => prev.filter((_, i) => i !== index) as string[]);
  };

  const onSubmit = (values: any) => {
    if (uploadedImages.length === 0) {
      setUploadError("Please upload at least one image");
      return;
    }

    const payload = {
      ...values,
      pricePerNight: Number(values.pricePerNight),
      maxAdults: Number(values.maxAdults),
      maxChildren: Number(values.maxChildren),
      amenities: values.amenities
        .split(",")
        .map((item: string) => item.trim())
        .filter((item: string) => item),
      images: uploadedImages,
    };

    console.log("Submitting room payload:", payload);

    if (isEdit) {
      updateRoom.mutate({
        id: roomId!,
        data: payload,
      });
      return;
    }

    createRoom.mutate(payload);
  };

  return (
    <div className="border border-border bg-card p-10 shadow-xl max-w-content-area w-[90%] mx-auto my-20">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="uppercase tracking-[0.35em] text-primary text-xs">
            Hotel Management
          </p>

          <h2 className="text-4xl font-heading mt-3">
            {isEdit ? "Edit Room" : "Create Room"}
          </h2>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-6"
      >
        <input
          placeholder="Room Name"
          {...register("name")}
          className="border p-4"
        />

        <input
          type="number"
          placeholder="Price Per Night"
          {...register("pricePerNight")}
          className="border p-4"
        />

        <select {...register("roomType")} className="border p-4">
          <option value="CLASSIC">Classic</option>
          <option value="DELUXE">Deluxe</option>
          <option value="DUPLEX">Duplex</option>
          <option value="SUITE">Suite</option>
        </select>

        <input
          type="number"
          placeholder="Max Adults"
          {...register("maxAdults")}
          className="border p-4"
        />

        <input
          type="number"
          placeholder="Max Children"
          {...register("maxChildren")}
          className="border p-4"
        />

        <input
          placeholder="Wifi, TV, AC, Pool"
          {...register("amenities")}
          className="border p-4"
        />

        <textarea
          rows={6}
          placeholder="Room Description"
          {...register("description")}
          className="border p-4 md:col-span-2"
        />

        {/* Image Upload Section */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium">Room Images</label>
              {isUploading && (
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  <span className="text-xs font-medium text-blue-600">Uploading...</span>
                </div>
              )}
            </div>
            
            {/* Error Message */}
            {uploadError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                {uploadError}
              </div>
            )}

            {/* Upload Input */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    <span className="text-sm text-gray-600">Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Click to upload images or drag and drop
                    </span>
                    <span className="text-xs text-gray-500">
                      JPG, PNG, GIF, WebP (Max file size: 5MB each)
                    </span>
                  </>
                )}
              </label>
            </div>

            {/* Uploaded Images Preview */}
            {uploadedImages.length > 0 && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-green-900">
                    ✓ {uploadedImages.length} {uploadedImages.length === 1 ? "Image" : "Images"} Uploaded
                  </h4>
                  <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                    Ready to save
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="relative h-24 w-full overflow-hidden rounded-lg bg-gray-100 shadow-sm border-2 border-green-200">
                        <Image
                          src={image}
                          alt={`Room ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                      <p className="text-xs text-gray-600 mt-1 text-center">Image {index + 1}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}


          </div>
        </div>

        <button
          type="submit"
          disabled={createRoom.isPending || updateRoom.isPending || isUploading}
          className="
            bg-primary
            text-white
            py-4
            md:col-span-2
            hover:opacity-90
            transition-all
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {createRoom.isPending || updateRoom.isPending
            ? "Please wait..."
            : isUploading
              ? "Uploading images..."
              : isEdit
                ? "Edit Room"
                : "Create Room"}
        </button>
      </form>
    </div>
  );
};
