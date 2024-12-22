import { getCountryFlag } from "../../../services/Admin/opened";

export const tiles = [
  {
    name: "Total Sales",
    style: "",
    total: "150",
    data: {
      up: true,
      percentage: 12.5,
    },
  },
  {
    name: "Total Orders",
    style: "",
    total: "90",
    data: {
      up: false,
      percentage: -7.3,
    },
  },
  {
    name: "Total Products",
    style: "",
    total: "200",
    data: {
      up: true,
      percentage: 15.0,
    },
  },
  {
    name: "Total Users",
    style: "",
    total: "15",
    data: {
      up: true,
      percentage: 68.0,
    },
  },
];

export const visitors = [
  {
    name: "USA",
    value: 2000,
    async flag() {
      return getCountryFlag(this.name);
    },
  },
  {
    name: "Nigeria",
    value: 1500,
    async flag() {
      return getCountryFlag(this.name);
    },
  },
  {
    name: "China",
    value: 1000,
    async flag() {
      return getCountryFlag(this.name);
    },
  },
  {
    name: "Germany",
    value: 500,
    async flag() {
      return getCountryFlag(this.name);
    },
  },
  {
    name: "France",
    value: 300,
    async flag() {
      return getCountryFlag(this.name);
    },
  },
];
