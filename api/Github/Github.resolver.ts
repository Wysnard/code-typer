import fp from "lodash/fp";
import { Resolver, Query, Arg } from "type-graphql";

import Github from "./Github.entity";
import GithubAPI from "./Github.api";

@Resolver(Github)
class GithubResolver {
  @Query(() => Github)
  async random(@Arg("language") language: string) {
    const api_response = await GithubAPI.search.repository({ language });

    const items = api_response.items.map(({ contents_url, ...element }) => ({
      contents_url: contents_url.replace("{+path}", ""),
      ...element,
    }));
    // console.log(items);

    const repository_random = fp.sample(items);

    if (!repository_random) throw Error("Could not find a repository");
    // console.log(repository_random);

    const repo_response = await GithubAPI.search.code({
      language,
      repository: repository_random?.full_name,
    });
    // console.log(repo_response);

    const code_random = fp.sample(repo_response.items);
    console.log(code_random);

    if (!code_random) throw Error("Could not find a code file");

    const dl_content = await code_random.download();

    return new Github({
      repository: repository_random.full_name,
      name: repository_random.name,
      content: dl_content,
    });
  }
}

export default GithubResolver;
