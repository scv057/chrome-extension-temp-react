// TODO 创建一个panel
const panel = document.createElement('div');

panel.innerText = 'content-script';

function getVideoId(url) {
  const regex = /\/video\/([A-Za-z0-9]+)/;
  const match = url.match(regex);

  if (match && match.length > 1) {
    return match[1];
  } else {
    console.log("Video ID not found in the URL.");
  }
}


console.log('content-script');





async function downloadSubtitle(){
  const videoId = getVideoId(document.URL);
  if (!videoId) return;


}