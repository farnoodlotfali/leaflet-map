import { Control, useController } from "react-hook-form";

type SelectInputProps = {
  input: {
    name: string;
    control: Control<any>;
    label: string;
    options: {
      title: string;
      value: string;
    }[];
  };
};

const SelectInput: React.FC<SelectInputProps> = ({ input }) => {
  const {
    field,
    fieldState: { error },
    formState: {},
  } = useController({
    name: input.name,
    control: input.control,
    defaultValue: "",
  });

  return (
    <div>
      <select
        onChange={field.onChange}
        ref={field.ref}
        onBlur={field.onBlur}
        value={field.value}
        className={` p-1 border-stone-300 border-2 rounded-lg  outline-0 h-10 w-full focus:shadow-md ${
          !!error ? "border-red-500 " : "border-stone-300  focus:ring-1"
        }`}
      >
        <option value="" disabled className="text-xs">
          انتخاب {input.label}
        </option>
        {input.options.map((item) => {
          return (
            <option value={item.value} key={item.value} className="text-md">
              {item.title}
            </option>
          );
        })}
      </select>
      {!!error && (
        <span className="text-red-500 text-xs mr-1">{error?.message}</span>
      )}
    </div>
  );
};

export default SelectInput;
