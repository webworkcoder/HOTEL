export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-2 border-muted"></div>
          <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-xl font-heading text-foreground">
            Loading Luxury Experience
          </h2>
          <p className="text-muted-foreground text-sm">
            Preparing your hotel details...
          </p>
        </div>

        <div className="w-[320px] space-y-3 mt-4">
          <div className="h-4 bg-muted rounded-full animate-pulse"></div>
          <div className="h-4 bg-muted rounded-full w-5/6 animate-pulse"></div>
          <div className="h-4 bg-muted rounded-full w-3/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
