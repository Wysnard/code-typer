import { useRandomQuery } from "../generated/graphql";

export default function Home() {
  const [random_code, randomQuery] = useRandomQuery({
    variables: { language: "typescript" },
  });

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <h1>
        <p>Hello World</p>
      </h1>
      <button onClick={() => console.log(random_code)}>log</button>
    </div>
  );
}
