import classNames from "classnames";
import React, { Fragment, memo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import type { SelectProps } from "./types";

function Select({
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
  const selectedValue = multiple ? selectedOptions : selectedOption;
  const selectedLabel = multiple
    ? selectedOptions?.map((x) => x.label).join(", ")
    : selectedOption?.label;

  return (
    <Listbox
      value={selectedValue || null}
      onChange={onChange}
      multiple={multiple}
      as="div"
      className={classNames("relative", className)}
    >
      <Listbox.Button
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
          <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <ChevronDownIcon
              className="h-5 w-5 text-secondary-500"
              aria-hidden="true"
            />
          </span>
        )}
      </Listbox.Button>
      {resetButton && selectedLabel && (
        <button
          type="button"
          className="absolute z-10 right-2.5 inset-y-0 my-auto h-5 px-0.5 rounded hover:bg-secondary-100 active:bg-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
      >
        <Listbox.Options className="absolute z-40 mt-1 w-full rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
          {options.length === 0 || isLoading ? (
            <div className="relative cursor-default select-none py-2 px-4 text-secondary-700">
              {isLoading ? "Loading..." : "No options"}
            </div>
          ) : (
            <div className="overflow-auto max-h-60">
              {options.map((option) => (
                <Listbox.Option
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
                </Listbox.Option>
              ))}
            </div>
          )}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}

export default memo(Select);
