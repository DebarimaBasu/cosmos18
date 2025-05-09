import React from "react";
import { IconChevronRight } from "@tabler/icons-react";

const MetricsCard = ({
  title,
  subtitle,
  value,
  icon: Icon,
  progress,
  onClick,
}) => (
  <div className="flex flex-col rounded-xl border bg-[#17171e] shadow-sm dark:border-neutral-800 dark:bg-[#13131a] border-green-600">
    <div className="flex justify-between gap-x-3 p-4 md:p-5">
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-300 dark:text-neutral-500 ">
          {title}
        </p>
        
      </div>
      <div className="flex size-[46px] h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-black text-white dark:bg-[#1c1c24] dark:text-blue-200 ">
        <Icon size={25} className="text-green-500" />
      </div>
    </div>
    <a
      className="inline-flex items-center justify-between rounded-b-xl border-x-0 border-green-600 px-4 py-3 text-sm text-gray-400 hover:bg-green-800 md:px-5 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800"
      href="#"
      onClick={onClick}
    >
      {subtitle}
      <IconChevronRight />
    </a>
  </div>
);

export default MetricsCard;