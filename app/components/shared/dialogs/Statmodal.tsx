"use client";

import { useState } from "react";
import { ArrowUpRight, Settings, type LucideIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { useNavigate } from "react-router";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StatModalContent {
  /** Short headline shown at the top of the modal body */
  headline: string;
  /** One-paragraph summary description */
  description: string;
  /** Optional list of detail rows */
  details?: { label: string; value: string }[];
  /** Optional scrollable body sections */
  sections?: { title: string; body: string }[];
  /** Optional CTA button label + handler */
  cta?: { label: string; onClick?: () => void };
  cta_url?: string;
  percentage?: number;
}

export interface StatModalProps {
  /** The trigger element (e.g. a stat card button) */
  trigger: React.ReactNode;
  /** Icon component for the modal header accent */
  icon: LucideIcon;
  /** Large value displayed in the modal header */
  value: string;
  /** Uppercase label */
  label: string;
  /** Sub-label / badge */
  change: string;
  /** All the customisable content */
  content: StatModalContent;
  percentage?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function StatModal({
  trigger,
  icon: Icon,
  value,
  label,
  change,
  content,
  percentage,
}: StatModalProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Wrap the trigger in a div that intercepts clicks */}
      <div onClick={() => setOpen(true)} className="contents">
        {trigger}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className=" p-0 overflow-hidden rounded-xl border bg-card shadow-xl  mx-5 mx-auto">
          {/* ── Header ── */}
          <div className="flex items-end gap-4 px-6 pt-6 pb-5 border-b bg-muted/30">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-background shadow-sm">
              <Icon className="h-5 w-5 text-foreground" />
            </div>

            <div className="flex-1 min-w-0">
              <DialogTitle className="text-4xl font-serif font-bold leading-none tracking-tight">
                {value}
              </DialogTitle>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground font-medium">
                {label}
              </p>
            </div>

            <span className="shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground bg-background">
              {change}
            </span>
          </div>

          {/* ── Scrollable body ── */}
          <div className="max-h-[60vh] overflow-y-auto px-6 py-5 space-y-5">
            {/* Headline + description */}
            <DialogHeader>
              <DialogDescription asChild>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    {content.headline}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {content.description}
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>

            {/* Key-value detail grid */}
            {content.details && content.details.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {content.details.map((d) => (
                  <div
                    key={d.label}
                    className="rounded-lg border bg-muted/40 px-3 py-2.5"
                  >
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">
                      {d.label}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {d.value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Rich text sections */}
            {content.sections && content.sections.length > 0 && (
              <div className="space-y-4">
                {content.sections.map((s) => (
                  <div key={s.title}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-1">
                      {s.title}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Footer CTA ── */}
          {content.cta && (
            <div className="flex justify-end gap-2 px-6 py-4 border-t bg-muted/20">
              <Button
                size="sm"
                className="gap-1.5"
                onClick={() => {
                  navigate(`${content.cta_url ? content.cta_url : "/"}`);
                }}
              >
                {content.cta.label}
                <Settings className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
