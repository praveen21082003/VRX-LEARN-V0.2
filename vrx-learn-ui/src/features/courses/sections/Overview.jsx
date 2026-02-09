import React from "react";
import { MarkdownContent } from "@/components/ui";


function Overview({ lesson }) {

  return (
    <MarkdownContent content={lesson?.overview} />
  );
}

export default Overview;
