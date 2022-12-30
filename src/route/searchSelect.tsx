import React, { memo } from "react";
import type { RouteSelectProps } from "../types";
import { useRouteSelect } from "../common/routeHooks";
import SearchSelect from "../searchSelect";

function RouteSearchSelect({
  options,
  filterName,
  defaultValue = "",
  defaultValues = [""],
  multiple,
  filter,
  ...rest
}: RouteSelectProps) {
  const { onChange, selectedOptions, optionValues } = useRouteSelect(
    options,
    filterName,
    multiple ? defaultValues : [defaultValue]
  );
  if (multiple) {
    return (
      <SearchSelect
        {...rest}
        options={options}
        selectedOptions={selectedOptions}
        onChange={onChange}
        multiple
        filter={filter ?? optionValues.length > 0}
      />
    );
  }
  return (
    <SearchSelect
      {...rest}
      options={options}
      selectedOption={selectedOptions[0] || null}
      onChange={onChange}
      filter={filter ?? optionValues.length > 0}
    />
  );
}

export { SearchSelect };
export default memo(RouteSearchSelect);
