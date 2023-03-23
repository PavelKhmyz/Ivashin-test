interface TestProps {
  text: string | null;
}

export const Test = ({ text }: TestProps) => {
  if (!text) {
    return <p>{text}</p>;
  }
  const regex = /(?<= )#\w+/g;
  const match = text.match(regex) || [];
  const strs = text.split(regex).filter((n) => n !== undefined);

  return (
    <>
      {strs.shift()}
      {strs.map((n, i) => (
        <>
          <a href={match[i]}>{match[i]}</a>
          {n}
        </>
      ))}
    </>
  );
};
