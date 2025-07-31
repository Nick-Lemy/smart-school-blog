export interface User {
  id: 1;
  name: string;
  email: string;
  role: "Admin" | "User";
  languagePreference: "Fr" | "Eng";
  createdAt: string;
  updatedAt: string;
}
