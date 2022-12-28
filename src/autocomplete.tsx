import classNames from "classnames";
import React, { Fragment, memo } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import type { AutocompleteProps } from "./types";

function Autocomplete({
  className,
  options,
  selectedOption,
  onChange,
  placeholder,
  isLoading,
  filter,
  searchQuery,
  onSearch,
  minQueryLength = 2,
  resetButton = true,
}: AutocompleteProps) {
  const selectedValue = selectedOption;
  const selectedLabel = selectedOption?.label || '';

  const emptyMessage =
    searchQuery.length < minQueryLength
      ? `Type at least ${minQueryLength} symbols`
      : "Nothing found";

  const showOptions =
    options.length > 0 && !isLoading && searchQuery.length >= minQueryLength;

  return (
    <Combobox
      value={selectedValue}
      onChange={onChange}
      nullable
      as="div"
      className={classNames("relative", className)}
    >
      <Combobox.Input
        placeholder={placeholder}
        className={classNames(
          "form-input relative w-full cursor-default pl-3 pr-10 text-left truncate placeholder-secondary-500",
          filter ? "form-input-filter" : "",
        )}
        displayValue={() => searchQuery || selectedLabel}
        onChange={({ target }) => {
          const { value } = target;
          onSearch(value, value.length >= minQueryLength);
        }}
      />
      {resetButton && selectedValue && (
        <button
          type="button"
          className="form-input-clear absolute z-10 right-2.5 inset-y-0 my-auto h-5 px-0.5"
          onClick={() => {
            onChange(null);
          }}
        >
          <XMarkIcon
            className="h-4 w-4"
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
          onSearch("", false);
        }}
      >
        <Combobox.Options className="absolute z-40 mt-1 w-full rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
          {!showOptions ? (
            <div className="relative cursor-default select-none py-2 px-4 text-secondary-700">
              {isLoading ? "Loading..." : emptyMessage}
            </div>
          ) : (
            <div className="overflow-auto max-h-60">
              {options.map((option) => (
                <Combobox.Option
                  key={option.label}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 text-secondary-800 ${
                      active ? "bg-primary-100" : ""
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        title={option.label}
                        className={`block truncate ${
                          selected && selectedValue
                            ? "font-medium text-secondary-900"
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

export default memo(Autocomplete);
