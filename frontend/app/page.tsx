import { Suspense } from "react";
import SearchPage from "@/components/home/SearchPage";

export default function Home() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}
