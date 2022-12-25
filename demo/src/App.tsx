import { useState } from "react";
import Select from "../../src/index";
import SearchSelect from "../../src/selectSelect";
import Autocomplete from "../../src/autocomplete";
import { Option } from "../../src/common/types";

const options: Option[] = [
  { label: "Wade Cooper", value: "1" },
  { label: "Arlene Mccoy", value: "2" },
  { label: "Devon Webb", value: "3" },
  { label: "Tom Cook", value: "4" },
  { label: "Tanya Fox", value: "5" },
  { label: "Hellen Schmidt", value: "6" },
];

function App() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [selectedOption2, setSelectedOption2] = useState<Option | null>(null);
  const [selectedOptions2, setSelectedOptions2] = useState<Option[]>([]);
  const [selectedOption3, setSelectedOption3] = useState<Option | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
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
    </div>
  );
}

export default App;
