import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/global-context";
import WebFont from 'webfontloader';

const CountDown = () => {
  const context = useGlobalContext();

  const [time, setTime] = useState<number>(
    context?.timeMap.get(context?.selected)
  );
  const [isDone, setIsDone] = useState<boolean>(false);

  const [minutes, setMinutes] = useState(Math.floor(time / 1000 / 60) % 60);
  const [seconds, setSeconds] = useState(Math.floor(time / 1000) % 60);

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

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['IBM Plex Mono:400,700', 'sans-serif'],
      },
    });
  }, []);

  useEffect(() => {
    setMinutes(Math.floor(time / 1000 / 60) % 60);
    setSeconds(Math.floor(time / 1000) % 60);
  }, [time]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      // Use functional update to ensure the latest state is used
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(countdownInterval);

          setIsDone(true);

          // Show notification if permissions are granted
          if (Notification.permission === "granted") {
            new Notification("Timer Complete!", {
              body: "The countdown timer has ended. Time to take action!",
            });
          }

          return 0; // Ensure the timer doesn't go below 0
        }

        return prevTime - 1000; // Decrement the time
      });
    }, 1000);

    return () => clearInterval(countdownInterval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handleStopUserFromExiting);

    return () => removeEventListener("beforeunload", handleStopUserFromExiting);
  }, []);

  return (
    <section style={{ fontFamily: 'IBM Plex Mono, sans-serif' }} className="text-white font-mono flex items-center justify-center bg-black min-h-screen fixed top-0 left-0  w-screen">
      <div>
        {isDone ? (
          <h1 className="xl:text-[10rem] font-extrabold">Finished😎</h1>
        ) : (
          <h1  className="text-[5rem] text-center xl:text-left xl:text-[24rem] font-extrabold">{`${minutes}:${
            seconds < 10 ? "0" : ""
          }${seconds}`}</h1>
        )}
        <p className="text-sm font-normal ">
          Once set you can't change / stop it
        </p>
        <button id="audio"></button>
      </div>
    </section>
  );
};

export default CountDown;
