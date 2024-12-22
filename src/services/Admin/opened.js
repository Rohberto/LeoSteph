import axios from "axios";

export const getCountryFlag = async (countryName) => {
  if (!countryName) return null;

  const res = await axios.get(
    `https://restcountries.com/v3.1/all?fields=name,flags`
  );
  const countries = res.data.map((country) => ({
    name: country.name.common,
    flag: country.flags.png,
  }));

  return (
    countries.find((country) => country.name === countryName)?.flag || null
  );
};
