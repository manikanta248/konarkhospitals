import { ButtonLink } from "@/components/ui/Button";
import { Plus } from "lucide-react";

export function AdminPageHeader({ title, newHref, newLabel }: { title: string; newHref?: string; newLabel?: string }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="font-display text-xl font-bold text-ink-950">{title}</h1>
      {newHref && (
        <ButtonLink href={newHref} size="sm" icon={<Plus size={16} />}>
          {newLabel ?? "Add New"}
        </ButtonLink>
      )}
    </div>
  );
}
