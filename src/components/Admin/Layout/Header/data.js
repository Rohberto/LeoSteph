import { AuthService } from "./../../../../services/auth";
const logMeOut = () => {
  AuthService.doLogout();
  location.href = "/admin/login";
};

export const dropdowns = [
  {
    name: "My Profile",
    value: "profile",
    fn: () => {
      location.href = "/admin/profile";
    },
    icon: "ant-design:user-outlined",
  },
  {
    name: "Logout",
    value: "logout",
    fn: () => logMeOut(),
    icon: "ant-design:logout-outlined",
  },
];
