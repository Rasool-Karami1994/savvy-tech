import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./ui/Button";

const rxHasWordLike = /[A-Za-z0-9\u0600-\u06FF]/;
const rxHasLink = /(https?:\/\/|www\.)/i;
const normalize = (s: string) => s.replace(/\s+/g, " ").trim();

const ItemSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(80, "Max 80 characters")
    .refine((v) => normalize(v).length >= 3, "At least 3 characters")
    .refine(
      (v) => rxHasWordLike.test(normalize(v)),
      "Must include a letter or a number"
    )
    .refine((v) => !rxHasLink.test(v), "Links are not allowed in the title"),
  subtitle: z
    .string()
    .max(140, "Max 140 characters")
    .refine(
      (v) => v.trim() === "" || normalize(v).length >= 5,
      "If provided, at least 5 characters"
    )
    .optional()
    .or(z.literal("")),
});

export type ItemFormValues = z.infer<typeof ItemSchema>;

export default function ItemForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "Create",
}: {
  defaultValues?: Partial<ItemFormValues>;
  onSubmit: (values: ItemFormValues) => void;
  onCancel: () => void;
  submitLabel?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    watch,
  } = useForm<ItemFormValues>({
    resolver: zodResolver(ItemSchema),
    defaultValues: { title: "", subtitle: "", ...defaultValues },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  useEffect(() => setFocus("title"), [setFocus]);

  const subtitleVal = watch("subtitle") ?? "";

  const baseInput =
    "w-full rounded-lg border border-border bg-fields text-title placeholder:text-title/50 px-3 py-2 " +
    "outline-none transition-colors transition-shadow duration-150 " +
    "focus:bg-main focus:border-btn focus:ring-1 focus:ring-btn focus:shadow-elev-1";

  return (
    <form
      onSubmit={handleSubmit((vals) => {
        const clean: ItemFormValues = {
          title: normalize(vals.title),
          subtitle: vals.subtitle ? normalize(vals.subtitle) : "",
        };
        onSubmit(clean);
      })}
      className="space-y-6"
      noValidate
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-title/70 mb-2"
        >
          Title
        </label>
        <input
          id="title"
          {...register("title")}
          placeholder="Type the title"
          className={baseInput}
          aria-invalid={!!errors.title || undefined}
          aria-describedby="title-help title-error"
          maxLength={80}
          inputMode="text"
          autoComplete="off"
        />

        {errors.title && (
          <p id="title-error" className="mt-1 text-sm text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="subtitle"
          className="block text-sm font-medium text-title/70 mb-2"
        >
          Subtitle
        </label>
        <textarea
          id="subtitle"
          {...register("subtitle")}
          rows={3}
          placeholder="Short description (optional)"
          className={baseInput}
          aria-invalid={!!errors.subtitle || undefined}
          aria-describedby="subtitle-help subtitle-error"
          maxLength={140}
          inputMode="text"
        />
        <div className="mt-1 flex items-center justify-between text-xs">
          {errors.subtitle && (
            <p id="subtitle-error" className="mt-1 text-sm text-red-500">
              {errors.subtitle.message}
            </p>
          )}
          <span className="text-title/70">{subtitleVal.length}/140</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <button type="submit">
          <Button variant="primary">{submitLabel}</Button>
        </button>
      </div>
    </form>
  );
}
