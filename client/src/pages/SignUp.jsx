import React, { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export default function SignUp() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <>
      <h3>Crea tu perfil</h3>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Name"
            value={name}
            name="name"
            error={error}
            onChange={handleNameChange}
            placeholder="Nombre completo"
          ></Input>
          <Input
            type="text"
            label="Name"
            value={name}
            name="name"
            error={error}
            onChange={handleNameChange}
            placeholder="Usuario"
          ></Input>
          <Input
            type="text"
            label="Name"
            value={name}
            name="name"
            error={error}
            onChange={handleNameChange}
            placeholder="Email"
          ></Input>
          <Input
            type="password"
            label="Name"
            value={name}
            name="name"
            error={error}
            onChange={handleNameChange}
            placeholder="Contraseña"
          ></Input>
          <Input
            type="password"
            label="Name"
            value={name}
            name="name"
            error={error}
            onChange={handleNameChange}
            placeholder="Confirmar contraseña"
          ></Input>
          <Button type="button" color="light-color" variant="light">
            Personal
          </Button>
          <Button type="button" color="light-color" variant="light">
            Profesional
          </Button>
          <Button type="submit" color="light-color" variant="light">
            Enviar
          </Button>
        </form>
      </div>
    </>
  );
}
