import axios from "axios";
import { plainToClass } from "class-transformer";

interface PSearch {
  language: string;
  repository: string;
}

interface IGithubSearchResponse<T extends IGithubSearchResponseItem> {
  total_count: number;
  items: T[];
}

interface IGithubSearchResponseItem {
  name: string;
  full_name: string;
  url: string;
  contents_url: string;
  language: string;
}

interface IGithubContentReponse {
  name: string;
  path: string;
  url: string;
  download_url: string;
}

export class CodeSearchResponse implements IGithubSearchResponseItem {
  name!: string;
  full_name!: string;
  url!: string;
  contents_url!: string;
  language!: string;

  async gotoURL() {
    const response = await axios.get<IGithubContentReponse>(this.url);

    return response.data;
  }

  async download() {
    const response = await this.gotoURL();
    const content = await axios.get<string>(response.download_url);

    return content.data;
  }
}

class Search {
  static async repository({ language }: Partial<PSearch>) {
    let url = "https://api.github.com/search/repositories?q=";

    let searchq = [];

    if (language) searchq.push(`language:${language}`);

    const result = await axios.get<
      IGithubSearchResponse<IGithubSearchResponseItem>
    >(url + searchq.join("+"));

    return result.data;
  }

  static async code({
    language,
    repository,
  }: Partial<PSearch>): Promise<IGithubSearchResponse<CodeSearchResponse>> {
    let url = "https://api.github.com/search/code?q=";

    let searchq = [];

    if (language) searchq.push(`language:${language}`);
    if (repository) searchq.push(`repo:${repository}`);

    const result = await axios.get<
      IGithubSearchResponse<IGithubSearchResponseItem>
    >(url + searchq.join("+"));

    return {
      ...result.data,
      items: result.data.items.map((element) =>
        plainToClass(CodeSearchResponse, element)
      ),
    };
  }
}

export default class GithubAPI {
  static search = Search;
}
