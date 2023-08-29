import React, { useState } from "react";
import classNames from "classnames";
import MyDisclosure from "../components/myDisclosure";
import MyTextures from "../components/myTextures";
import {CloudIcon, Cog6ToothIcon, ArrowUpCircleIcon} from "@heroicons/react/20/solid";
import fetchSummary from "../utils/fetchSummary";
import fetchAnswer from "../utils/fetchAnswer";
import saveToNotion from "../utils/fetchNotion";
import { markdownToBlocks } from "@tryfabric/martian";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface IChat {
  answer: string;
  question: string;
}

function normalize(dialogs: IChat[]){
  let c = dialogs.reduce((pre, d)=>{
    return `${pre} \n\n ## ${d.question} \n\n ${d.answer}`
  }, "")
  console.log(c);
  return markdownToBlocks(c);
}


const App = () => {
  const [ dialogs, setDialogs ] = useState([]);

  async function summarize() {
    setDialogs([ ...dialogs, {question: "Summary", answer: "Waiting for response"} ])
    const summary = await fetchSummary();
    setDialogs([ ...dialogs, summary ])
  }

  async function ask(question: string) {
    if (question === "") return;
    setDialogs([ ...dialogs, {question, answer: "Waiting for response"} ])
    const {status, response} = await fetchAnswer(question);
    setDialogs([ ...dialogs, {
      question,
      answer: status==='success'? response?.reply: "Error"
    } ])
  }

  async function save(){
    const {status, response} = await saveToNotion(`summary of ${"Video"}` ,normalize(dialogs));
    if (status === 'success'){
      console.log("文章保存成功");
    }
  }

  function openOptionsPage(){
    chrome.runtime.sendMessage({type: 'openOptionPage'});
  }

  return <div
    className={ classNames("my-1","mx-auto", "w-full", "max-w-md", "p-4",
      // "z-10", "fixed", "right-4", "top-1/4",
      "pointer-all",
      "bg-green-400") }>
    <ToastContainer position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"/>
    <div
      className={ classNames("px-4", "w-full", "h-full", "bg-cyan-200", "bg-gradient-to-bl", "rounded-2xl", "mx-auto", "w-full", "max-w-md") }>
      <div className={ classNames("flex", "flex-row", "items-center", "self-start") }>
        <CloudIcon className={ classNames(
          "h-10", "w-10", "text-pink-800", "mr-5"
        ) }/>
        <div className={ classNames("flex", "justify-evenly") }>
          <button className={ "mr-5" } onClick={ summarize }>SUMMARY</button>
          <button className={ "mr-5" } onClick={ save }>
            <ArrowUpCircleIcon className={classNames("h-8", "w-8", "text-gray-900")} />
          </button>
          <button className={ "mr-5" } onClick={ openOptionsPage }>
            <Cog6ToothIcon className={classNames("h-8", "w-8", "text-gray-900")}/>
          </button>
        </div>
      </div>

    </div>
    <div className={ classNames( 'block') }>
      <MyDisclosure dialogs={ dialogs }/>
      <MyTextures ask={ ask }/>
    </div>
  </div>;
};

export default App;