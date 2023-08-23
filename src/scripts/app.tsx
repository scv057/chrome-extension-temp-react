import React, { useState } from "react";
import classNames from "classnames";
import MyDisclosure from "../components/myDisclosure";
import MyTextures from "../components/myTextures";
import {CloudIcon} from "@heroicons/react/20/solid";

const App = () => {
  const [ dialogVisible, setDialogVisible ] = useState(true);

  return <div className={classNames("mx-auto", "w-full", "max-w-md", "px-4")}>
    <div
      className={ classNames("px-4", "mt-4", "w-full", "h-full", "bg-cyan-200", "bg-gradient-to-bl", "rounded-2xl", "mx-auto", "w-full", "max-w-md") }>
      <div className={ classNames("flex", "flex-row", "items-center", "self-start") }>
        <CloudIcon className={classNames(
          "h-10", "w-10", "text-pink-800", "mr-5"
        )}/>
        <div onClick={ () => setDialogVisible(!dialogVisible) }>SUMMARY</div>
      </div>

    </div>
    <div className={ classNames(dialogVisible ? 'block' : 'hidden') }>
      <MyDisclosure/>
      <MyTextures/>
    </div>
  </div>;
};

export default App;
