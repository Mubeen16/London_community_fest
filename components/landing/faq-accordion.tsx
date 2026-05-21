"use client";

import { useState } from "react";
import type { FAQItem } from "@/types";
import { VenueDirectionsLink } from "@/components/ui/venue-directions-link";
import { sectionAccent } from "@/lib/section-theme";
import { cn } from "@/lib/utils";

interface FaqAccordionProps {
  columns: FAQItem[][];
}

function FaqAccordionItem({
  question,
  answer,
  directionsLink,
  isOpen,
  onToggle,
  accent,
}: {
  question: string;
  answer: string;
  directionsLink?: boolean;
  isOpen: boolean;
  onToggle: () => void;
  accent: string;
}) {
  return (
    <li>
      <details open={isOpen}>
        <summary
          className="flex min-h-11 cursor-pointer list-none items-center px-4 py-3 font-sans text-sm font-semibold text-ink marker:content-none sm:px-5 [&::-webkit-details-marker]:hidden"
          onClick={(event) => {
            event.preventDefault();
            onToggle();
          }}
        >
          <span className="flex items-center justify-between gap-3">
            {question}
            <span
              className={cn(
                accent,
                "shrink-0 text-lg leading-none transition-transform",
                isOpen && "rotate-45",
              )}
              aria-hidden
            >
              +
            </span>
          </span>
        </summary>
        <div className="border-t border-paper-300 px-4 pb-3 pt-2 sm:px-5">
          <p className="font-sans text-sm leading-relaxed text-ink-muted">{answer}</p>
          {directionsLink ? (
            <p className="mt-2">
              <VenueDirectionsLink theme="light" />
            </p>
          ) : null}
        </div>
      </details>
    </li>
  );
}

export function FaqAccordion({ columns }: FaqAccordionProps) {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const accent = sectionAccent("faq");

  const handleToggle = (question: string) => {
    setOpenQuestion((current) => (current === question ? null : question));
  };

  return (
    <div className="grid md:grid-cols-2 md:divide-x md:divide-paper-300">
      {columns.map((columnItems, columnIndex) => (
        <ul
          key={columnIndex}
          className={cn(
            "divide-y divide-paper-300",
            columnIndex === 0 && "max-md:border-b max-md:border-paper-300",
          )}
        >
          {columnItems.map((item) => (
            <FaqAccordionItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              directionsLink={item.directionsLink}
              isOpen={openQuestion === item.question}
              onToggle={() => handleToggle(item.question)}
              accent={accent}
            />
          ))}
        </ul>
      ))}
    </div>
  );
}
