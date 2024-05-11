import React from "react";

export default function ZodErrors({ error }: { error: string[] }) {
  if (!error) return null
  return error.map((err: string, index: number) => (
    <label key={index} className="mb-2 block text-sm text-red-500">
      {err}
    </label>
  ));
}
