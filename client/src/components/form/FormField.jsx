import { Controller } from "react-hook-form";
import { Input } from "../input/Input";

export const FormField = ({ name, control, defaultValue, rules, render }) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    rules={rules}
    render={({ field }) => render(field)}
  />
);