import React, { memo } from "react";
import { useRouteSelect } from "../common/routeHooks";
import type { RouteAutocompleteProps, Option } from "../types";
import Autocomplete from "../autocomplete";

function RouteAutocomplete({
  options,
  filterName,
  emptyValue,
  ...rest
}: RouteAutocompleteProps) {
  const { onChange, selectedOptions, optionValues } = useRouteSelect(
    options,
    filterName,
    emptyValue
  );
  const [value] = optionValues;
  const selectedValue: Option | null = value ? { label: value, value } : null;
  return (
    <Autocomplete
      {...rest}
      options={options}
      selectedOption={selectedOptions[0] || selectedValue}
      onChange={onChange}
    />
  );
}

export { Autocomplete };
export default memo(RouteAutocomplete);
