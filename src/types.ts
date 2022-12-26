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

export type RouteProps = {
  filterName: string;
  emptyValue?: boolean;
  multiple?: boolean;
};

export type SelectProps = CommonProps & (SingleProps | MultipleProps);

export type RouteSelectProps = CommonProps & RouteProps;

export type TreeNode = { label: string } & (
  | { children: TreeNode[]; value?: never }
  | { children?: never; value: string }
);

export type TreeGroup = {
  label: string;
  children: TreeNode[];
};

export type TreeCommonProps = Omit<CommonProps, "options"> & {
  treeData: TreeNode[];
};

export type TreeSelectProps = TreeCommonProps & (SingleProps | MultipleProps);

export type RouteTreeSelectProps = TreeCommonProps & RouteProps;
