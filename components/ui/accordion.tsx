'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ title, children, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left font-medium hover:text-primary transition-colors"
      >
        <span className="text-base font-semibold">{title}</span>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-primary' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: {
    title: string;
    content: React.ReactNode;
  }[];
  defaultOpenIndex?: number;
  allowMultiple?: boolean;
}

export function Accordion({ items, defaultOpenIndex, allowMultiple = false }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = React.useState<number[]>(
    defaultOpenIndex !== undefined ? [defaultOpenIndex] : []
  );

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="divide-y divide-border">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndexes.includes(index)}
          onToggle={() => handleToggle(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
