interface Inputs {
  name: string;
  type: string;
  value: string | number | readonly string[] | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  rows?: number; // <-- se agrega aquí
}

export const InputsBriefs = (props: Inputs): JSX.Element => {
  const { rows = 6 } = props;

  if (props.type === "textarea") {
    return (
      <textarea
        className="block w-full pt-4 pb-4 pl-4 pr-4 mt-2 mb-0 text-base placeholder-gray-400 transition-all border border-black rounded-md outline-none focus:outline-none focus:border-black bg-secondary-900"
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
      className="block w-full pt-4 pb-4 pl-4 pr-4 mt-2 mb-0 text-base placeholder-gray-400 transition-all border border-black rounded-md outline-none focus:outline-none focus:border-black bg-secondary-900"
      type={props.type}
      name={props.name}
      value={props.value}
      autoComplete="off"
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  );
};
