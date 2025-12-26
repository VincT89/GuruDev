/**
 * Capitalize first letter
 */
export function capitalize(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate text
 */
export function truncate(text = "", max = 100) {
  return text.length > max ? text.slice(0, max) + "..." : text;
}
