
export default function getVideoId(url) {
  const regex = /\/video\/([A-Za-z0-9]+)/;
  const match = url.match(regex);

  if (match && match.length > 1) {
    return match[1];
  } else {
    console.log("Video ID not found in the URL.");
  }
}