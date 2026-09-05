import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Loader2 size={22} className="animate-spin text-brand-600" />
    </div>
  );
}
