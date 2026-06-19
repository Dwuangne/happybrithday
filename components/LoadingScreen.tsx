"use client";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-white/20 border-t-rose-400" />
      <p className="mt-6 animate-pulse text-lg font-medium text-white/80">
        Đang chuẩn bị bất ngờ...
      </p>
    </div>
  );
}
