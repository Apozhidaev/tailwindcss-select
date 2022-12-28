import { useSearchParams } from "react-router-dom";
import type { Option } from "../types";

export function useRouteSelect(
  options: Option[],
  filterName: string,
  defaultValues: string[] = []
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const optionValues = searchParams.getAll(filterName);
  const selectedValues = optionValues.length > 0 ? optionValues : defaultValues;
  const selectedOptions =
    selectedValues.length > 0
      ? options.filter((x) => selectedValues.includes(x.value))
      : [];

  const onChange = (option: Option | Option[] | null) => {
    searchParams.delete(filterName);

    const values = Array.isArray(option)
      ? option.map((x) => x.value)
      : [option?.value || ""];

    values.forEach((value) => {
      if (!defaultValues.includes(value)) {
        searchParams.append(filterName, value);
      }
    });

    setSearchParams(searchParams, { replace: true });
  };

  return {
    optionValues,
    selectedOptions,
    onChange,
  };
}
