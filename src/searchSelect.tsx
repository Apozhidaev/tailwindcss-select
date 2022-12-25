import classNames from "classnames";
import React, { Fragment, memo, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import type { SelectProps } from "./types";

function SearchSelect({
  className,
  options,
  selectedOption,
  selectedOptions,
  onChange,
  multiple,
  placeholder,
  isLoading,
  filter,
  resetButton = true,
}: SelectProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const selectedValue = multiple ? selectedOptions : selectedOption;
  const selectedLabel = multiple
    ? selectedOptions?.map((x) => x.label).join(", ")
    : selectedOption?.label;

  const searchString = searchQuery.toLowerCase().replace(/\s+/g, "");
  const currentOptions =
    searchQuery === ""
      ? options
      : options.filter((x) =>
          x.label.toLowerCase().replace(/\s+/g, "").includes(searchString)
        );

  return (
    <Combobox
      value={selectedValue || null}
      onChange={onChange}
      multiple={multiple as any}
      nullable
      as="div"
      className={classNames("relative", className)}
    >
      <Combobox.Button as="div">
        <button
          type="button"
          className={classNames(
            "relative form-control h-9 cursor-default py-2 pl-3 pr-10 text-left text-sm",
            filter ? "form-filter" : ""
          )}
        >
          <span
            title={selectedLabel}
            className={classNames(
              "block truncate",
              selectedLabel ? "" : "text-secondary-500"
            )}
          >
            {selectedLabel || placeholder}
          </span>
          {(!resetButton || !selectedLabel) && (
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-secondary-500"
                aria-hidden="true"
              />
            </span>
          )}
        </button>
      </Combobox.Button>
      {resetButton && selectedLabel && (
        <button
          type="button"
          className="absolute z-10 right-2.5 inset-y-0 my-2 px-0.5 rounded hover:bg-secondary-100 active:bg-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          onClick={() => {
            if (multiple) {
              onChange([]);
            } else {
              onChange(null);
            }
          }}
        >
          <XMarkIcon
            className="h-4 w-4 text-secondary-500"
            aria-hidden="true"
          />
        </button>
      )}
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => {
          setSearchQuery("");
        }}
      >
        <Combobox.Options className="absolute z-40 mt-1 w-full rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
          {!isLoading && (
            <div className="relative">
              <MagnifyingGlassIcon
                className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-secondary-400"
                aria-hidden="true"
              />
              <Combobox.Input
                type="search"
                placeholder="Search..."
                className="h-12 w-full bottom-0 border-transparent pl-11 pr-4 text-secondary-800 placeholder-secondary-400 text-sm focus:border-none focus:outline-none focus:ring-0 focus:shadow-none"
                displayValue={() => searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                }}
              />
            </div>
          )}
          {currentOptions.length === 0 || isLoading ? (
            <div className="relative cursor-default select-none py-2 px-4 text-secondary-700">
              {isLoading ? "Loading..." : "No options"}
            </div>
          ) : (
            <div className="overflow-auto max-h-60">
              {currentOptions.map((option) => (
                <Combobox.Option
                  key={option.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-primary-100 text-primary-900"
                        : "text-secondary-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected && selectedValue
                            ? "font-medium"
                            : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected && selectedValue ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </div>
          )}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
}

export default memo(SearchSelect);
