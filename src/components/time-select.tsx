import { Field, Label, Select } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import clsx from "clsx";
// import { useState } from "react";

type Props = {
  selected: string | undefined;
  setSelected: React.Dispatch<React.SetStateAction<string>> | undefined;
};

export default function TimeSelect({ selected, setSelected }: Props) {
  //   const [selected, setSelected] = useState("15");
  return (
    <div className="w-full max-w-md px-4 ">
      <Field>
        <Label className="text-sm/6 font-medium text-white/50">
          Simple Timer
        </Label>
        <div className="relative">
          <Select
            value={selected}
            onChange={(e) => {
              if (setSelected === undefined) {
                return;
              }
              setSelected(e.target.value);
            }}
            className={clsx(
              "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
              // Make the text of each option black on Windows
              "*:text-black"
            )}
          >
            <option value="15">15mins</option>
            <option value="30">30mins</option>
            <option value="45">45mins</option>
            <option value="1">1hr</option>
            <option value="2">2hr</option>
          </Select>
          <FaChevronDown
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
            aria-hidden="true"
          />
        </div>
      </Field>
    </div>
  );
}
