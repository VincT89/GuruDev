/**
 * Format date (es: 25 dic 2025)
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Format date + time
 */
export function formatDateTime(date) {
  return new Intl.DateTimeFormat("it-IT", { // Italian format - dd mm yyyy hh:mm, with Intl.DateTimeFormat (function formatDateTime)
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

/**
 * Relative time (es: 5 min fa)
 */
export function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000); // Calculate the difference in seconds

  // Define time intervals in seconds
  const intervals = [
    { singular: "anno", plural: "anni", seconds: 31536000 },
    { singular: "mese", plural: "mesi", seconds: 2592000 },
    { singular: "giorno", plural: "giorni", seconds: 86400 },
    { singular: "ora", plural: "ore", seconds: 3600 },
    { singular: "minuto", plural: "minuti", seconds: 60 },
  ];

  // Find the largest interval that fits into the seconds difference
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${count > 1 ? interval.plural : interval.singular} fa`; // Return the formatted string pluralized correctly
    }
  }

  return "adesso";
}
