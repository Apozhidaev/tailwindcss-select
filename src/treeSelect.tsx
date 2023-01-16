import classNames from "classnames";
import React, { Fragment, memo, useState, useMemo } from "react";
import { Combobox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { FolderMinusIcon, FolderPlusIcon } from "@heroicons/react/24/outline";
import type { TreeSelectProps, TreeNode, TreeGroup, Option } from "./types";
import { getOptions } from "./common/utils";

function getFlatTreeGroups(treeData: TreeNode[]): TreeGroup[] {
  return treeData
    .filter((x) => x.children)
    .flatMap((x) => [x as TreeGroup, ...getFlatTreeGroups(x.children!)]);
}

function filterNodes(treeData: TreeNode[], searchString: string) {
  const treeNodes: TreeNode[] = [];
  for (let i = 0; i < treeData.length; i++) {
    const node = treeData[i];
    if (node.label.toLowerCase().replace(/\s+/g, "").includes(searchString)) {
      treeNodes.push(node);
      continue;
    }
    if (node.children) {
      const children = filterNodes(node.children, searchString);
      if (children.length > 0) {
        treeNodes.push({
          ...node,
          children,
        });
      }
    }
  }
  return treeNodes;
}

function getSelection(
  node: TreeGroup,
  selectionSet: Set<Option>,
  selectionCache: Map<TreeGroup, boolean>
) {
  if (selectionCache.has(node)) {
    return selectionCache.get(node);
  }
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    let selection;
    if (child.children) {
      selection = getSelection(child, selectionSet, selectionCache);
    } else {
      selection = selectionSet.has(child);
    }
    if (!selection) {
      selectionCache.set(node, false);
      return false;
    }
  }
  selectionCache.set(node, true);
  return true;
}

function getHasSelection(
  node: TreeGroup,
  selectionSet: Set<Option>,
  selectionCache: Map<TreeGroup, boolean>,
  hasSelectionCache: Map<TreeGroup, boolean>
) {
  if (selectionCache.get(node)) {
    return true;
  }
  if (hasSelectionCache.has(node)) {
    return hasSelectionCache.get(node);
  }
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    let hasSelection;
    if (child.children) {
      hasSelection = getHasSelection(
        child,
        selectionSet,
        selectionCache,
        hasSelectionCache
      );
    } else {
      hasSelection = selectionSet.has(child);
    }
    if (hasSelection) {
      hasSelectionCache.set(node, true);
      return true;
    }
  }
  hasSelectionCache.set(node, false);
  return false;
}

function TreeGroupOption({
  node,
  ...rest
}: {
  node: TreeGroup;
  selectionSet: Set<Option>;
  selectionCache: Map<TreeGroup, boolean>;
  hasSelectionCache: Map<TreeGroup, boolean>;
  collapsedSet: Set<TreeGroup>;
  onExpand: (value: TreeGroup) => void;
  onChange?: (value: Option[]) => void;
}) {
  const { selectionSet, selectionCache, hasSelectionCache, onChange } = rest;
  const selected = getSelection(node, selectionSet, selectionCache);
  const hasSelection =
    selected ||
    getHasSelection(node, selectionSet, selectionCache, hasSelectionCache);
  const expanded = !rest.collapsedSet.has(node);

  return (
    <div>
      <div
        onClick={() => {
          if (onChange) {
            const selectionSetClone = new Set(selectionSet);
            const options: Option[] = getOptions(node.children);
            if (selected) {
              options.forEach((option) => {
                selectionSetClone.delete(option);
              });
            } else {
              options.forEach((option) => {
                selectionSetClone.add(option);
              });
            }
            onChange(Array.from(selectionSetClone));
          }
        }}
        className={`relative select-none py-2 pl-10 pr-10 text-secondary-800 tw-rc--option tw-rc--node ${
          onChange ? "hover:bg-primary-100" : ""
        }`}
      >
        <span
          title={node.label}
          className={`block tw-rc--option-label ${
            hasSelection ? "font-medium text-secondary-900" : "font-normal"
          }`}
        >
          {node.label}
        </span>
        {selected ? (
          <span className="absolute inset-y-0 right-4 flex items-center pl-3 text-primary-600">
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        ) : null}
        <button
          type="button"
          tabIndex={-1}
          className="absolute inset-y-0 left-0 flex items-center pl-3"
          onClick={(e) => {
            e.stopPropagation();
            rest.onExpand(node);
          }}
        >
          {expanded ? (
            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>
      {expanded && (
        <div className="pl-5">
          <TreeOptions nodes={node.children} {...rest} />
        </div>
      )}
    </div>
  );
}

function TreeOptions({
  nodes,
  ...rest
}: {
  nodes: TreeNode[];
  selectionSet: Set<Option>;
  selectionCache: Map<TreeGroup, boolean>;
  hasSelectionCache: Map<TreeGroup, boolean>;
  collapsedSet: Set<TreeGroup>;
  onExpand: (value: TreeGroup) => void;
  onChange?: (value: Option[]) => void;
}) {
  return (
    <>
      {nodes.map((node) => {
        if (node.children) {
          return <TreeGroupOption {...rest} key={node.label} node={node} />;
        }
        return (
          <Combobox.Option
            key={node.label}
            className={({ active }) =>
              `relative cursor-default select-none py-2 pl-5 pr-10 text-secondary-800 tw-rc--option ${
                active ? "bg-primary-100" : ""
              }`
            }
            value={node}
          >
            {({ selected }) => (
              <>
                <span
                  title={node.label}
                  className={`block tw-rc--option-label ${
                    selected ? "font-medium text-secondary-900" : "font-normal"
                  }`}
                >
                  {node.label}
                </span>
                {selected ? (
                  <span className="absolute inset-y-0 right-4 flex items-center pl-3 text-primary-600">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </>
            )}
          </Combobox.Option>
        );
      })}
    </>
  );
}

function TreeSelect({
  className,
  treeData,
  selectedOption,
  selectedOptions,
  onChange,
  multiple,
  placeholder,
  isLoading,
  filter,
  resetButton = true,
}: TreeSelectProps) {
  const [collapsedSet, setCollapsedSet] = useState<Set<TreeGroup>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const selectedValue = multiple ? selectedOptions : selectedOption;
  const selectedLabel = multiple
    ? selectedOptions?.map((x) => x.label).join(", ")
    : selectedOption?.label;

  const treeNodes = useMemo(() => {
    return searchQuery === ""
      ? treeData
      : filterNodes(treeData, searchQuery.toLowerCase().replace(/\s+/g, ""));
  }, [searchQuery, treeData]);

  const allCollapsedSet = useMemo(() => {
    const treeGroupSet = new Set<TreeGroup>();
    getFlatTreeGroups(treeNodes).forEach((node) => treeGroupSet.add(node));
    return treeGroupSet;
  }, [treeNodes]);

  const selectionSet = new Set<Option>(
    multiple ? selectedOptions : selectedOption ? [selectedOption] : []
  );
  const selectionCache = new Map<TreeGroup, boolean>();
  const hasSelectionCache = new Map<TreeGroup, boolean>();
  const collapseAll = allCollapsedSet.size > collapsedSet.size;

  return (
    <Combobox
      value={selectedValue || null}
      onChange={onChange}
      multiple={multiple as any}
      nullable
      as="div"
      className={classNames("relative tw-rc--tree-select", className)}
    >
      <Combobox.Button as="div">
        <button
          type="button"
          className={classNames(
            "form-input relative w-full cursor-default pl-3 pr-10 text-left tw-rc--input",
            filter ? "form-input-filter tw-rc--filter" : ""
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
                className="h-5 w-5 tw-rc--dropdown-icon"
                aria-hidden="true"
              />
            </span>
          )}
        </button>
      </Combobox.Button>
      {resetButton && selectedLabel && (
        <button
          type="button"
          className="absolute z-10 right-2.5 inset-y-0 my-auto h-5 px-0.5 tw-rc--reset-button"
          onClick={() => {
            if (multiple) {
              onChange([]);
            } else {
              onChange(null);
            }
          }}
        >
          <XMarkIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => {
          setSearchQuery("");
          if (collapsedSet.size > 0) {
            setCollapsedSet(new Set());
          }
        }}
      >
        <Combobox.Options className="absolute z-40 mt-1 w-full bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm tw-rc--popup">
          {!isLoading && (
            <div className="relative">
              <MagnifyingGlassIcon
                className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-secondary-400"
                aria-hidden="true"
              />
              <Combobox.Input
                type="search"
                placeholder="Search..."
                className="h-12 w-full bottom-0 border-transparent pl-11 pr-11 text-secondary-800 placeholder-secondary-400 text-sm focus:border-none focus:outline-none focus:ring-0 focus:shadow-none"
                displayValue={() => searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  if (collapsedSet.size > 0) {
                    setCollapsedSet(new Set());
                  }
                }}
              />
              <button
                type="button"
                tabIndex={-1}
                title={collapseAll ? "Collapse All" : "Expand All"}
                className="absolute top-4 right-5 text-secondary-400 hover:text-primary-500"
                onClick={() => {
                  if (collapseAll) {
                    setCollapsedSet(new Set(allCollapsedSet));
                  } else {
                    setCollapsedSet(new Set());
                  }
                }}
              >
                {collapseAll ? (
                  <FolderMinusIcon className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <FolderPlusIcon className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          )}
          {treeNodes.length === 0 || isLoading ? (
            <div className="relative cursor-default select-none py-2 px-4 text-secondary-700">
              {isLoading ? "Loading..." : "No options"}
            </div>
          ) : (
            <div className="overflow-auto max-h-80 tw-rc--option-tree">
              <TreeOptions
                nodes={treeNodes}
                selectionSet={selectionSet}
                selectionCache={selectionCache}
                hasSelectionCache={hasSelectionCache}
                collapsedSet={collapsedSet}
                onExpand={(value) => {
                  const collapsed = new Set(collapsedSet);
                  if (collapsed.has(value)) {
                    collapsed.delete(value);
                  } else {
                    collapsed.add(value);
                  }
                  setCollapsedSet(collapsed);
                }}
                onChange={multiple ? onChange : undefined}
              />
            </div>
          )}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
}

export default memo(TreeSelect);
