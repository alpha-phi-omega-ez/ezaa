const formatDate = (date: Date, format: "short" | "full" = "full"): string => {
  const formatted = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    dateStyle: format,
  }).format(date);

  return formatted;
}

export {
  formatDate,
};
