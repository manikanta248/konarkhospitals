"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, UserX } from "lucide-react";
import type { Department, Doctor } from "@konark/shared";
import { DoctorCard } from "./DoctorCard";

export function DoctorsDirectory({ doctors, departments }: { doctors: Doctor[]; departments: Department[] }) {
  const searchParams = useSearchParams();
  const deptFromUrl = searchParams.get("department");

  const [query, setQuery] = useState("");
  const [activeDept, setActiveDept] = useState<string | "all">(
    deptFromUrl && departments.some((d) => d.slug === deptFromUrl) ? deptFromUrl : "all"
  );

  // Keep in sync if the query param changes after mount (e.g. navigating between department pages).
  useEffect(() => {
    if (deptFromUrl && departments.some((d) => d.slug === deptFromUrl)) {
      setActiveDept(deptFromUrl);
    }
  }, [deptFromUrl, departments]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return doctors.filter((doc) => {
      const matchesDept = activeDept === "all" || doc.departmentSlug === activeDept;
      const matchesQuery =
        !q ||
        doc.name.toLowerCase().includes(q) ||
        doc.specialization.toLowerCase().includes(q) ||
        doc.departmentName.toLowerCase().includes(q);
      return matchesDept && matchesQuery;
    });
  }, [doctors, query, activeDept]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or specialty"
            className="h-11 w-full rounded-lg border border-ink-200 bg-white pl-10 pr-4 text-sm text-ink-800 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
          <FilterChip label="All Departments" active={activeDept === "all"} onClick={() => setActiveDept("all")} />
          {departments.map((dept) => (
            <FilterChip
              key={dept.slug}
              label={dept.name}
              active={activeDept === dept.slug}
              onClick={() => setActiveDept(dept.slug)}
            />
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm text-ink-500">
        {filtered.length} {filtered.length === 1 ? "doctor" : "doctors"} found
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {filtered.map((doctor) => (
            <DoctorCard key={doctor.slug} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-xl2 border border-dashed border-ink-200 py-16 text-center">
          <UserX size={28} className="text-ink-300" />
          <p className="text-sm font-medium text-ink-600">No doctors match your search</p>
          <button
            onClick={() => {
              setQuery("");
              setActiveDept("all");
            }}
            className="text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors ${
        active
          ? "border-brand-600 bg-brand-600 text-white"
          : "border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-700"
      }`}
    >
      {label}
    </button>
  );
}
