import React from "react";
import { IconFolderOpen } from "@tabler/icons-react";

const RecordDetailsHeader = ({ recordName }) => {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 ">
      <div className="flex flex-col rounded-xl border border-green-800  shadow-sm dark:border-neutral-800 dark:bg-[#13131a]">
        <div className="flex justify-between gap-x-3 p-4 md:p-5 bg-[#17171e]">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full  text-white dark:text-blue-200">
            <IconFolderOpen size={70} className="text-green-500" />
          </div>
        </div>
        <a
          className="inline-flex items-center justify-between rounded-b-xl border-t bg-[#17171e] border-green-800 px-4 py-3 text-sm text-gray-400 hover:bg-green-800 md:px-5 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800"
          href="#"
        >
          {recordName}
        </a>
      </div>
    </div>
  );
};

export default RecordDetailsHeader;