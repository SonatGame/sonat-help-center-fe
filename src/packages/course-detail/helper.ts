export function getGoogleDocId(url: string) {
  const regex = /\/document\/d\/([a-zA-Z0-9-_]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
