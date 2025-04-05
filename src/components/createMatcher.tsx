import React, { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { StateObject } from "@/types";
import { CirclePicker } from "react-color";
import { Circle, CircleDashed } from "lucide-react";

const selectorOptions = [
  { value: 1, name: "የሚጠብቅ" },
  { value: 2, name: "የሚጠቀለል" },
  { value: 3, name: "የሚያያዝ" },
  { value: 4, name: "የሚነሳ | የሚሰየፍ" },
  { value: 5, name: "የሚቆጠር | የሚላላ" },
  { value: 0, name: "Clear" },
];

const symbolLabels: { [key: number]: string | null | JSX.Element } = {
  0: null,
  1: "ጠ",
  2: "_",
  3: "-",
  4: ",",
  5: ".",
};

const colors = ["#DB3E00", "#fccf35", "#22c55e", "#000"];

interface CreateMatcherI {
  text: string;
  state: StateObject;
  setState: React.Dispatch<React.SetStateAction<StateObject>>;
}

const CreateMatcher = ({ text, state, setState }: CreateMatcherI) => {
  let lines = text.split("\n");

  return (
    <div className="max-h-[80vh] overflow-auto pt-3 rounded-md border border-input w-full p-2 h-20">
      {lines.map((line, lIdx) => {
        const words = line.split(" ");

        return (
          <div key={lIdx} className="flex flex-wrap items-end mb-0 gap-4 h-fit">
            {words.map((word, wIdx) => {
              const chars = word.split("");

              return (
                <div key={wIdx} className="flex gap-1 items-end">
                  {chars.map((char, cIdx) => {
                    return (
                      <MatcherItem
                        key={cIdx}
                        char={char}
                        state={state!}
                        idx={`${lIdx}:${wIdx}:${cIdx}:${char}`}
                        setState={setState!}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default CreateMatcher;

function MatcherItem({
  idx: cIdx,
  char,
  state,
  setState,
}: {
  idx: string;
  char: string;
  state: StateObject;
  setState: React.Dispatch<React.SetStateAction<StateObject>>;
}) {
  const matchedState = state[cIdx] || { symbols: [], color: null };
  const [color, setColor] = useState(matchedState.color || "");
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Popover onOpenChange={setIsSelected}>
      <div className="relative">
        <div className="flex gap-[1px]">
          {matchedState.symbols.map((s, i) => {
            if (s === 3) return null;
            // if (s === 2) return <div key={i} className="h-[1px] w-1/2 mx-auto bg-primary mb-[0px]" />;
            return (
              <p
                key={i}
                className="text-primary mb-[2px] w-full text-center text-xs"
              >
                {symbolLabels[s]}
              </p>
            );
          })}
        </div>

        <PopoverTrigger>
          <p
            className={`px-1 rounded-lg cursor-pointer hover:bg-primary transition-all ${
              isSelected && "bg-primary"
            } font-semibold`}
            style={{ color: matchedState.color || "" }}
          >
            {char}
          </p>
        </PopoverTrigger>

        <>
          {matchedState.symbols.map((s, i) => {
            if (s === 3)
              return (
                <p
                  key={i}
                  className="px-1 h-[10px] text-primary absolute right-[-17px] bottom-3.5"
                >
                  {symbolLabels[s]}
                </p>
              );
            return null;
          })}
        </>
      </div>

      <PopoverContent className="pointer-events-auto">
        <div>
          <div className="flex items-center justify-between">
            <p className="p-2">
              ፊደል{" "}
              <span className="px-2 py-1 bg-primary rounded-md">{char}</span>
            </p>

            <div className="p-2 flex gap-1 items-center">
              <span>ቀለም</span>

              <CirclePicker
                width="100px"
                color={color}
                colors={colors}
                circleSize={20}
                circleSpacing={5}
                onChange={(color) => {
                  setColor(color.hex);
                  setState({
                    ...state,
                    [cIdx]: {
                      symbols: matchedState.symbols,
                      color: color.hex === "#000000" ? null : color.hex,
                    },
                  });
                }}
              />
            </div>
          </div>

          <div className="p-2">
            {selectorOptions.map((option, idx) => (
              <StateItem
                key={idx}
                option={option}
                idx={cIdx}
                state={state}
                setState={setState}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function StateItem({
  idx,
  state,
  option,
  setState,
}: {
  idx: string;
  option: { name: string; value: number };
  state: StateObject;
  setState: React.Dispatch<React.SetStateAction<StateObject>>;
}) {
  const matchedState = state[idx] || { symbols: [], color: null };

  return (
    <div
      className={`flex gap-2 items-center ${
        matchedState.symbols.includes(option.value)
          ? "bg-primary"
          : "bg-background/50"
      } py-1 px-2 mb-2 rounded-lg hover:bg-primary ${
        option.value === 0 && "hover:bg-red-500"
      } transition-all cursor-pointer`}
      onClick={() => {
        if (option.value === 0) {
          setState({ ...state, [idx]: { symbols: [], color: null } });
          return;
        }
        setState({
          ...state,
          [idx]: {
            symbols: matchedState.symbols.includes(option.value)
              ? matchedState.symbols.filter((s) => s !== option.value)
              : [...matchedState.symbols, option.value],
            color: matchedState.color,
          },
        });
      }}
    >
      {matchedState.symbols.includes(option.value) ? (
        <Circle size={16} />
      ) : (
        <CircleDashed size={16} />
      )}
      <div className="w-full m-0 p-0 flex items-center justify-between">
        <div>{symbolLabels[option.value || 0]}</div> {option.name}
      </div>
    </div>
  );
}
