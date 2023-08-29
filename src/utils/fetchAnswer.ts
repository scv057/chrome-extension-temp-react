import axios from "axios";
import {ResponseBody} from "./fetchBiliVideo";
import { getConfigFromStorage } from "../option/app";

interface Chat {
  role: 'system' | 'user' | 'assistant'
  content: string
}

const messages: Array<Chat> = [];

export default async function fetchAnswer(question: string): Promise<ResponseBody<{reply: string}>> {
  const {GPT_TOKEN, mission_prompt: prompt} = await getConfigFromStorage();

  messages.push({role: 'user', content: question})

  try {
    const res = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [ {role: 'system', content: prompt},...messages ]
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ GPT_TOKEN }`,
      }})

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