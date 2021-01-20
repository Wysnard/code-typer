import { ObjectType, Field } from "type-graphql";

@ObjectType()
class Github {
  @Field()
  repository: string;

  @Field()
  name: string;

  @Field()
  content: string;

  constructor({
    repository,
    name,
    content,
  }: {
    repository: string;
    name: string;
    content: string;
  }) {
    this.repository = repository;
    this.name = name;
    this.content = content;
  }
}

export default Github;
