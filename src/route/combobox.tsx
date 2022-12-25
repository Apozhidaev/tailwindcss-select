import React, { memo } from "react";
import type { RouteSelectProps } from "../types";
import RouteSearchSelect from "./searchSelect";
import RouteSelect from "./select";

function RouteCombobox(props: RouteSelectProps) {
  if (props.options.length > 6) {
    return <RouteSearchSelect {...props} />;
  }
  return <RouteSelect {...props} />;
}

export default memo(RouteCombobox);
