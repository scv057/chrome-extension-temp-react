import getConfig from "./getConfig";
import fetchAnswer from "./fetchAnswer";
import { IDialog } from "../components/myDisclosure";

function fetchSubtitle(): string {
  return "";
}

export default function fetchSummary(): IDialog {
  let prompt = getConfig('defaultPrompt');
  const title = '视频1';
  let subtitle = fetchSubtitle();
  const summary = fetchAnswer(
    `${ prompt }
  ${ subtitle }
  `)

  return {
    question: `summary of ${ title }`,
    answer: summary,
  };
};
