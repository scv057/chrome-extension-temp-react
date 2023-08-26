type Config = {
  defaultPrompt: string
};

type Keys = keyof Config;

const config: Config = {
  defaultPrompt: `    
    Your output should use the following template:
      #### Summary
      #### Highlights
      - [Emoji] Bulletpoint
      
      Your task is to summarise the text I have given you in up to seven concise bullet points, starting with a short highlight. Choose an appropriate emoji for each bullet point. Use the text above: {{Title}} {{Transcript}}.
      print it in Chinese.
    `
};


export default function getConfig(key:Keys){
  return config[key]
};
