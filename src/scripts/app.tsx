import React, { useState } from "react";
import classNames from "classnames";
import MyDisclosure from "../components/myDisclosure";
import MyTextures from "../components/myTextures";
import {CloudIcon} from "@heroicons/react/20/solid";

const App = () => {
  const [ dialogVisible, setDialogVisible ] = useState(true);

  function summary(){
    const prompt = `
    Your output should use the following template:
      #### Summary
      #### Highlights
      - [Emoji] Bulletpoint
      
      Your task is to summarise the text I have given you in up to seven concise bullet points, starting with a short highlight. Choose an appropriate emoji for each bullet point. Use the text above: {{Title}} {{Transcript}}.
    `
  }

  const [dialogs, useDialogs] = useState( [ {
    question: "What is your refund policy?",
    answer: "If you're unhappy with your purchase for any reason, email us\n" +
      "                within 90 days and we'll refund you in full, no questions asked."
  }, {
    question: "Do you offer technical support?",
    answer: "No"
  } ]);

  function doSomething(question:string) {
    console.log(question);
    const qa = {
      question,
      answer: "Waiting for response"
    }
    useDialogs([...dialogs, qa])
  }


  return <div className={classNames("mx-auto", "w-full", "max-w-md", "p-4", "z-10", "fixed", "right-4", "top-1/4", "bg-green-400")}>
    <div
      className={ classNames("px-4", "w-full", "h-full", "bg-cyan-200", "bg-gradient-to-bl", "rounded-2xl", "mx-auto", "w-full", "max-w-md") }>
      <div className={ classNames("flex", "flex-row", "items-center", "self-start") }>
        <CloudIcon className={classNames(
          "h-10", "w-10", "text-pink-800", "mr-5"
        )}/>
        <div className={classNames("flex", "justify-evenly")}>
          <button className={"mr-5"} onClick={summary}>SUMMARY</button>
          <button className={"mr-5"} onClick={ () => setDialogVisible(!dialogVisible) }>OPEN</button>
        </div>
      </div>

    </div>
    <div className={ classNames(dialogVisible ? 'block' : 'hidden') }>
      <MyDisclosure  dialogs={dialogs}/>
      <MyTextures doSomething={doSomething}/>
    </div>
  </div>;
};

export default App;
