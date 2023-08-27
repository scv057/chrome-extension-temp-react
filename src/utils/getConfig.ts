import tokens from "../asset/tokens";

export interface IConfig {
  'GPT_TOKEN': string,
  'mission_prompt': string
}

type Keys = keyof IConfig;

const config: IConfig = {
  "mission_prompt":
    `Your output should use the following template:
      #### Summary
      #### Highlights
      - [Emoji] Bulletpoint
      
      Your task is to summarise the text I have given you in up to seven concise bullet points, starting with a short highlight. Choose an appropriate emoji for each bullet point. Use the text above: {{Title}} {{Transcript}}.
      print it in Chinese.
    `,
  "GPT_TOKEN": `${ tokens.GPT_TOKEN }`
};


function getConfig(): IConfig;
function getConfig(key:Keys): string
function getConfig(key?:Keys): string | IConfig {
  if (key) return config[key];
  return config
}

export default getConfig;
