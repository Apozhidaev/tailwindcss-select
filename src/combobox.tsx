import React, { memo } from "react";
import type { SelectProps } from "./common/types";
import SelectSelect from "./selectSelect";
import Select from "./select";

function Combobox(props: SelectProps) {
  if (props.options.length > 6) {
    return <SelectSelect {...props} />;
  }
  return <Select {...props} />;
}

export default memo(Combobox);
