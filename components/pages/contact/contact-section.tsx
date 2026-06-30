/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Mail, Phone, User, MessageSquare } from "lucide-react";
import { z } from "zod";
import { contactSchema } from "@/validations/contact.validation";
import { api } from "@/lib/endpoints";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { premiumToast } from "@/components/shared/premium-toast";

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      subject: "Connect Inquiry",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      const res = await api.contacts.submit(values);
      if ((res as any)?.success) {
        premiumToast.success({
          title: "Message Sent Successfully",
          description: "We’ll get back to you within 24 hours.",
        });
        reset();
      } else {
        premiumToast.error({
          title: "Something went wrong",
          description: "Please try again later.",
        });
      }
    } catch (err: any) {
      premiumToast.error({
        title: "Something went wrong",
        description: "Please try again later.",
      });
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pb-20">
      <div className="max-w-content-area w-[90%] mx-auto">
        <div className="grid lg:grid-cols-2 overflow-hidden border border-border bg-card">
          <div className="relative min-h-125">
            <Image
              src="/images/room6.png"
              alt="Hotel Blu Plaza"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute bottom-10 left-10 text-white max-w-md">
              <span className="uppercase tracking-[0.4em] text-primary text-sm">
                Blu Plaza Hotels & Resorts
              </span>

              <h2 className="text-5xl font-heading mt-4 mb-5 text-muted">
                Stay. Relax. Experience comfort.
              </h2>

              <p className="text-white/80 leading-8">
                From peaceful weekend stays to professional business visits, we
                ensure a seamless hospitality experience tailored just for you.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="p-8 lg:p-12">
            <span className="uppercase tracking-[0.3em] text-primary text-sm font-medium">
              Let’s Connect
            </span>

            <h2 className="text-4xl font-heading mt-4 mb-8">
              We’re here to help you
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="mb-2 flex items-center gap-2 font-medium text-sm text-muted-foreground">
                  <User size={16} />
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  className="h-12 rounded-none"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="mb-2 flex items-center gap-2 font-medium text-sm text-muted-foreground">
                  <Mail size={16} />
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-12 rounded-none"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="mb-2 flex items-center gap-2 font-medium text-sm text-muted-foreground">
                  <Phone size={16} />
                  Phone Number (Optional)
                </label>
                <Input
                  type="text"
                  placeholder="Enter your contact number (optional)"
                  className="h-12 rounded-none"
                  maxLength={10}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 flex items-center gap-2 font-medium text-sm text-muted-foreground">
                  <MessageSquare size={16} />
                  Your Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can assist you..."
                  className="w-full p-4 border border-border bg-background outline-none resize-none text-sm focus:ring-1 focus:ring-primary"
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="
                  h-14
                  px-10
                  rounded-none
                  bg-primary
                  text-primary-foreground
                  uppercase
                  tracking-widest
                  cursor-pointer
                  hover:opacity-90
                  transition-all
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  flex items-center justify-center gap-2
                "
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
