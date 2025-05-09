import { records, screening, user, apps ,predict,location, chatbot} from "../assets";

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: apps,
    link: "/",
  },
  // {
  //   name: "records",
  //   imgUrl: records,
  //   link: "/medical-records",
  // },
  {
    name: "screening",
    imgUrl: screening,
    link: "/screening-schedules",
  },

  {
    name: "profile",
    imgUrl: user,
    link: "/profile",
  },
  {
    name: "prediction",
    imgUrl: predict,
    link: "/predict",
  },
  {
    name: "location",
    imgUrl: location, 
    link:"/location"

  },
  {
    name:"chatbot",
    imgUrl: chatbot,
    link:"/chatbot"
  }
];