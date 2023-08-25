import React, { useState } from "react";
import classNames from "classnames";
import fetchBiliVideo, { fetchSubtitle, fetchSubtitleUrls } from "../utils/fetchBiliVideo";

interface IProps {
  ask: (question: string) => void
}

const MyTextures:React.FC<IProps> = ({ask})=> {
  const [question, setQuestion] = useState('');

  return <div className={ classNames("col-span-full", "mx-auto", "w-full", "max-w-md") }>
    <label htmlFor="ask" className="block text-sm font-medium leading-6 text-gray-900">Ask</label>
    <div className="mt-2">
      <textarea id="ask" name="ask" rows={ 3 }
                placeholder={ "Ask something" }
                className="px-4 block w-full rounded-md
                border-0 py-3 text-gray-900 shadow-sm ring-1
                ring-inset ring-gray-300 placeholder:text-gray-400
                focus:ring-2 focus:ring-inset focus:ring-indigo-600
                sm:text-sm sm:leading-6"
                value={ question }
                onChange={ e => setQuestion(e.target.value) }
      >
      </textarea>
    </div>
    <div className={ "h-1 border-t my-4" }></div>

    <button className={ classNames("button") }
            onClick={ () => {
              fetchBiliVideo('BV1fX4y1Q7Ux')
            } }
    >load video
    </button>
    <button className={"button"}
    onClick={()=> {
      fetchSubtitleUrls('BV1fX4y1Q7Ux', '1029248276');
    }}>
      subtitle
    </button>
    <button className={"button"}
    onClick={()=> {
      fetchSubtitle("");
    }}>
      subtitle2
    </button>
    <button className={ classNames("button") }
            onClick={ () => {
              ask(question);
              setQuestion('');
            } }
    >Send
    </button>
  </div>;
};

export default MyTextures;
