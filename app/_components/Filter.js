"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { act, useState } from "react";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const active = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}/?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex border border-primary-800">
      <Button handleFilter={handleFilter} filter="all" active={active}>
        All
      </Button>
      <Button handleFilter={handleFilter} filter="small" active={active}>
        2&mdash;3 guests
      </Button>
      <Button handleFilter={handleFilter} filter="medium" active={active}>
        4&mdash;7 guests
      </Button>
      <Button handleFilter={handleFilter} filter="large" active={active}>
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ children, handleFilter, filter, active }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        active === filter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
