export function filterDigits(maxDigits, viewString) {
  const filteredDigits = viewString.replace(/[^0-9]/g, '');
  return filteredDigits.slice(0, maxDigits);
}