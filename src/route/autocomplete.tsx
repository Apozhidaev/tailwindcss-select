import React, { memo } from "react";
import { useRouteSelect } from "../common/routeHooks";
import type { CommonProps } from "../types";
import Autocomplete from "../autocomplete";

export type RouteAutocompleteProps = CommonProps & {
  filterName: string;
  searchQuery: string;
  onSearch: (searchQuery: string, entry: boolean) => void;
  minQueryLength?: number;
  emptyValue?: boolean;
};

function RouteAutocomplete({ options, filterName, emptyValue, ...rest }: RouteAutocompleteProps) {
  const { onChange, selectedOptions } = useRouteSelect(options, filterName, emptyValue);
  return (
    <Autocomplete
      {...rest}
      options={options}
      selectedOption={selectedOptions[0] || null}
      onChange={onChange}
    />
  );
}

export { Autocomplete };
export default memo(RouteAutocomplete);
