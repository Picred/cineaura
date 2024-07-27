/**
 * Converts an ISO 8601 date string to a human-readable date format.
 * @param isoDate - The date string in ISO 8601 format (e.g., "2024-08-29T18:30:00.000Z").
 * @returns A string representing the date in a readable format, based on the provided locale and options.
 */
export function formatIsoDate(isoDate: string): string {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleString("en-EN", options);
}
