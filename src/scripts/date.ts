const formatDate = (date: Date, format: "short" | "full" = "full"): string => {
  // For date-only values, extract components to avoid timezone shift issues
  // If the date is at midnight UTC, it's likely a date-only value
  const isDateOnly = date.getUTCHours() === 0 && 
                     date.getUTCMinutes() === 0 && 
                     date.getUTCSeconds() === 0 && 
                     date.getUTCMilliseconds() === 0;
  
  if (isDateOnly) {
    // Use the UTC date components to avoid timezone conversion issues
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    
    // Create a date in the target timezone using local date components
    const localDate = new Date(year, month, day);
    
    const formatted = new Intl.DateTimeFormat("en-US", {
      dateStyle: format,
    }).format(localDate);
    
    return formatted;
  }
  
  // For dates with time components, use timezone conversion
  const formatted = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    dateStyle: format,
  }).format(date);

  return formatted;
}

export {
  formatDate,
};
