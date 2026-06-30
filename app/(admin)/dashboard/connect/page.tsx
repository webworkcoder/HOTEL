/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  MessageSquare,
  Mail,
  Phone,
  Clock,
  Eye,
  X,
  Loader2,
} from "lucide-react";
import { api } from "@/lib/endpoints";
import { Button } from "@/components/ui/button";

export default function ConnectPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await api.contacts.getAll();
      if ((res as any)?.success) {
        setMessages((res as any).data || []);
      } else {
        setError((res as any)?.message || "Failed to load messages.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load messages.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <main className="flex-1 bg-secondary/10 py-10 md:py-20 min-h-screen">
      <div className="max-w-content-area w-[90%] mx-auto bg-card border border-border overflow-hidden my-10 shadow-sm">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-card">
          <div>
            <h2 className="text-3xl font-heading font-bold">
              Connect Submissions
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Manage guest contact messages and inquiries
            </p>
          </div>

          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageSquare className="text-primary" size={28} />
          </div>
        </div>

        {/* Content Table */}
        <div className="overflow-x-auto">
          {error && (
            <div className="bg-red-50 border-b border-red-200 p-4 text-red-700 text-sm text-center">
              Error: {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-16 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="text-muted-foreground text-sm font-medium">
                Loading messages...
              </span>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center p-16 text-muted-foreground">
              No contact form submissions found.
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-muted font-semibold text-muted-foreground uppercase tracking-wider text-xs border-b border-border">
                <tr>
                  <th className="p-5">Sender</th>
                  <th className="p-5">Inquiry Details</th>
                  <th className="p-5">Message Preview</th>
                  <th className="p-5">Received At</th>
                  <th className="p-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {messages.map((msg) => (
                  <tr
                    key={msg._id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-5 font-medium text-foreground">
                      <div className="space-y-1">
                        <p className="font-bold text-base">{msg.name}</p>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Mail size={12} />
                          {msg.email}
                        </div>
                        {msg.phone && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Phone size={12} />
                            {msg.phone}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="p-5">
                      <span className="bg-primary/10 text-primary font-medium text-xs py-1 px-3  uppercase tracking-wider">
                        {msg.subject || "Connect Inquiry"}
                      </span>
                    </td>

                    <td className="p-5 text-muted-foreground max-w-xs truncate">
                      {msg.message}
                    </td>

                    <td className="p-5 text-muted-foreground text-xs whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {formatDate(msg.createdAt)}
                      </div>
                    </td>

                    <td className="p-5">
                      <div className="flex justify-center">
                        <Button
                          onClick={() => setSelectedMessage(msg)}
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 border rounded-none flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white"
                        >
                          <Eye size={18} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal Dialog for Message Details */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border max-w-xl w-full p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            >
              <X size={20} />
            </button>

            <div>
              <span className="uppercase tracking-[0.25em] text-primary text-xs font-semibold">
                Message Detail
              </span>
              <h3 className="text-2xl font-heading mt-2 font-bold">
                {selectedMessage.subject || "Connect Inquiry"}
              </h3>
            </div>

            <div className="border-y border-border py-4 space-y-3 text-sm">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Guest Name:</span>
                <span className="col-span-2 font-semibold text-foreground">
                  {selectedMessage.name}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Email Address:</span>
                <span className="col-span-2 text-foreground font-mono">
                  {selectedMessage.email}
                </span>
              </div>
              {selectedMessage.phone && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-muted-foreground">Phone Number:</span>
                  <span className="col-span-2 text-foreground font-mono">
                    {selectedMessage.phone}
                  </span>
                </div>
              )}
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Submitted At:</span>
                <span className="col-span-2 text-muted-foreground">
                  {formatDate(selectedMessage.createdAt)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Message
              </h4>
              <div className="bg-muted/50 border border-border p-5 text-sm leading-7 text-foreground whitespace-pre-wrap max-h-60 overflow-y-auto">
                {selectedMessage.message}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                onClick={() => setSelectedMessage(null)}
                className="rounded-none px-6 cursor-pointer"
              >
                Close Message
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
