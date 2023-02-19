export function dateIsPast(text: string) {
  const [month, year] = text.split('/');

  // Set the input date to the last day of the month to ensure accurate comparison
  const date = new Date(
    parseInt(`20${year}`, 10),
    parseInt(month, 10) - 1,
    new Date(parseInt(year, 10), parseInt(month, 10), 0).getDate(),
  );

  const today = new Date();
  return date < today;
}
