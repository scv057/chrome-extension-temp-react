import tokens from './asset/secrete/tokens.js';

chrome.runtime.onInstalled.addListener((details)=>{
  if(details.reason !== "install" && details.reason !== "update") return;
  chrome.storage.local.set({config: {
      "mission_prompt":
          `Your output should use the following template:
      #### Summary
      #### Highlights
      - [Emoji] Bulletpoint
      
      Your task is to summarise the text I have given you in up to seven concise bullet points, starting with a short highlight. Choose an appropriate emoji for each bullet point. Use the text above: {{Title}} {{Transcript}}.
      print it in Chinese.
    `,
      "GPT_TOKEN": `${ tokens.GPT_TOKEN }`
    }})
})

chrome.action.onClicked.addListener((tab) => {
  // chrome.scripting.executeScript({
  //   target: {tabId: tab.id},
  //   files: ['content-script.js']
  // });
});