import { Checkbox } from "../ui/checkbox";

interface FilterCheckboxProps {
  label: string;
}

const FilterCheckbox = ({ label }: FilterCheckboxProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={label} />
      <label htmlFor={label} className="text-gray-700 cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default FilterCheckbox;
