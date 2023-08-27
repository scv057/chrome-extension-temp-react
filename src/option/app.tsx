import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import classNames from "classnames";

export interface IConfig {
  'GPT_TOKEN': string,
  'mission_prompt': string
}


function isEmpty(obj: object): boolean{
  return !Object.keys(obj).length
}

export default function App() {
  const [isSaved, setIsSaved] = useState(true);

  function saveConfig(configs: IConfig) {
    chrome.storage.local.set({config: configs})
      .then(() => {
        console.log('saved');
      })
  };

  const [ config, setConfig ] = useState<IConfig>({GPT_TOKEN: "", mission_prompt: ""});

  useEffect(() => {
    chrome.storage.local.get('config').then(result => {
      setConfig(isEmpty(result) ? {mission_prompt: '', GPT_TOKEN: ''} : result.config as IConfig)
    })
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>)=>{
    const {name, value} = event.target;
    setConfig({...config, [name]: value});
    setIsSaved(false);
  }

  return <div className={ classNames("mx-auto", "w-full", "max-w-3xl", "m-6") }>
    <div className={ classNames("text-4xl") }>
      Option Page
    </div>
    <p>is saved: {isSaved ? "saved": "unsaved"}</p>
    <div className={ "mt-6" }>
      <label className={ classNames("text-2xl") }>customize prompt for summary</label>
      <div>
        <textarea
          className={ classNames("block", "w-full", "px-1.5", "py-1.5", "mt-2", "rounded-md", "ring-1", "ring-inset", "border-gray-400", 'border-solid') }
          name={"mission_prompt"}
          rows={ 5 }
          onChange={handleInputChange}
          value={ config.mission_prompt }>
        </textarea>
      </div>

      <div className={ "mt-6" }>
        <label className={ classNames("text-2xl") }>customize you own key</label>
        <input className={ classNames("block", "mt-2", "ring-1", "rounded-md") }
               name={"GPT_TOKEN"}
               onChange={handleInputChange}
               value={ config.GPT_TOKEN }
               type="password"/>
      </div>

      <button onClick={ () => {
        saveConfig(config);
        setIsSaved(true);
      } } className={ classNames("button") }>save
      </button>
    </div>
  </div>;
};