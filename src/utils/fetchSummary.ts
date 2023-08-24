import getConfig from "./getConfig";
import fetchAnswer from "./fetchAnswer";
import { IDialog } from "../components/myDisclosure";

function fetchSubtitle(): string {
  return "hahahah";
}

function fetchTitle(): string {
  return 'hahahah'
}

export default async function fetchSummary(): Promise<IDialog> {
  let prompt = getConfig('defaultPrompt');
  const title = fetchTitle();
  let subtitle = fetchSubtitle();

  const summary = await fetchAnswer(
    `${ prompt }
  ${ subtitle }
  `)

  return {
    question: `summary of ${ title }`,
    answer: summary,
  };
};
