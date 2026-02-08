import { Suspense } from "react";
import SearchPage from "@/components/Searchpage";

export default function Search() {
  return (
    <Suspense fallback={<div className="pt-32 text-center">Loading search…</div>}>
      <SearchPage />
    </Suspense>
  );
}
