/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { X, Upload, Loader2, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { api } from "@/lib/endpoints";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { premiumToast } from "@/components/shared/premium-toast";

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

  const [isLoadingRoom, setIsLoadingRoom] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const fetchRoom = async (id: string) => {
    try {
      setIsLoadingRoom(true);
      const res = await api.rooms.getById(id);
      const room = (res as any)?.data;
      if (room) {
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
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load room details");
    } finally {
      setIsLoadingRoom(false);
    }
  };

  useEffect(() => {
    if (roomId) {
      fetchRoom(roomId);
    }
  }, [roomId]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploadError("");
    setIsUploading(true);

    try {
      const uploadPromises = Array.from(files).map((file) => {
        // Validate file type
        const validImageTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
          "image/svg+xml",
        ];
        if (!validImageTypes.includes(file.type)) {
          setUploadError((prev) =>
            prev
              ? `${prev}\nInvalid file type: ${file.name}. Only JPG, PNG, GIF, and WebP are allowed.`
              : `Invalid file type: ${file.name}. Only JPG, PNG, GIF, and WebP are allowed.`,
          );
          return Promise.resolve(null);
        }

        return new Promise<string | null>((resolve) => {
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
                resolve(result.url);
              } else {
                setUploadError((prev) =>
                  prev
                    ? `${prev}\nFailed to upload ${file.name}: ${result.message || "Unknown error"}`
                    : `Failed to upload ${file.name}: ${result.message || "Unknown error"}`,
                );
                resolve(null);
              }
            } catch (error) {
              setUploadError((prev) =>
                prev
                  ? `${prev}\nFailed to upload ${file.name}`
                  : `Failed to upload ${file.name}`,
              );
              console.error(error);
              resolve(null);
            }
          };

          reader.onerror = () => {
            setUploadError((prev) =>
              prev
                ? `${prev}\nFailed to read ${file.name}`
                : `Failed to read ${file.name}`,
            );
            resolve(null);
          };

          reader.readAsDataURL(file);
        });
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const successfulUrls = uploadedUrls.filter(
        (url): url is string => url !== null,
      );

      if (successfulUrls.length > 0) {
        setUploadedImages((prev) => [...prev, ...successfulUrls]);
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
    setUploadedImages(
      (prev: string[]) => prev.filter((_, i) => i !== index) as string[],
    );
  };

  const onSubmit = async (values: any) => {
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

    try {
      setIsSubmitting(true);

      if (isEdit) {
        await api.rooms.update(roomId!, payload);
        premiumToast.success({
          title: "Room Updated",
          description: "The room details have been successfully updated.",
        });
      } else {
        await api.rooms.create(payload);

        premiumToast.success({
          title: "Room Created",
          description: "New room has been added successfully.",
        });
      }

      setTimeout(() => {
        router.push("/dashboard/rooms");
      }, 1000);
    } catch (error: any) {
      toast.error(
        error.message || `Failed to ${isEdit ? "update" : "create"} room`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingRoom) {
    return (
      <div className="flex flex-col items-center justify-center p-20 min-h-100">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading room details...</p>
      </div>
    );
  }

  return (
    <div className="border border-border bg-card p-10 shadow-xl max-w-content-area w-[90%] mx-auto my-20">
      <div className="mb-10 flex items-center justify-between">
        <div className="w-full">
          <div className="flex items-center justify-between w-full">
            <p className="uppercase tracking-[0.35em] text-primary text-xs">
              Hotel Management
            </p>
            <Button
              className="cursor-pointer rounded-none px-6 "
              onClick={() => router.push("/dashboard/rooms")}
            >
              <ChevronLeft />
              Back
            </Button>
          </div>

          <h2 className="text-4xl font-heading mt-3">
            {isEdit ? "Edit Room" : "Create Room"}
          </h2>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium tracking-wide text-muted-foreground">
            Room Name
          </label>
          <input
            placeholder="Room Name"
            {...register("name")}
            className="border p-4"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium tracking-wide text-muted-foreground">
            Price Per Night (₹)
          </label>
          <input
            type="number"
            placeholder="Price Per Night"
            {...register("pricePerNight")}
            className="border p-4"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium tracking-wide text-muted-foreground">
            Room Type
          </label>
          <select {...register("roomType")} className="border p-4">
            <option value="CLASSIC">Classic</option>
            <option value="DELUXE">Deluxe</option>
            <option value="DUPLEX">Duplex</option>
            <option value="SUITE">Suite</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium tracking-wide text-muted-foreground">
            Max Adults
          </label>
          <input
            type="number"
            placeholder="Max Adults"
            {...register("maxAdults")}
            className="border p-4"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium tracking-wide text-muted-foreground">
            Max Children
          </label>
          <input
            type="number"
            placeholder="Max Children"
            {...register("maxChildren")}
            className="border p-4"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium tracking-wide text-muted-foreground">
            Amenities (comma separated)
          </label>
          <input
            placeholder="Wifi, TV, AC, Pool"
            {...register("amenities")}
            className="border p-4"
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium tracking-wide text-muted-foreground">
            Room Description
          </label>
          <textarea
            rows={6}
            placeholder="Room Description"
            {...register("description")}
            className="border p-4"
          />
        </div>

        {/* Image Upload Section */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-muted-foreground">
                Room Images
              </label>
              {isUploading && (
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  <span className="text-xs font-medium text-blue-600">
                    Uploading...
                  </span>
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
            <div
              className={`border-2 border-dashed  p-6 text-center transition-colors ${
                isUploading
                  ? "border-blue-300 bg-blue-50/50 cursor-not-allowed"
                  : "border-gray-300 hover:border-primary"
              }`}
            >
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
                htmlFor={isUploading ? undefined : "image-upload"}
                className={`flex flex-col items-center gap-2 ${isUploading ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    <span className="text-sm font-medium text-primary">
                      Uploading room images...
                    </span>
                    <span className="text-xs text-gray-500">
                      Please wait while your files are uploaded to Cloudinary
                    </span>
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
              <div className="mt-6 p-4 bg-green-50 border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-green-900">
                    ✓ {uploadedImages.length}{" "}
                    {uploadedImages.length === 1 ? "Image" : "Images"} Uploaded
                  </h4>
                  <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                    Ready to save
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="relative h-24 w-full overflow-hidden bg-gray-100 shadow-sm border-2 border-green-200">
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
                      <p className="text-xs text-gray-600 mt-1 text-center">
                        Image {index + 1}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="
            bg-primary
            text-white
            py-4
            md:col-span-2
            hover:opacity-90
            transition-all
            disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
          "
        >
          {isSubmitting
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
