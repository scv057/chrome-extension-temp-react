import getConfig from "./getConfig";
import fetchAnswer from "./fetchAnswer";
import { IDialog } from "../components/myDisclosure";
import getVideoId from "./getVideoId";
import fetchBiliVideo, { fetchSubtitle, fetchSubtitleUrls } from "./fetchBiliVideo";
import matchSubtitles from "./matchSubtitles";

const videoID = getVideoId(document.URL);


export default async function fetchSummary(): Promise<IDialog> {
  let prompt = getConfig('defaultPrompt');
  const {status: vStatus, response: vRes} = await fetchBiliVideo(videoID);
  if (vStatus === 'error') return ;
  const {desc, title, cid} = vRes;

  const {status: tStatus, response: tRes} = await fetchSubtitleUrls(videoID, cid);
  if (tStatus === 'error') return ;
  const {data:{subtitles: subtitles}} = tRes;

  const {status: sStatus, response: subtitle} = await fetchSubtitle(matchSubtitles(subtitles));
  if (sStatus === 'error') return ;

  const res = await fetchAnswer(
    `${ prompt }
  ${ subtitle }
  `)
  if (res.status === 'success') {
    return {
      question: `summary of ${ title }`,
      answer: res.response.reply
    }
  }
};
