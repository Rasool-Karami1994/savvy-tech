const DF = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});
export const formatDate = (iso: string) => DF.format(new Date(iso));
