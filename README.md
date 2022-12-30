# tailwindcss-select

## How to Use

Step 1.
```bash
npm i @tailwind-rc/select
```

Step 2.

Add to `tailwind.config.cjs`
```diff
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
+   "./node_modules/@tailwind-rc/**/*.{js,ts,jsx,tsx}",
],
```

Step 3.
```jsx
import { 
  Select, 
  SearchSelect, 
  Combobox, 
  Autocomplete, 
  TreeSelect,
} from "@tailwind-rc/select";

```

## Use with React Router

```bash
npm i react-router-dom
```

```jsx
import { 
  RouteSelect,
  RouteSearchSelect,
  RouteCombobox,
  RouteAutocomplete,
  RouteTreeSelect,
} from "@tailwind-rc/select/route";

```
