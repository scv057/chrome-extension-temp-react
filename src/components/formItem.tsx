// import React from "react";
// import classNames from "classnames";
// import {IConfig} from "../option/app";
//
// interface IProp {
//   title: string;
//   name: "GPT_TOKEN" | "mission_prompt"| 'NOTION_API_KEY'| 'NOTION_PAGE';
//   handleInputChange: (event)=>void;
//   config: IConfig;
// }
//
// const FormItem: React.FC<IProp> = ({title, name, handleInputChange, config}) => {
//
//   return <div className={ "mt-6" }>
//     <label className={ classNames("text-2xl") }>{ title }</label>
//     <input className={ classNames("block", "mt-2", "ring-1", "rounded-md") }
//            name={ name }
//            onChange={ handleInputChange }
//            value={ config[name] }
//            type="password"/>
//   </div>
// };
//
// export default FormItem;