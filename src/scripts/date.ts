const formatDate = (dateString: string, format: "short" | "full" = "full"): string => {
  const date = new Date(dateString);
  const formatted = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    dateStyle: format,
  }).format(date);

  return formatted;
}

export {
  formatDate,
};
