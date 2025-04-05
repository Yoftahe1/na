// import logo from "../../assets/logo.png";

export default function TestQuestion({
  question,
  hiddenWord,
  lineIdx,
  wordIdx,
  changeCorrectChoice,
}: {
  question: string;
  lineIdx: number | null;
  wordIdx: number | null;
  hiddenWord: string | null;
  changeCorrectChoice: (
    choice: string,
    lineIdx: number,
    wordIdx: number
  ) => void;
}) {
  const lines: string[] = question.split("\\n");

  return (
    <div className="p-2 rounded-md border border-input shadow-md">
      <div className="abyssinica-sil-regular relative w-auto rounded-sm border border-primary">
        {/* <div
          className={`absolute -z-0 top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-20`}
        >
          <img src={logo} className="h-40" alt="" />
        </div> */}

        <div className={`z-500 p-5 rounded-sm `}>
          {lines.map((line, lIdx) => {
            const words = line.split(" ");

            return (
              <div
                key={lIdx}
                className="flex items-end mb-0 gap-2 overflow-hidden flex-wrap"
              >
                {words.map((word, wIdx) => {
                  const chars = word.split("");

                  if (
                    hiddenWord === word &&
                    lineIdx === lIdx &&
                    wordIdx === wIdx
                  ) {
                    return (
                      <div
                        key={wIdx}
                        className="px-1 rounded-sm bg-primary"
                      >{word}</div>
                    );
                  }

                  return (
                    <div
                      key={wIdx}
                      className={`font-semibold`}
                      onClick={() => changeCorrectChoice(word, lIdx, wIdx)}
                    >
                      {chars}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
