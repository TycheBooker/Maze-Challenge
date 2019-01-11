export function isASCII(string) {
  if (typeof(string) !== 'string') {
    return false;
  }
  for (let i = 0; i < string.length; i++) {
    if (string.charCodeAt(i) > 127) {
      return false;
    }
  }
  return true;
}