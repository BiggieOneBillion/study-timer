import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../context/global-context";
import WebFont from "webfontloader";

const StudyCountDown = () => {
  const context = useGlobalContext();
  const [time, setTime] = useState<number>(
    context?.studyTimeMap.get(context?.studyTime)?.duration
  );
  const [isBreakTime, setIsBreakTime] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(
    Math.floor(time / 1000 / 60) % 60
  );
  const [seconds, setSeconds] = useState<number>(Math.floor(time / 1000) % 60);

  console.log(context?.studyTimeMap.get(context?.studyTime)?.rest);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleStopUserFromExiting = (
    event: BeforeUnloadEvent
  ): string | undefined => {
    if (time > 0) {
      const message =
        "You have unsaved changes. Are you sure you want to leave?";
      event.returnValue = message;
      return message;
    }
    return undefined;
  };

  const clearExistingInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startBreakTime = () => {
    clearExistingInterval();
    const restDuration =
      context?.studyTimeMap.get(context?.studyTime)?.rest || 60000;
    setTime(restDuration);
    setIsBreakTime(true);
    context?.soundTimer(context?.studyTimeMap.get(context?.studyTime)?.rest);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1000) {
          clearExistingInterval();
          setIsBreakTime(false);
          setTime(
            context?.studyTimeMap.get(context?.studyTime)?.duration || 60000
          );
          startCountdown(); // Resume study countdown
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);
  };

  const startCountdown = () => {
    clearExistingInterval();
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1000) {
          clearExistingInterval();
          startBreakTime(); // Switch to break time
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);
  };

  useEffect(() => {
    setMinutes(Math.floor(time / 1000 / 60) % 60);
    setSeconds(Math.floor(time / 1000) % 60);
  }, [time]);

  useEffect(() => {
    startCountdown(); // we start the initial countdown

    window.addEventListener("beforeunload", handleStopUserFromExiting);
    return () => {
      clearExistingInterval(); // Clear intervals on unmount
      window.removeEventListener("beforeunload", handleStopUserFromExiting);
    };
  }, []);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["IBM Plex Mono:400,700", "sans-serif"],
      },
    });
  }, []);

  return (
    <section
      style={{ fontFamily: "IBM Plex Mono, sans-serif" }}
      className="text-white font-mono flex items-center justify-center bg-black min-h-screen fixed top-0 left-0 w-screen"
    >
      <div>
        <p className="text-sm font-normal">
          {isBreakTime ? "Break Time! Relax." : "Study Time! Focus."}
        </p>
        <h1 className="text-[5rem] text-center xl:text-left xl:text-[24rem] font-extrabold">{`${minutes}:${
          seconds < 10 ? "0" : ""
        }${seconds}`}</h1>

        <p className="text-sm font-normal">Once set you can't change/stop it</p>
      </div>
    </section>
  );
};

export default StudyCountDown;
