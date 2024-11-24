import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import TimeSelect from "./time-select";
import { useGlobalContext } from "../context/global-context";
import { TfiTimer } from "react-icons/tfi";
import StudyTimeSelect from "./study-time-select";

const categories = [
  {
    name: "Simple Timer",
  },
  {
    name: "Study Timer",
  },
];

export default function TabStyleView() {
  const context = useGlobalContext();
  return (
    <div className="flex h-fit w-full justify-centery py-10">
      <div className="w-full max-w-md">
        <TabGroup>
          <TabList className="flex gap-4">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-3 h-[300px]">
            {/* tab-panel for simple time select */}
            <TabPanel className="rounded-xl bg-white/5 p-3">
              <div className="flex flex-col gap-5">
                <TimeSelect
                  selected={context?.selected}
                  setSelected={context?.setSelected}
                />
                <button
                  onClick={context?.handleStartCountDown}
                  className="px-4 py-2 font-medium text-sm bg-black/10 text-white/80 border rounded-md flex items-center gap-1 w-fit ml-4"
                >
                  <span>
                    <TfiTimer />
                  </span>
                  <span>Start Timer</span>
                </button>
              </div>
            </TabPanel>
            {/* tab-panel for study-timer */}
            <TabPanel className="rounded-xl bg-white/5 p-3">
              <div className="flex flex-col gap-5">
                <p className="text-white/90 font-medium text-xs font-mono max-w-xl">
                  You can also set study timer to help you stay focused during
                  your study sessions.
                </p>
                <StudyTimeSelect
                  selected={context?.studyTime}
                  setSelected={context?.setStudyTime}
                />
                <button
                  onClick={() =>
                    context?.handleStartStudyCountDown(
                      context?.studyTimeMap.get(context?.studyTime)?.duration
                    )
                  }
                  className="px-4 py-2 font-medium text-sm bg-black/10 text-white/80 border rounded-md flex items-center gap-1 w-fit ml-4"
                >
                  <span>
                    <TfiTimer />
                  </span>
                  <span>Start Timer</span>
                </button>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
