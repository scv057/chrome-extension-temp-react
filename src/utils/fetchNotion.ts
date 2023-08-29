import axios from "axios";
import {getConfigFromStorage} from "../option/app";

type IType =
  "bookmark" |
  "breadcrumb" |
  "bulleted_list_item" |
  "callout" |
  "child_database" |
  "child_page" |
  "column" |
  "column_list" |
  "divider" |
  "embed" |
  "equation" |
  "file" |
  "heading_1" |
  "heading_2" |
  "heading_3" |
  "image" |
  "link_preview" |
  "link_to_page" |
  "numbered_list_item" |
  "paragraph" |
  "pdf" |
  "quote" |
  "synced_block" |
  "table" |
  "table_of_contents" |
  "table_row" |
  "template" |
  "to_do" |
  "toggle" |
  "unsupported" |
  "video";

interface IBlock {
  object: string;
  id: string;
  parent?: object;
  type?: IType;
  created_time?: string;
  created_by?: string;
  last_edited_time?: string;
  archived?: boolean;
  has_children?: boolean;
}

interface IQueryBody {
}

export default async function saveToNotion(title: string, content: object[]){
  const {NOTION_API_KEY, NOTION_PAGE} = await getConfigFromStorage();

  const data = {
    "parent": { "page_id": `${NOTION_PAGE}` },
    "icon": {
      "emoji": "🥬"
    },
    "cover": {
      "external": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/6/62/Tuscankale.jpg"
      }
    },
    "properties": {
      "title": [
        {
          "text": {
            "content": `${title}`
          }
        }
      ]
    },
    children: content,
  }

  try {
    const response = await axios.post('https://hello-world-curly-wind-3b39.xie5997231.workers.dev/?proxyUrl=/v1/pages', data, {
      headers: {
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
        "Authorization": `Bearer ${NOTION_API_KEY}`,
      }
    });
    return {
      status: 'success',
      response
    }
  } catch (e){
    return {
      status: 'error',
      response: e
    }
  }
}