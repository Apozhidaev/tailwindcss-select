import { useSearchParams } from "react-router-dom";
import type { Option } from "../types";

export function useRouteSelect(
  options: Option[],
  filterName: string,
  emptyValue?: boolean
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const optionValues = searchParams.getAll(filterName);
  const selectedOptions = options.filter((x) => optionValues.includes(x.value));

  const onChange = (option: Option | Option[] | null) => {
    searchParams.delete(filterName);

    if (option) {
      if (Array.isArray(option)) {
        option.forEach((x) => {
          searchParams.append(filterName, x.value);
        });
      } else {
        searchParams.set(filterName, option.value);
      }
    } else if (emptyValue) {
      searchParams.set(filterName, "");
    }

    setSearchParams(searchParams, { replace: true });
  };

  return {
    selectedOptions,
    onChange,
  };
}
