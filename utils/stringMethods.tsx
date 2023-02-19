export function isNullOrWhiteSpace(str?: string | undefined | null) {
  return str === null || str?.match(/^ *$/) !== null;
}
