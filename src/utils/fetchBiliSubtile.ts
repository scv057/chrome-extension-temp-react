// import { fetchBiliSubtitleUrls } from "./fetchBiliSubtitleUrls";
//
// function reduceBilibiliSubtitleTimestamp(p1: string, p2: boolean): string {
//   return ''
// }
//
//
// export async function fetchBiliSubtile(videoId: string, pageNumber?: null| string, shouldShowTimestamp?: boolean) {
//
//   const res = await fetchBiliSubtitleUrls(videoId, pageNumber);
//
//   const {title, desc, dynamic, subtitle} = res | {};
//   const hasDescription = desc || dynamic
//   const descriptionText = hasDescription ? `${desc} ${dynamic}` : undefined
//   const subtitleList = subtitle?.list
//   if (!subtitleList || subtitleList?.length < 1) {
//     return { title, subtitlesArray: null, descriptionText }
//   }
//
//   const betterSubtitle = subtitleList.find(({ lan }: { lan: string }) => lan === 'zh-CN') || subtitleList[0]
//   const subtitleUrl = betterSubtitle?.subtitle_url?.startsWith('//')
//     ? `https:${betterSubtitle?.subtitle_url}`
//     : betterSubtitle?.subtitle_url
//   console.log('subtitle_url', subtitleUrl)
//
//   const subtitleResponse = await fetch(subtitleUrl)
//   const subtitles = await subtitleResponse.json()
//   const transcripts = reduceBilibiliSubtitleTimestamp(subtitles?.body, shouldShowTimestamp)
//   return { title, subtitlesArray: transcripts, descriptionText }
// }