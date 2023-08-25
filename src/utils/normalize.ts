interface Sentence {
  from: number;
  to: number;
  location: number;
  content: number;
}

interface Subtitle{
  Stroke?: string;
  background_alpha?: number;
  background_color?: string;
  body: Array<Sentence>
}

export default function normalize(subtitle: Subtitle): string {
  const {body} = subtitle;
  // todo 优化字幕合并
  return body.reduce((pre, sentence) => {
    return pre + " " + sentence.content
  }, "")
};