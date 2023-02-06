type Forbid<K> = Partial<Record<keyof K, never>>;
type Or<T1, T2> = (T1 & Forbid<T2>) | (T2 & Forbid<T1>);

export type Option = {
  label: string;
  value: string;
};

type Options = {
  options: Option[];
};

type SelectedOption = {
  selectedOption: Option | null;
};

type SelectedOptions = {
  selectedOptions: Option[];
};

type DefaultValue = {
  defaultValue?: string;
};

type DefaultValues = {
  defaultValues?: string[];
};

export type CommonProps = {
  className?: string;
  placeholder?: string;
  isLoading?: boolean;
  filter?: boolean;
  resetButton?: boolean;
  disabled?: boolean;
};

export type SelectCommonProps = CommonProps & Options;

export type SingleProps = SelectedOption &
  Forbid<SelectedOptions> & {
    onChange: (value: Option | null) => void;
    multiple?: false;
  };

export type MultipleProps = SelectedOptions &
  Forbid<SelectedOption> & {
    onChange: (value: Option[]) => void;
    multiple: true;
  };

export type RouteSingleProps = DefaultValue &
  Forbid<DefaultValues> & {
    multiple?: false;
  };

export type RouteMultipleProps = DefaultValues &
  Forbid<DefaultValue> & {
    multiple: true;
  };

export type RouteProps = {
  filterName: string;
};

export type SelectProps = SelectCommonProps & (SingleProps | MultipleProps);

type SearchProps = {
  searchQuery: string;
  onSearch: (searchQuery: string, valid: boolean) => void;
  minQueryLength?: number;
};

export type AutocompleteProps = SelectCommonProps &
  Pick<SingleProps, "selectedOption" | "onChange"> &
  SearchProps;

export type RouteAutocompleteProps = SelectCommonProps & RouteProps & DefaultValue & SearchProps;

export type RouteSelectProps = SelectCommonProps & RouteProps & (RouteSingleProps | RouteMultipleProps);

type TreeChildren = { children: TreeNode[] };

export type TreeNode = Pick<Option, "label"> &
  Or<TreeChildren, Omit<Option, "label">>;

export type TreeGroup = Pick<Option, "label"> & TreeChildren;

type TreeData = {
  treeData: TreeNode[];
};

export type TreeCommonProps = CommonProps & TreeData;

export type TreeSelectProps = TreeCommonProps & (SingleProps | MultipleProps);

export type RouteTreeSelectProps = TreeCommonProps & RouteProps & (RouteSingleProps | RouteMultipleProps);
