import React, { memo } from "react";
import { useRouteSelect } from "../common/routeHooks";
import type { CommonProps } from "../types";
import Autocomplete from "../autocomplete";

type Props = CommonProps & {
  filterName: string;
  searchQuery: string;
  onSearch: (searchQuery: string, entry: boolean) => void;
  minQueryLength?: number;
};

function RouteAutocomplete({ options, filterName, ...rest }: Props) {
  const { onChange, selectedOptions } = useRouteSelect(options, filterName);
  return (
    <Autocomplete
      {...rest}
      options={options}
      selectedOption={selectedOptions[0] || null}
      onChange={onChange}
    />
  );
}

export default memo(RouteAutocomplete);
