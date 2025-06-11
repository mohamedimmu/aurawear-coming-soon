"use client";

import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

interface RichContentViewerProps {
  content: string | null | undefined;
  className?: string;
  headingClassName?: string;
  paragraphClassName?: string;
  listClassName?: string;
  linkClassName?: string;
  listItemClassName?: string;
}

const RichContentViewer = ({
  content,
  className = "",
  headingClassName = "",
  paragraphClassName = "",
  listClassName = "",
  linkClassName = "",
  listItemClassName = "",
}: RichContentViewerProps) => {
  // Sanitize HTML to prevent XSS attacks
  const [sanitizedContent, setSanitizedContent] = useState<string>("");

  useEffect(() => {
    if (!content) return;

    // Sanitize and style content on the client side
    const cleanContent = DOMPurify.sanitize(content);
    const styledContent = cleanContent
      .replace(/<h1>/g, `<h1 class="${headingClassName}">`)
      .replace(/<h2>/g, `<h2 class="${headingClassName}">`)
      .replace(/<h3>/g, `<h3 class="${headingClassName}">`)
      .replace(/<p>/g, `<p class="${paragraphClassName}">`)
      .replace(/<ul>/g, `<ul class="${listClassName}">`)
      .replace(/<ol>/g, `<ol class="${listClassName}">`)
      .replace(/<ul>/g, `<li class="${listItemClassName}">`)
      .replace(/<a /g, `<a class="${linkClassName}" `);

    setSanitizedContent(styledContent);
  }, [
    content,
    headingClassName,
    paragraphClassName,
    listClassName,
    linkClassName,
    listItemClassName,
  ]);

  if (!content) return null;
  return (
    <div
      className={`rich-content ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default RichContentViewer;
