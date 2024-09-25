import { TUserLevel } from "../types";

export interface IUser1 {
  name: string;
  email: string;
  img: string;
  level: TUserLevel;
}

interface UserObject {
  [key: string]: IUser1;
}

export const users = {
  "1": {
    name: "John Doe",
    email: "test@mail.com",
    img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
    level: "pro",
  },

  "2": {
    name: "Jane Doe",
    email: "test@mail.com",
    img: "https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?b=1&s=612x612&w=0&k=20&c=MsKXmwf7TDRdKRn_lHohhmD5rvVvnGs9ry0xl6CrMT4=",
    level: "3",
  },

  "3": {
    name: "John Smith",
    email: "",
    img: "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=1600",
    level: "2",
  },

  "4": {
    name: "Jane Smith",
    email: "",
    img: "https://images.pexels.com/photos/5393594/pexels-photo-5393594.jpeg?auto=compress&cs=tinysrgb&w=1600",
    level: "1",
  },

  "5": {
    name: "John Doe",
    email: "",
    img: "https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg?auto=compress&cs=tinysrgb&w=1600",
    level: "1",
  },

  "6": {
    name: "Jane Doe",
    email: "",
    img: "https://images.pexels.com/photos/5876695/pexels-photo-5876695.jpeg?auto=compress&cs=tinysrgb&w=1600",
    level: "1",
  },
} as UserObject;
