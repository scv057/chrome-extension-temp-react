import tokens from "../tokens";
import axios from "axios";
import {ResponseBody} from "./fetchBiliVideo";
import getConfig from "./getConfig";

const {GPT_TOKEN} = tokens;

const gptAPI = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${ GPT_TOKEN }`,
  },
});

let prompt = getConfig('defaultPrompt');

interface Chat {
  role: 'system' | 'user' | 'assistant'
  content: string
}

const messages: Array<Chat> = [];

export default async function fetchAnswer(question: string): Promise<ResponseBody<{reply: string}>> {

  messages.push({role: 'user', content: question})

  try {
    const res = await gptAPI.post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [ {role: 'system', content: prompt},...messages ]
    })

    const {data: responseData} = res;
    const assistantReply = responseData?.choices[0]?.message?.content;
    assistantReply && messages.push({role: 'assistant', content: assistantReply});
    return {
      status: "success",
      response: {reply: assistantReply}
    }
  } catch (e) {
    return {
      status: 'error',
      response: e
    }
  }
};