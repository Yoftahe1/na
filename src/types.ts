export type LooseObject = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export interface StateObject {
  [key: string]: {
    symbols: number[];
    color: string | null;
  };
}

export interface LessonBody {
  content: string;
  state: StateObject;
  timeState: LooseObject;
}

export enum LessonType {
  FIND_WORD = "FIND_WORD",
}

export interface TimeState {
  [key: number]: number;
}
