// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { audioContext, loadSound, playSound } from "../utils/sound-settings";

// const countDowntime = (x: number) => x * 60 * 1000;

// const timeMap = new Map();

// timeMap.set("15", countDowntime(15));
// timeMap.set("30", countDowntime(30));
// timeMap.set("45", countDowntime(45));
// timeMap.set("1", countDowntime(60));
// timeMap.set("2", countDowntime(120));

// const arr = [1, 3, 4, 5, 7, 8, 9, 0];

// const CountDown = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [time, setTime] = useState<number>(60000);
//   const [isDone, setIsDone] = useState<boolean>(false);

//   const [minutes, setMinutes] = useState(Math.floor(time / 1000 / 60) % 60);
//   const [seconds, setSeconds] = useState(Math.floor(time / 1000) % 60);

//   const handleStopUserFromExiting = (
//     event: BeforeUnloadEvent
//   ): string | undefined => {
//     if (time > 0) {
//       const message =
//         "You have unsaved changes. Are you sure you want to leave?";
//       event.returnValue = message;
//       return message;
//     }
//     return undefined;
//   };

//   useEffect(() => {
//     // if (time <= 0) {

//     //     loadSound("../../public/sound/alarm.mp3").then((audioBuffer) => {
//     //       playSound(audioBuffer);
//     //     });
//     //     setIsDone(true);
//     //     if (Notification.permission === "granted") {

//     //       new Notification("Timer Complete!", {
//     //         body: "The countdown timer has ended. Time to take action!",
//     //       });
//     //     }
//     //   }
//     setMinutes(Math.floor(time / 1000 / 60) % 60);
//     setSeconds(Math.floor(time / 1000) % 60);
//   }, [time]);

//   useEffect(() => {
//     document.getElementById("audio")?.addEventListener("click", () => {
//         // Resume AudioContext if suspended
//         if (audioContext.state === "suspended") {
//           audioContext.resume().then(() => {
//             console.log("AudioContext resumed");
//             // Load and play the sound
//             loadSound("/sound/alarm.mp3").then(playSound);
//           });
//         } else {
//           // AudioContext is already running; directly load and play sound
//           loadSound("/sound/alarm.mp3").then(playSound);
//         }
//       });

//     const countdownInterval = setInterval(() => {
//       // Use functional update to ensure the latest state is used
//       setTime((prevTime) => {
//         if (prevTime <= 0) {
//           clearInterval(countdownInterval);

//           // Play the sound
//           document.getElementById("audio")?.click();
       

//           setIsDone(true);

//           // Show notification if permissions are granted
//           if (Notification.permission === "granted") {
//             new Notification("Timer Complete!", {
//               body: "The countdown timer has ended. Time to take action!",
//             });
//           }

//           return 0; // Ensure the timer doesn't go below 0
//         }

//         return prevTime - 1000; // Decrement the time
//       });
//     }, 1000);

//     return () => clearInterval(countdownInterval); // Cleanup on unmount
//   }, []);

//   //   useEffect(() => {
//   //     const countdownInterval = setInterval(() => {
//   //       if (time <= 0) {
//   //         clearInterval(countdownInterval);
//   //         loadSound("../../public/sound/alarm.mp3").then((audioBuffer) => {
//   //             alert(23)
//   //           playSound(audioBuffer);
//   //         });
//   //         setIsDone(true);
//   //         if (Notification.permission === "granted") {
//   //             alert(24)
//   //           new Notification("Timer Complete!", {
//   //             body: "The countdown timer has ended. Time to take action!",
//   //           });
//   //         }
//   //         return;
//   //       }

//   //       setTime((prev) => prev - 1000);
//   //     }, 1000);

//   //     return () => clearInterval(countdownInterval);
//   //   }, []);

//   //   useEffect(() => {
//   //     if (timeMap.has(location.state)) {
//   //       let result = timeMap.get(location.state);
//   //       setTime(result);
//   //     } else {
//   //       navigate(-1);
//   //     }
//   //   }, []);

//   useEffect(() => {
//     window.addEventListener("beforeunload", handleStopUserFromExiting);

//     return () => removeEventListener("beforeunload", handleStopUserFromExiting);
//   }, []);

//   return (
//     <section className="text-white font-mono flex items-center justify-center bg-black min-h-screen fixed top-0 left-0  w-full">
//       <div>
//         {isDone ? (
//           <h1 className="xl:text-[10rem] font-extrabold">Finished😎</h1>
//         ) : (
//           <h1 className="xl:text-[10rem] font-extrabold">{`${minutes}:${
//             seconds < 10 ? "0" : ""
//           }${seconds}`}</h1>
//         )}
//         <p className="text-sm font-normal ">
//           Once set you can't change / stop it
//         </p>
//         <button id="audio"></button>
//       </div>
//     </section>
//   );
// };

// export default CountDown;
