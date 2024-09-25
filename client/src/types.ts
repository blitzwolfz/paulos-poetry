export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type TRating = {
  id: number;
  rating: number;
  comment: string;
  userId: number;
  createdAt: number;
};

export type UserRole = "basic" | "admin";

// The user object that will be seen in the frontend
export type TUser = {
  id: number | null;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  level: TUserLevel;
  role: UserRole;
  createdAt: number;
};

export const BASE_USER: TUser = {
  id: null,
  email: "",
  firstName: "",
  lastName: "",
  profilePicture: "",
  level: "1",
  role: "basic",
  createdAt: 0,
};

export type TUserLevel = "1" | "2" | "3" | "pro";

export type CommentObject = {
  _id: string;
  text: string;
  date: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
};

export type TPoem = {
  _id: string;
  title: string;
  english: string;
  greek: string;
  comments: CommentObject[];
  likes: string[]; // UserId[]
  datePosted: number;
};
