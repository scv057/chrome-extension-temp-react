import React, { useMemo, useState } from "react";
import classNames from "classnames";
import MyDisclosure from "../components/myDisclosure";
import MyTextures from "../components/myTextures";
import {CloudIcon} from "@heroicons/react/20/solid";
import getVideo from "../utils/getVideoId";
import fetchSummary from "../utils/fetchSummary";
import fetchAnswer from "../utils/fetchAnswer";


const App = () => {
  const [ dialogVisible, setDialogVisible ] = useState(true);

  const videoID = useMemo(() => {
    return getVideo(document.URL)
  }, [ document.URL ]);

  const [ dialogs, setDialogs ] = useState([]);

  async function summarize() {
    setDialogs([ ...dialogs, {question: "Summary", answer: "Waiting for response"} ])
    const summary = await fetchSummary();
    setDialogs([ ...dialogs, summary ])
  }

  async function ask(question: string) {
    if (question === "") return;
    setDialogs([ ...dialogs, {question, answer: "Waiting for response"} ])
    const answer = await fetchAnswer(question);
    setDialogs([ ...dialogs, {
      question,
      answer
    } ])
  }

  return <div
    className={ classNames("mx-auto", "w-full", "max-w-md", "p-4", "z-10", "fixed", "right-4", "top-1/4", "bg-green-400") }>
    <div
      className={ classNames("px-4", "w-full", "h-full", "bg-cyan-200", "bg-gradient-to-bl", "rounded-2xl", "mx-auto", "w-full", "max-w-md") }>
      <div className={ classNames("flex", "flex-row", "items-center", "self-start") }>
        <CloudIcon className={ classNames(
          "h-10", "w-10", "text-pink-800", "mr-5"
        ) }/>
        <div className={ classNames("flex", "justify-evenly") }>
          <button className={ "mr-5" } onClick={ summarize }>SUMMARY</button>
          <button className={ "mr-5" } onClick={ () => setDialogVisible(!dialogVisible) }>OPEN</button>
        </div>
      </div>

    </div>
    <div className={ classNames(dialogVisible ? 'block' : 'hidden') }>
      <MyDisclosure dialogs={ dialogs }/>
      <MyTextures ask={ ask }/>
    </div>
  </div>;
};

export default App;