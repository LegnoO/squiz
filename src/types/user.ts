// interface courses {}

export interface IUser {
  username: string;
  email: string;
  password: string;
  name: {
    last_name: string;
    first_name: string;
  };
  birthday: Date;
  phone_number: string;
  role: "student" | "teacher";
  courses: string[];
}
