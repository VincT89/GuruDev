/**
 * Format numbers (1.2k, 3.4M)
 */
export function formatNumber(num = 0) {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "k";
  return num.toString();
}
