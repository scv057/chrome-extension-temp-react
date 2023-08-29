import tokens from './asset/secrete/tokens.js';

chrome.runtime.onInstalled.addListener((details)=>{
  if(details.reason !== "install" && details.reason !== "update") return;
  chrome.storage.local.set({config: {
      mission_prompt: tokens.prompt_summary,
      prompt_english_learning: tokens.prompt_english_learning,
      GPT_TOKEN: tokens.GPT_TOKEN,
      NOTION_API_KEY: tokens.NOTION_API_KEY,
      NOTION_PAGE: tokens.NOTION_PAGE
    }})
})

chrome.runtime.onMessage.addListener(function(message) {
  if (message.type === "openOptionPage"){
    chrome.runtime.openOptionsPage();
  }
});