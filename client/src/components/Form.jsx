import React, { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Input } from "./Input";
import { Button } from "./Button";

export default function Form() {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  const accountOptions = [
    { value: "personal", label: "Personal" },
    { value: "professional", label: "Profesional" },
  ];

  const [accountType, setAccountType] = useState("personal"); // Por defecto, "personal" seleccionado

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{ required: "Nombre es obligatorio" }}
        render={({ field }) => (
          <Input
            type="text"
            label="Nombre"
            value={field.value}
            onChange={field.onChange}
            placeholder="Nombre completo"
          />
        )}
      />
      <Controller
        name="username"
        control={control}
        defaultValue=""
        rules={{ required: "Usuario es obligatorio" }}
        render={({ field }) => (
          <Input
            type="text"
            label="Usuario"
            value={field.value}
            onChange={field.onChange}
            placeholder="Usuario"
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{ required: "Email es obligatorio" }}
        render={({ field }) => (
          <Input
            type="text"
            label="Email"
            value={field.value}
            onChange={field.onChange}
            placeholder="Email"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{ required: "Contraseña es obligatoria" }}
        render={({ field }) => (
          <Input
            type="password"
            label="Contraseña"
            value={field.value}
            onChange={field.onChange}
            placeholder="Contraseña"
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        rules={{
          required: "Confirmar contraseña es obligatorio",
          validate: (value) =>
            value === control.getValues().password ||
            "Las contraseñas no coinciden",
        }}
        render={({ field }) => (
          <Input
            type="password"
            label="Confirmar contraseña"
            value={field.value}
            onChange={field.onChange}
            placeholder="Confirmar contraseña"
          />
        )}
      />
      <div>
        <Select
          options={accountOptions}
          value={accountOptions.find((option) => option.value === accountType)}
          onChange={(selectedOption) => setAccountType(selectedOption.value)}
          placeholder="Selecciona un tipo de cuenta"
        />
      </div>
      {accountType === "professional" && (
        <>
          <Controller
            name="location"
            control={control}
            defaultValue=""
            rules={{ required: "Localización es obligatoria" }}
            render={({ field }) => (
              <Input
                type="text"
                label="Localización"
                value={field.value}
                onChange={field.onChange}
                placeholder="Localización"
              />
            )}
          />
          <Controller
            name="postalCode"
            control={control}
            defaultValue=""
            rules={{ required: "Código postal es obligatorio" }}
            render={({ field }) => (
              <Input
                type="text"
                label="Código postal"
                value={field.value}
                onChange={field.onChange}
                placeholder="Código postal"
              />
            )}
          />
        </>
      )}
      <Button type="submit">Enviar</Button>
    </form>
  );
}
