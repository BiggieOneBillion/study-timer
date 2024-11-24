import { RiErrorWarningLine } from "react-icons/ri";
import CountDown from "../components/count-down";
import TabStyleView from "../components/tab-style-view";
import { useGlobalContext } from "../context/global-context";
import StudyCountDown from "../components/count-down-study-timer";

const HomePage = () => {
  const context = useGlobalContext();
  const requestNotificationPermission = () => {
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Notifications enabled!", {
            body: "Thank you for enabling notifications.",
          });
        } else {
          alert("Notifications were not enabled.");
        }
      });
    } else {
      alert(
        "Notification permission already set to: " + Notification.permission
      );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black p-3 pt-10 md:pt-0 md:p-0">
      <section className="flex flex-col items-center md:items-start gap-5">
        <h1 className="text-2xl xl:text-5xl text-white font-bold font-mono mb-10">
          Welcome to PodoTimer
        </h1>
        <p className="text-white/90 font-medium text-sm font-mono max-w-xl text-left">
          The average human concentration has reduced over the past century, so
          to combact this , we have created a simple timer to help you stay
          focused.
        </p>
        <div className="text-white/70 font-medium font-mono text-xs max-w-lg text-left md:text-justify flex items-start gap-2 border border-white/20 rounded-sm p-3">
          <span className="">
            <RiErrorWarningLine size={19} />
          </span>

          <p className="space-y-5 md:space-y-2">
            <span>
              To start select a time duration and leave the rest to us. For the
              app to work properly, please grant us permission to your
              notification so that we can notify you when the time is up.
            </span>
            <button
              onClick={requestNotificationPermission}
              className="py-1 px-2 border"
            >
              Allow Notification
            </button>
          </p>
        </div>
        <TabStyleView />
        {/* start timer button */}
      </section>
      {context?.showTimer && <CountDown />}
      {context?.showStudyTimer && <StudyCountDown />}
    </main>
  );
};

export default HomePage;
