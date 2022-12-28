import { useState } from "react";
import Select from "../../src/index";
import SearchSelect from "../../src/searchSelect";
import Autocomplete from "../../src/autocomplete";
import RouteAutocomplete from "../../src/route/autocomplete";
import TreeSelect from "../../src/treeSelect";
import { Option, TreeNode } from "../../src/types";

const options: Option[] = [
  { label: "Wade Cooper", value: "1" },
  { label: "Arlene Mccoy", value: "2" },
  { label: "Devon Webb", value: "3" },
  { label: "Tom Cook", value: "4" },
  { label: "Tanya Fox", value: "5" },
  { label: "Hellen Schmidt", value: "6" },
];

const treeData: TreeNode[] = [
  { label: "Wade Cooper", value: "1" },
  { label: "Arlene Mccoy", value: "2" },
  {
    label: "Devon Webb",
    children: [
      { label: "Tom Cook", value: "4" },
      { label: "Tanya Fox", value: "5" },
    ],
  },
  { label: "Hellen Schmidt", value: "6" },
];

function App() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [selectedOption2, setSelectedOption2] = useState<Option | null>(null);
  const [selectedOptions2, setSelectedOptions2] = useState<Option[]>([]);
  const [selectedOption3, setSelectedOption3] = useState<Option | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOptions4, setSelectedOptions4] = useState<Option[]>([]);
  const [selectedOption4, setSelectedOption4] = useState<Option | null>(null);
  return (
    <div className="p-10 grid grid-cols-2 gap-4">
      <Select
        selectedOption={selectedOption}
        options={options}
        onChange={(value) => {
          console.log(value);
          setSelectedOption(value);
        }}
        placeholder="Search by..."
      />
      <Select
        selectedOptions={selectedOptions}
        options={options}
        onChange={(value) => {
          console.log(value);
          setSelectedOptions(value);
        }}
        multiple
      />
      <SearchSelect
        selectedOption={selectedOption2}
        options={options}
        onChange={(value) => {
          console.log(value);
          setSelectedOption2(value);
        }}
        placeholder="Search by..."
        filter
      />
      <SearchSelect
        selectedOptions={selectedOptions2}
        options={options}
        onChange={(value) => {
          console.log(value);
          setSelectedOptions2(value);
        }}
        multiple
      />

      <TreeSelect
        selectedOption={selectedOption4}
        treeData={treeData}
        onChange={(value) => {
          console.log(value);
          setSelectedOption4(value);
        }}
        placeholder="Search by..."
      />
      <TreeSelect
        selectedOptions={selectedOptions4}
        treeData={treeData}
        onChange={(value) => {
          console.log(value);
          setSelectedOptions4(value);
        }}
        multiple
      />
      <Autocomplete
        searchQuery={searchQuery}
        onSearch={(value) => {
          setSearchQuery(value);
        }}
        selectedOption={selectedOption3}
        options={options}
        onChange={(value) => {
          console.log(value);
          setSelectedOption3(value);
        }}
        placeholder="Search by..."
        // resetButton={false}
        filter
      />
      <RouteAutocomplete
        defaultValue="2"
        searchQuery={searchQuery}
        onSearch={(value) => {
          setSearchQuery(value);
        }}
        // selectedOption={selectedOption3}
        options={options}
        // onChange={(value) => {
        //   console.log(value);
        //   setSelectedOption3(value);
        // }}
        // placeholder="Search by..."
        // resetButton={false}
        filterName="teat1"
      />
    </div>
  );
}

export default App;
