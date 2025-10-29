interface Inputs {
  name: string;
  type: string;
  value: string | number | readonly string[] | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  rows?: number; // <-- se agrega aquí
}

export const InputsBriefs = (props: Inputs): JSX.Element => {
  const { rows = 6, ...rest } = props;

  if (props.type === "textarea") {
    return (
      <textarea
        className="border border-black placeholder-gray-400 outline-none focus:outline-none
                   focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mb-0 text-base block bg-secondary-900
                   rounded-md transition-all"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        rows={rows}
      />
    );
  }

  return (
    <input
      className="border border-black placeholder-gray-400 outline-none focus:outline-none
                 focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mb-0 text-base block bg-secondary-900
                 rounded-md transition-all"
      type={props.type}
      name={props.name}
      value={props.value}
      autoComplete="off"
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  );
};
