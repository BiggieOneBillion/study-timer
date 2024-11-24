import { createContext, ReactNode, useContext, useState } from "react";
import { loadSound, playSound } from "../utils/sound-settings";

type contextType = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  showTimer: boolean;
  setShowTimer: React.Dispatch<React.SetStateAction<boolean>>;
  handleStartCountDown: () => void;
  studyTime: string;
  setStudyTime: React.Dispatch<React.SetStateAction<string>>;
  showStudyTimer: boolean;
  setShowStudyTimer: React.Dispatch<React.SetStateAction<boolean>>;
  handleStartStudyCountDown: (value: number) => void;
  timeMap: Map<any, any>;
  countDowntime: (x: number) => number;
  studyTimeMap: Map<any, any>;
  soundTimer(value: number): void;
};

export const GlobalContext = createContext<contextType | null | undefined>(
  null
);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // for single time management
  const [selected, setSelected] = useState("15");
  const [showTimer, setShowTimer] = useState(false);

  // for study tome management
  const [studyTime, setStudyTime] = useState("30");
  const [showStudyTimer, setShowStudyTimer] = useState(false);

  // time-map for the single time management
  const countDowntime = (x: number) => x * 60 * 1000;

  const timeMap = new Map();

  timeMap.set("15", countDowntime(15));
  timeMap.set("30", countDowntime(30));
  timeMap.set("45", countDowntime(45));
  timeMap.set("1", countDowntime(60));
  timeMap.set("2", countDowntime(120));

  // time-map for study time management
  const studyTimeMap = new Map();

  studyTimeMap.set("30", {
    duration: countDowntime(30),
    rest: countDowntime(5),
    repeat: 2,
  });
  studyTimeMap.set("45", {
    duration: countDowntime(45),
    rest: countDowntime(6),
    repeat: 2,
  });
  studyTimeMap.set("1", {
    duration: countDowntime(1),
    rest: countDowntime(10),
    repeat: 2,
  });
  studyTimeMap.set("2", {
    duration: countDowntime(2),
    rest: countDowntime(15),
    repeat: 2,
  });

  // functions
  const handleStartCountDown = () => {
    setShowTimer(!showTimer);
    setTimeout(() => {
      loadSound("../../public/sound/alarm.mp3").then((audioBuffer) => {
        playSound(audioBuffer);
      });
    }, timeMap.get(selected));
  };

  function soundTimer(value: number) {
    setTimeout(() => {
      loadSound("../../public/sound/alarm.mp3").then((audioBuffer) => {
        playSound(audioBuffer);
      });
    }, value);
  }
  
  const handleStartStudyCountDown = (value: number) => {
    setShowStudyTimer(!showStudyTimer);
    soundTimer(value);
  };
  return (
    <GlobalContext.Provider
      value={{
        selected,
        setSelected,
        showTimer,
        setShowTimer,
        handleStartCountDown,
        studyTime,
        setStudyTime,
        showStudyTimer,
        setShowStudyTimer,
        handleStartStudyCountDown,
        countDowntime,
        timeMap,
        studyTimeMap,
        soundTimer
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
