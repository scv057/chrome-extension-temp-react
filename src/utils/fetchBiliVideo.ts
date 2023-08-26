import axios from "axios";
import normalize from "./normalize";

interface ErrorRes {
  status: 'error';
  response: Error;
}
interface SuccessRes<T> {
  status: 'success';
  response: T
}

export type ResponseBody<T> = ErrorRes | SuccessRes<T>

interface SubtitlesBody {
  data: {
    data: {
      subtitle: {
        subtitles: Array<{
          subtitle_url: string
        }>
      }
    }
  }
}

export const biliApi = axios.create({
  baseURL: 'https://api.bilibili.com/x',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});

export default async function fetchBiliVideo(bvid?: string, aid?: string): Promise<{ response: { title: any; desc: any; cid: any }; status: string }> {
  // todo aid 转换 bvid
  if (!aid && !bvid) return;
  try {
    const res = await biliApi.get('/web-interface/view', {params: {bvid}});
    const {data: { data }} = res
    const {desc, title, pages} = data;
    const cid = pages[0].cid;

    return {
      status: 'success',
      response: {desc, title, cid}
    }
  } catch (e) {
    return {
      status: 'error',
      response: e
    }
  }
};

export async function fetchSubtitleUrls(bvid: string, cid: string): Promise<ResponseBody<SubtitlesBody>> {
  try {
    const response = await biliApi.get('/player/v2', {params: {bvid, cid}})
    return {
      status: 'success',
      response: response
    }
  } catch (e) {
    return {
      status: 'error',
      response: e
    }
  }
}

export async function fetchSubtitle(url: string): Promise<ResponseBody<{subtitle: string}>> {

  try {
    const res = await axios.get(url);
    const {data} = res;
    return {status: 'success', response: {subtitle: normalize(data)}}
  } catch (e) {
    return {
      status: 'error',
      response: e
    }
  }
}
