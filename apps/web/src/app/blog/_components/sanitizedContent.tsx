"use client"; // Ensure it's a Client Component

import React from "react";
import DOMPurify from "dompurify";

type Props = {
  content: string;
  className?: string;
};

const SanitizedContent = ({ content, className }: Props) => {
  // Ensure sanitization happens only on the client
  const cleanHtml = DOMPurify.sanitize(content);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
      className={className}
    />
  );
};

export default SanitizedContent;
