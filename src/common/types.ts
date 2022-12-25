export type Option = {
  label: string;
  value: string;
};

export type CommonProps = {
  className?: string;
  options: Option[];
  placeholder?: string;
  isLoading?: boolean;
  filter?: boolean;
  resetButton?: boolean;
};

export type SingleProps = {
  selectedOption: Option | null;
  selectedOptions?: never;
  onChange: (value: Option | null) => void;
  multiple?: false;
};

export type MultipleProps = {
  selectedOption?: never;
  selectedOptions: Option[];
  onChange: (value: Option[]) => void;
  multiple: true;
};

export type SelectProps = CommonProps & (SingleProps | MultipleProps);