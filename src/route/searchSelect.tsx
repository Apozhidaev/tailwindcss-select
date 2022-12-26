import React, { memo } from "react";
import type { RouteSelectProps } from "../types";
import { useRouteSelect } from "../common/routeHooks";
import SearchSelect from "../searchSelect";

function RouteSearchSelect({
  options,
  filterName,
  emptyValue,
  multiple,
  ...rest
}: RouteSelectProps) {
  const { onChange, selectedOptions } = useRouteSelect(options, filterName, emptyValue);
  if (multiple) {
    return (
      <SearchSelect
        {...rest}
        options={options}
        selectedOptions={selectedOptions}
        onChange={onChange}
        multiple
      />
    );
  }
  return (
    <SearchSelect
      {...rest}
      options={options}
      selectedOption={selectedOptions[0] || null}
      onChange={onChange}
    />
  );
}

export { SearchSelect };
export default memo(RouteSearchSelect);
