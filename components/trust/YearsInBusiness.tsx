"use client";

import { useSyncExternalStore } from "react";
import { getCompletedYears } from "@/content/site";

interface YearsInBusinessProps {
  foundedAt: string;
  initialYears: number;
}

const refreshEveryHour = (notify: () => void) => {
  const timer = window.setInterval(notify, 60 * 60 * 1000);
  return () => window.clearInterval(timer);
};

export function YearsInBusiness({ foundedAt, initialYears }: YearsInBusinessProps) {
  return useSyncExternalStore(
    refreshEveryHour,
    () => getCompletedYears(foundedAt),
    () => initialYears,
  );
}
