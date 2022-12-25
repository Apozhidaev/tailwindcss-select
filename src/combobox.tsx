import React, { memo } from "react";
import type { SelectProps } from "./types";
import SearchSelect from "./searchSelect";
import Select from "./select";

function Combobox(props: SelectProps) {
  if (props.options.length > 6) {
    return <SearchSelect {...props} />;
  }
  return <Select {...props} />;
}

export default memo(Combobox);
