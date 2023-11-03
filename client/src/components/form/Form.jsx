import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import Tabs from "../tabs/Tabs";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./Form.css";

const FormContainer = styled.div`
min-width: 400px;
  background-color: var(--bg-white-color);
  padding: 20px;
  border-radius: 0.3rem;
`;

const RegisterContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
`;

const ErrorsDisplay = styled.div`
  display: block;
  color: tomato;
  font-size: x-small;
`;

export default function Form() {
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
    reset,
  } = useForm();


  const onSubmit = handleSubmit((data) => {
    // event.preventDefault()
    console.log(data);
    alert("enviando datos...");
    reset();
  });

  //personal profile as a default
  const [accountType, setAccountType] = useState("personal");

  return (
    // <FormContainer>
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <Input type="text" label="Nombre completo" />
    //     <Input type="text" label="Usuario" />
    //     <Input type="text" label="Email" />
    //     <Input type="password" label="Contraseña" name="password" />
    //     <Input
    //       type="password"
    //       label="Confirmar contraseña"
    //       name="confirm_password"
    //     />
    //     <Tabs setAccountType={setAccountType} accountType={accountType} />
    //     {accountType === "profesional" && (
    //       <>
    //         <Input type="text" label="Localización" />
    //         <Input type="text" label="Código postal" />
    //       </>
    //     )}
    //     <Button type="submit" width="large">
    //       Enviar
    //     </Button>
    //   </form>
    //   <RegisterContainer>
    //     <p>¿Ya tienes cuenta?</p>
    //     <Link to='/#'>Inicia sesión</Link>
    //   </RegisterContainer>
    // </FormContainer>

    <FormContainer>
      <h3>Crea tu perfil</h3>
      <form onSubmit={onSubmit}>
        {/* Nombre */}
        <div className="input-container">
          <input
            type="text"
            label="Nombre"
            name="nombre"
            {...register("nombre", {
              required: {
                value: true,
                message: "Nombre es requerido",
              },
              minLength: {
                value: 2,
                message: "Nombre tiene que tener dos caracteres",
              },
              maxLength: {
                value: 20,
                message: "Nombre no puede tener más de 20 caracteres",
              },
            })}
          />
          <label htmlFor="nombre">Nombre completo</label>
        </div>
        <ErrorsDisplay>
          {errors.nombre && <span>{errors.nombre.message}</span>}
        </ErrorsDisplay>

        {/* username */}
        <div className="input-container">
          <input
            type="text"
            label="usuario"
            name="usuario"
            {...register("usuario", {
              required: {
                value: true,
                message: "Usuario es requerido",
              },
              minLength: {
                value: 2,
                message: "Usuario tiene que tener dos caracteres",
              },
              maxLength: {
                value: 20,
                message: "Usuario no puede tener más de 20 caracteres",
              },
            })}
          />
          <label htmlFor="usuario">Usuario</label>
        </div>
        <ErrorsDisplay>
          {errors.usuario && <span>{errors.usuario.message}</span>}
        </ErrorsDisplay>

        {/* password */}
        <div className="input-container">
          <input
            type="text"
            label="Contraseña"
            name="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password es requerido",
              },
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          <label htmlFor="contraseña">Contraseña</label>
        </div>
        <ErrorsDisplay>
          {errors.password && <span>{errors.password.message}</span>}
        </ErrorsDisplay>

        {/* Confirm password */}
        <div className="input-container">
          <input
            type="text"
            label="Confirmar contraseña"
            name="confirm_password"
            {...register("confirm_password", {
              required: {
                value: true,
                message: "Confirmar contraseña es requerido",
              },
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            })}
          />
          <label htmlFor="confirm_contraseña">Confirmar contraseña</label>
        </div>
        <ErrorsDisplay>
          {errors.confirm_password && (
            <span>{errors.confirm_password.message}</span>
          )}
        </ErrorsDisplay>

        <Button type="submit" width="large">Enviar</Button>
      </form>
      <RegisterContainer>
        <p>¿Ya tienes cuenta?</p>
        <Link to="/#">Inicia sesión</Link>
      </RegisterContainer>
    </FormContainer>
  );
}
