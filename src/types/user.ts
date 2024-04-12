// interface courses {}

export interface IUser {
  _id: string;
  name: {
    first_name: string;
    last_name: string;
  };
  role: "student" | "teacher";
  courses: string[];
  birthday: Date;
  phone_number: string;
  email: string;
  username: string;
  avatar: string;
}
