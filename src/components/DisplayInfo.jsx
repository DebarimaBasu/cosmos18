import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import {
  IconAlertCircle,
  IconFidgetSpinner,
  IconZoomQuestionFilled,
  IconCircleDashedCheck,
  IconFolder,
  IconAlertHexagonFilled,
  IconStethoscope,
  IconHourglassHigh,
  IconUserScan,
} from "@tabler/icons-react";
// import { usePrivy } from "@privy-io/react-auth";
import MetricsCard from "./MetricsCard"; // Adjust the import path
import { useStateContext } from "../context/index.jsx"; // Ensure correct import path

const DisplayInfo = () => {
  const navigate = useNavigate();
//   const { user } = usePrivy();
// const {user}=useUser();
//   const { fetchUserRecords, records, fetchUserByEmail } = useStateContext();
//   const [metrics, setMetrics] = useState({
//     totalFolders: 0,
//     aiPersonalizedTreatment: 0,
//     totalScreenings: 0,
//     completedScreenings: 0,
//     pendingScreenings: 0,
//     overdueScreenings: 0,
//   });

//   useEffect(() => {
//     if (user) {
//       fetchUserByEmail(user.primaryEmailAddress)
//         .then(() => {
//           console.log(records);
//           const totalFolders = records.length;
//           let aiPersonalizedTreatment = 0;
//           let totalScreenings = 0;
//           let completedScreenings = 0;
//           let pendingScreenings = 0;
//           let overdueScreenings = 0;

//           records.forEach((record) => {
//             if (record.kanbanRecords) {
//               try {
//                 const kanban = JSON.parse(record.kanbanRecords);
//                 aiPersonalizedTreatment += kanban.columns.some(
//                   (column) => column.title === "AI Personalized Treatment",
//                 )
//                   ? 1
//                   : 0;
//                 totalScreenings += kanban.tasks.length;
//                 completedScreenings += kanban.tasks.filter(
//                   (task) => task.columnId === "done",
//                 ).length;
//                 pendingScreenings += kanban.tasks.filter(
//                   (task) => task.columnId === "doing",
//                 ).length;
//                 overdueScreenings += kanban.tasks.filter(
//                   (task) => task.columnId === "overdue",
//                 ).length;
//               } catch (error) {
//                 console.error("Failed to parse kanbanRecords:", error);
//               }
//             }
//           });

//           setMetrics({
//             totalFolders,
//             aiPersonalizedTreatment,
//             totalScreenings,
//             completedScreenings,
//             pendingScreenings,
//             //overdueScreenings,
//           });
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//     }
//   }, [user, fetchUserRecords, records]);


  const metricsData = [
    {
      title: "How prediction works",
      subtitle: "View",
      icon: IconZoomQuestionFilled,
      onClick: () => navigate("/work"),
    },
    {
      title: "Treatment Process",
      subtitle: "View",
      icon: IconCircleDashedCheck,

      onClick: () => navigate("/process"),
    },
    {
      title: "precautions",
      subtitle: "View",
      icon: IconHourglassHigh,
      
      onClick: () => navigate("/precaution"),
    },
    {
      title: "Helpline Directory",
      subtitle: "View",
      icon: IconStethoscope,
      onClick: () => navigate("/doctor"),
    },
    {
      title: "basic symptoms",
      subtitle: "View",
       icon: IconAlertHexagonFilled,
      onClick: () => navigate("/symptom"),
    },
    {
      title: "check-diet chart",
      subtitle: "View",
     icon: IconFidgetSpinner,
      onClick: () => navigate("/diet"),
    },
    
  ];

  return (
    <div className="flex flex-wrap gap-[26px]">
      <div className="mt-8 grid w-full gap-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-2 ">
        {metricsData.slice(0, 2).map((metric) => (
          <MetricsCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="mt-[9px] grid w-full  sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {metricsData.slice(2).map((metric) => (
          <MetricsCard key={metric.title} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default DisplayInfo;