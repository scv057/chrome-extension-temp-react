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
  // todo 字幕url的过滤提取
  const subtitles = tRes?.data?.data?.subtitle?.subtitles;

  let subtitle = "";

  if (subtitles && subtitles.length) {
    const {status: sStatus, response} = await fetchSubtitle(matchSubtitles(subtitles));
    if (sStatus === 'error') return ;
    subtitle = response?.subtitle;
  }


  const q = `
  title: ${title}
  Transcript: ${subtitle}
  `;

  const res = await fetchAnswer(q)

  if (res.status === 'success') {
    return {
      question: `summary of ${ title }`,
      answer: res.response.reply
    }
  } else {
    return {
      question: `summary of ${ title }`,
      answer: "Error"
    }
  }
};
