function getIdFromURL(url: string) {
  const regex = new RegExp("(.*?)(^|/|v=)([a-z0-9_-]{11})(.*)?", "gim");
  const regexMatch = regex.exec(url);
  const videoId = regexMatch && regexMatch[3];
  return videoId
}

export default getIdFromURL
