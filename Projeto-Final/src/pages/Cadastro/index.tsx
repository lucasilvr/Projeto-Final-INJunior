import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import {
  createUserSchema,
  type createUser,
} from "../../schemas/createUserSchema";

export default function Cadastro() {
  const [modalAberto, setModalAberto] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<createUser>({
    resolver: zodResolver(createUserSchema),
  });

  async function createUser(data: createUser) {
    try {
      const response = await axios.post("http://localhost:3333/users", data);
      console.log("Resposta do servidor:", response.data);
      reset();
      setModalAberto(true);
    } catch (error) {
      let errorMessage = "Erro ao criar usuário";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }

      setError("root", { message: errorMessage });
    }
  }
  return (
    <>
      <div className={styles.background}>
        <form
          onSubmit={handleSubmit(createUser)}
          className={styles.cardContainer}
        >
          <h1>Registre-se</h1>

          <div className={styles.inputs}>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="Nome" {...register("name")} />
              {errors.name && (
                <span className={styles.errorMessage}>
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Nome de Usuario"
                {...register("username")}
              />
              {errors.username && (
                <span className={styles.errorMessage}>
                  {errors.username.message}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input type="email" placeholder="E-mail" {...register("email")} />
              {errors.email && (
                <span className={styles.errorMessage}>
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Senha"
                {...register("password")}
              />
              {errors.password && (
                <span className={styles.errorMessage}>
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Confirmar senha"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <span className={styles.errorMessage}>
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={styles.btnRegister}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Carregando..." : "REGISTRAR"}
          </button>

          {errors.root && (
            <span className={styles.errorMessage}>{errors.root.message}</span>
          )}
        </form>
      </div>

      {modalAberto && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Cadastro Realizado!</h2>
            <p>Seu registro foi concluído com sucesso.</p>
            <button onClick={() => setModalAberto(false)}>Fechar</button>
          </div>
        </div>
      )}
    </>
  );
}
