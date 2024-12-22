import { Icon } from "@iconify/react/dist/iconify.js";
import useField from "../../../../hooks/useField";
import validateData from "../../../../utils/validateData";

const SearchBar = () => {
  // eslint-disable-next-line no-unused-vars
  const { reset, errMsg, update, ...field } = useField({
    type: "text",
    name: "search",
    label: "",
    min: 3,
    max: 30,
    isRequired: true,
    styles: "border-0 w-full",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { query: field.value };
    const isValidated = validateData(query);
    if (isValidated) {
      console.log(query);
    }
  };

  return (
    <div className="mx-2">
      <form
        onSubmit={handleSubmit}
        className="w-full p-2 h-10 flex flex-row bg-gray-50 rounded-full items-center gap-y-2"
      >
        <div className="">
          <Icon icon="icons8:search" width={24} />
        </div>
        <div className="w-full">
          <input
            className={`appearance-none block focus:bg-gray-50 h-7 w-full bg-gray-50 text-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:appearance-none`}
            id="search"
            {...field}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
