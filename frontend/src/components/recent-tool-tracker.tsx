"use client";

import { useEffect } from "react";
import { rememberRecentTool } from "@/lib/recent-tools";

/** Records the open tool locally so search can show it under Recent. */
export function RecentToolTracker({ categorySlug, slug }: { categorySlug: string; slug: string }) {
  useEffect(() => {
    rememberRecentTool(categorySlug, slug);
  }, [categorySlug, slug]);

  return null;
}
