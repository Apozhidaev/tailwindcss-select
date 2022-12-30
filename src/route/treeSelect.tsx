import React, { memo } from "react";
import type { RouteTreeSelectProps } from "../types";
import { useRouteSelect } from "../common/routeHooks";
import TreeSelect from "../treeSelect";
import { getOptions } from "../common/utils";

function RouteTreeSelect({
  treeData,
  filterName,
  defaultValue = "",
  defaultValues = [""],
  multiple,
  filter,
  ...rest
}: RouteTreeSelectProps) {
  const { onChange, selectedOptions, optionValues } = useRouteSelect(
    getOptions(treeData),
    filterName,
    multiple ? defaultValues : [defaultValue]
  );
  if (multiple) {
    return (
      <TreeSelect
        {...rest}
        treeData={treeData}
        selectedOptions={selectedOptions}
        onChange={onChange}
        multiple
        filter={filter ?? optionValues.length > 0}
      />
    );
  }
  return (
    <TreeSelect
      {...rest}
      treeData={treeData}
      selectedOption={selectedOptions[0] || null}
      onChange={onChange}
      filter={filter ?? optionValues.length > 0}
    />
  );
}

export { TreeSelect };
export default memo(RouteTreeSelect);
