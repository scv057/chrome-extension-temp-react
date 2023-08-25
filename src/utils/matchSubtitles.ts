export default function matchSubtitles(subtitles: Array<{subtitle_url: string}>): string {

  return subtitles[0].subtitle_url;
}