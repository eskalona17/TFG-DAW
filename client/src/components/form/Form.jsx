import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../input/Input";
import { Button } from "../Button";
import Tabs from "../tabs/Tabs";
import styled from "styled-components";

const FormContainer = styled.div`
  background-color: var(--bg-white-color);
  padding: 20px;
  border-radius: 0.3rem;
`;

export default function Form() {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data, event) => {
    event.preventDefault()
    console.log(data);
  };

  //personal profile as a default
  const [accountType, setAccountType] = useState("personal");

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: "Nombre es obligatorio" }}
          render={({ field }) => (
            <Input
              type="text"
              value={field.value}
              onChange={field.onChange}
              label="Nombre completo"
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
              value={field.value}
              onChange={field.onChange}
              label="Usuario"
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
              value={field.value}
              onChange={field.onChange}
              label="Email"
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
              value={field.value}
              onChange={field.onChange}
              label="Contraseña"
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
              value={field.value}
              onChange={field.onChange}
              label="Confirmar contraseña"
            />
          )}
        />
        <Tabs setAccountType={setAccountType} accountType={accountType} />

        {accountType === "profesional" && (
          <>
            <Controller
              name="location"
              control={control}
              defaultValue=""
              rules={{ required: "Localización es obligatoria" }}
              render={({ field }) => (
                <Input
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  label="Localización"
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
                  value={field.value}
                  onChange={field.onChange}
                  label="Código postal"
                />
              )}
            />
          </>
        )}

        <Button type="submit" width="large">
          Enviar
        </Button>
      </form>
    </FormContainer>
  );
}
