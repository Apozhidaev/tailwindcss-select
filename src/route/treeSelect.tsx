import React, { memo } from "react";
import type { RouteTreeSelectProps } from "../types";
import { useRouteSelect } from "../common/routeHooks";
import TreeSelect from "../treeSelect";
import { getOptions } from "../common/utils";

function RouteTreeSelect({
  treeData,
  filterName,
  emptyValue,
  multiple,
  ...rest
}: RouteTreeSelectProps) {
  const { onChange, selectedOptions } = useRouteSelect(
    getOptions(treeData),
    filterName,
    emptyValue
  );
  if (multiple) {
    return (
      <TreeSelect
        {...rest}
        treeData={treeData}
        selectedOptions={selectedOptions}
        onChange={onChange}
        multiple
      />
    );
  }
  return (
    <TreeSelect
      {...rest}
      treeData={treeData}
      selectedOption={selectedOptions[0] || null}
      onChange={onChange}
    />
  );
}

export { TreeSelect };
export default memo(RouteTreeSelect);
