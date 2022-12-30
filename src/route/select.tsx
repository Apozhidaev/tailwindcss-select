import React, { memo } from "react";
import type { RouteSelectProps } from "../types";
import { useRouteSelect } from "../common/routeHooks";
import Select from "../select";

function RouteSelect({
  options,
  filterName,
  multiple,
  filter,
  defaultValue = "",
  defaultValues = [""],
  ...rest
}: RouteSelectProps) {
  const { onChange, selectedOptions, optionValues } = useRouteSelect(
    options,
    filterName,
    multiple ? defaultValues : [defaultValue]
  );
  if (multiple) {
    return (
      <Select
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
    <Select
      {...rest}
      options={options}
      selectedOption={selectedOptions[0] || null}
      onChange={onChange}
      filter={filter ?? optionValues.length > 0}
    />
  );
}

export { Select };
export default memo(RouteSelect);
