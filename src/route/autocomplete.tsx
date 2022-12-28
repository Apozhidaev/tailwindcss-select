import React, { memo } from "react";
import { useRouteSelect } from "../common/routeHooks";
import type { RouteAutocompleteProps, Option } from "../types";
import Autocomplete from "../autocomplete";

function RouteAutocomplete({
  options,
  filterName,
  defaultValue = "",
  filter,
  ...rest
}: RouteAutocompleteProps) {
  const { onChange, selectedOptions, optionValues } = useRouteSelect(
    options,
    filterName,
    [defaultValue]
  );
  const [value] = optionValues;
  const selectedValue: Option | null = value ? { label: value, value } : null;
  return (
    <Autocomplete
      {...rest}
      options={options}
      selectedOption={selectedOptions[0] || selectedValue}
      onChange={onChange}
      filter={filter !== undefined ? filter : optionValues.length > 0}
    />
  );
}

export { Autocomplete };
export default memo(RouteAutocomplete);
