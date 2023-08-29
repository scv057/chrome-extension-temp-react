import React, { useEffect, useState } from "react";
import classNames from "classnames";
import {DocumentDuplicateIcon} from "@heroicons/react/20/solid"
import { ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

// import FormItem from "../components/formItem";

export interface IConfig {
  GPT_TOKEN: string,
  mission_prompt: string,
  NOTION_API_KEY: string,
  NOTION_PAGE: string,
  prompt_english_learning: string,
}

export async function getConfigFromStorage(): Promise<IConfig>{
  const res = await chrome?.storage?.local?.get('config');
  if (res.config) {
    return res.config
  } else {
    throw Error
  }
}

function isEmpty(obj: object): boolean{
  return !Object.keys(obj).length
}

export default function App() {
  const [isSaved, setIsSaved] = useState(true);

  function saveConfig(configs: IConfig) {
    chrome?.storage?.local?.set({config: {...config, ...configs}})
      .then(() => {
        setIsSaved(true);
        toast.success('🦄 Wow so easy!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }).catch(()=>{
      toast.error('save failed!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  }

  const [ config, setConfig ] = useState<IConfig>({NOTION_PAGE: "", NOTION_API_KEY: "", GPT_TOKEN: "", mission_prompt: "", prompt_english_learning:""});

  useEffect(() => {
    getConfigFromStorage()
      .then(result => {
      setConfig(result)
    }).catch(()=>{
    })
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>)=>{
    const {name, value} = event.target;
    setConfig({...config, [name]: value});
    setIsSaved(false);
  }

  return <div className={ classNames("mx-auto", "w-full", "max-w-3xl", "m-6") }>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    {/* Same as */}
    <ToastContainer />
    <div className={ classNames("text-4xl") }>
      Option Page
    </div>
    <p className={"mt-2"}>is saved: { isSaved ? "saved" : "unsaved" }</p>

    <div className={ "mt-6" }>
      <label className={ classNames("text-2xl") }>customize prompt for summary</label>
      <div className={"color-gray-400 text-md" }>在这里填写你的prompt</div>
      <div>
        <textarea
          className={ classNames("block", "w-full", "px-1.5", "py-1.5", "mt-2", "rounded-md", "ring-1", "ring-inset", "border-gray-400", 'border-solid') }
          name={ "mission_prompt" }
          rows={ 5 }
          onChange={ handleInputChange }
          value={ config.mission_prompt }>

        </textarea>
      </div>

      <div className="mt-6">
        <div className={"color-gray-400 text-md" }>prompt example</div>
        <div>
          {config.prompt_english_learning}
        </div>
        <button onClick={()=>{
          navigator.clipboard.writeText(config.prompt_english_learning)
        } }>
          <DocumentDuplicateIcon
            className={classNames(
              "accent-gray-600",
              "w-6","h-6",
              "text-gray-400", "hover:text-gray-600",
              "ml-1", "inline-block"
            )}/>
        </button>

      </div>

      <div className={ "mt-6" }>
        <label className={ classNames("text-2xl") }>OPENAI API KEY</label>
        <div className={"color-gray-400 text-md" }>在这里填写你的OPENAI API key</div>
        <input className={ classNames("inline-block", "mt-2", "ring-1", "rounded-md") }
               name={ "GPT_TOKEN" }
               onChange={ handleInputChange }
               value={ config.GPT_TOKEN }
               type="password"/>
        <button onClick={()=>{
          navigator.clipboard.writeText(config.GPT_TOKEN)
        } }>
          <DocumentDuplicateIcon
            className={classNames(
              "accent-gray-600",
              "w-6","h-6",
              "text-gray-400", "hover:text-gray-600",
              "ml-1", "inline-block"
            )}/>
        </button>
      </div>

      <div className={ "mt-6" }>
        <label className={ classNames("text-2xl") }>Notion API key</label>
        <div className={"color-gray-400 text-md" }>在这里填写你的Notion API key</div>
        <input className={ classNames("inline-block", "mt-2", "ring-1", "rounded-md") }
               name={ "NOTION_API_KEY" }
               onChange={ handleInputChange }
               value={ config.NOTION_API_KEY }
               type="password"/>
        <button onClick={()=>{
          navigator.clipboard.writeText(config.NOTION_API_KEY)
        } }>
          <DocumentDuplicateIcon
            className={classNames(
              "accent-gray-600",
              "w-6","h-6",
              "text-gray-400", "hover:text-gray-600",
              "ml-1", "inline-block"
            )}/>
        </button>
      </div>

      <div className={ "mt-6" }>
        <label className={ classNames("text-2xl") }>Notion PAGE</label>
        <div className={"color-gray-400 text-md" }>在这里填写你的Notion page_id</div>
        <input className={ classNames("inline-block", "mt-2", "ring-1", "rounded-md") }
               name={ "NOTION_PAGE" }
               onChange={ handleInputChange }
               value={ config.NOTION_PAGE }
               type="password"/>
        <button onClick={()=>{
        navigator.clipboard.writeText(config.NOTION_PAGE)
        } }>
          <DocumentDuplicateIcon
            className={classNames(
              "accent-gray-600",
              "w-6","h-6",
              "text-gray-400", "hover:text-gray-600",
              "ml-1", "inline-block"
            )}/>
        </button>
      </div>

      <button onClick={ () => {
        saveConfig(config);
      } }
              className={ classNames("button", "mt-6") }>save
      </button>
    </div>
  </div>;
};