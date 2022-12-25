import React, { memo } from "react";
import type { RouteSelectProps } from "../types";
import { useRouteSelect } from "../common/routeHooks";
import SearchSelect from "../searchSelect";

function RouteSearchSelect({
  options,
  filterName,
  multiple,
  ...rest
}: RouteSelectProps) {
  const { onChange, selectedOptions } = useRouteSelect(options, filterName);
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

export default memo(RouteSearchSelect);
