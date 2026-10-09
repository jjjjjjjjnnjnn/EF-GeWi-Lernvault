import * as React from "react";
import { cn } from "../../lib/utils";

interface AccordionContextValue {
  expandedItems: Set<string>;
  toggleItem: (id: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion components must be used within <Accordion />");
  return ctx;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
}

function Accordion({
  type = "single",
  defaultValue,
  className,
  children,
  ...props
}: AccordionProps) {
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(() => {
    if (!defaultValue) return new Set<string>();
    if (Array.isArray(defaultValue)) return new Set(defaultValue);
    return new Set([defaultValue]);
  });

  const toggleItem = React.useCallback(
    (id: string) => {
      setExpandedItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (type === "single") {
            next.clear();
          }
          next.add(id);
        }
        return next;
      });
    },
    [type]
  );

  return (
    <AccordionContext.Provider value={{ expandedItems, toggleItem }}>
      <div className={cn("divide-y divide-[var(--line)] border-y border-[var(--line)]", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-accordion-item={value}
        className={cn("py-1", className)}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<{ "data-item-value"?: string }>, {
              "data-item-value": value,
            });
          }
          return child;
        })}
      </div>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  "data-item-value"?: string;
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, "data-item-value": itemValue, ...props }, ref) => {
    const { expandedItems, toggleItem } = useAccordionContext();
    const isExpanded = itemValue ? expandedItems.has(itemValue) : false;

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={isExpanded}
        onClick={() => itemValue && toggleItem(itemValue)}
        className={cn(
          "flex w-full items-center justify-between py-2.5 text-left text-xs font-bold text-[var(--ink)] hover:underline transition-all cursor-pointer select-none",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("shrink-0 text-[var(--gray)] transition-transform duration-200", isExpanded && "rotate-180")}
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  "data-item-value"?: string;
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, "data-item-value": itemValue, ...props }, ref) => {
    const { expandedItems } = useAccordionContext();
    const isExpanded = itemValue ? expandedItems.has(itemValue) : false;

    if (!isExpanded) return null;

    return (
      <div
        ref={ref}
        className={cn("pb-3 pt-0 text-xs text-[var(--gray)] leading-relaxed font-sans", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
