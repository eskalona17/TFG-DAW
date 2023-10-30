import React, { useState } from "react";
import Form from "./../components/Form";

export default function SignUp() {
  const [isProfessional, setIsProfessional] = useState(false);

  return (
    <>
      <h3>Crea tu perfil</h3>
      <div className="form">
        <Form isProfessional={isProfessional} />
      </div>
    </>
  );
}
