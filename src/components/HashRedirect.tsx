"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function HashRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.toLowerCase();
    const map: Record<string, string> = {
      "#how-we-teach": "/how-we-teach",
      "#curriculum": "/curriculum",
      "#showcase": "/showcase",
      "#pricing": "/pricing",
    };
    if (hash && map[hash]) {
      router.replace(map[hash]);
    }
  }, [router]);

  return null;
}
