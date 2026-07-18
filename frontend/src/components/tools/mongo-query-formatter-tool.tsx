"use client";

import { useCallback } from "react";
import { formatMongoQuery } from "@/lib/mongo-utils";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";

const SAMPLE = `db.orders.find({status: "shipped", total: {$gt: 100}, tags: {$in: ["urgent", "priority"]}}).sort({createdAt: -1}).limit(10)`;

export function MongoQueryFormatterTool() {
  const convert = useCallback((input: string): ConvertResult => {
    try {
      return { output: formatMongoQuery(input) };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : "Could not format this query." };
    }
  }, []);

  return (
    <ConvertTool
      sampleInput={SAMPLE}
      convert={convert}
      inputLabel="MongoDB query input"
      outputLabel="Formatted output"
      inputPlaceholder="Paste a MongoDB shell query, filter, or aggregation pipeline here..."
      outputPlaceholder="Formatted query will appear here."
      downloadFilename="query.js"
      downloadMimeType="text/plain"
    />
  );
}
