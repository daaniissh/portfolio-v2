export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-EN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
