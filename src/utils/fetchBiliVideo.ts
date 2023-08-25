import axios from "axios";

export const biliApi = axios.create({
  baseURL: 'https://api.bilibili.com/x',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});

export default async function fetchBiliVideo(bvid?: string, aid?: string) {
  // todo aid 转换 bvid
  if (!aid && !bvid) return;
  let response: object;
  try {
    const res = await biliApi.get('/web-interface/view', {params: {bvid}});
    const {data} = res
    const {desc, title, pages} = data;
    const cid = pages[0].cid;

    response = {
      desc, title, cid
    };
  } catch (e) {
    console.log(e);
  }
  return response
};

export async function fetchSubtitleUrls(bvid: string, cid: string) {
  const response = await biliApi.get('/player/v2', {params: {bvid, cid}})
  const {data: {
    subtitle: {subtitles}
  }} = response;

  console.log(subtitles);
}

export async function fetchSubtitle(url:string){
  const url1 = "//aisubtitle.hdslb.com/bfs/subtitle/6c33513200d2e5f784259283ba9222ae7ecfb6ff.json?auth_key=1692983275-98a2b5d01f3940a2a941ef051a860ae2-0-2c8c65497a1ebae4dc058d72d7dad177"
  const url2 = "//aisubtitle.hdslb.com/bfs/ai_subtitle/prod/3527470001029248276444cdc5fb31b3020a095e530f21b35fc?auth_key=1692983275-4d1b39cf07e34b709746ad2be717d84c-0-9ba59774ddcfff8527e67d25760afe3f"

  try {
    const res = await axios.get(url1);
    const {data} = res;
    console.log(data);
  } catch (e) {

  }
}