import axios from 'axios';
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { userSchema, type UserFormData } from "../../schemas/userSchema";
import eyeIcon from "../../assets/eye-icon.png";
import { useNavigate } from "react-router-dom";

async function login(data: UserFormData) {
  try {
    const response = await axios.post('http://localhost:3333/auth/login', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Erro desconhecido no servidor.');
    }
    throw new Error('Não foi possível conectar ao servidor.');
  }
}

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  async function handleLogin(data: UserFormData) {
    try {
      const response = await login(data);
      console.log("Login bem sucedido!", response);

      reset();
      navigate("/");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Informações inválidas";
      setError("root", {
        message: message,
      });
    }
  }

  const handleCadastro = () => {
    navigate("/cadastro");
  };


  return (
    <div className={styles.background}>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className={styles.cardContainer}
        noValidate
      >
        <h1>Login</h1>
        <h2>
          Faça login para ter acesso aos
          <br />
          pijamas dos seus sonhos!
        </h2>

        <div className={styles.inputs}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Usuario ou E-mail"
              className={styles.inputField}
              {...register("identifier")}
            />
            {errors.identifier && (
              <span className={styles.errorMessage}>
                {errors.identifier.message}
              </span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.passwordInputContainer}>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Senha"
                className={styles.inputField}
                {...register("password")}
              />
              <button
                type="button"
                className={styles.passwordToggleButton}
                onClick={togglePasswordVisibility}
              >
                <img src={eyeIcon} alt="Mostrar/Ocultar senha" />
              </button>
            </div>
            {errors.password && (
              <span className={styles.errorMessage}>
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <div className={styles.forgotPassword}>
          <button type="button">Esqueci minha senha</button>
        </div>

        {errors.root && (
          <span className={styles.rootErrorMessage}>{errors.root.message}</span>
        )}

        <div className={styles.btnLogin}>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "ENTRAR"}
          </button>
        </div>

        <hr className={styles.line} />

        <div className={styles.btnRegister}>
          <button type="button" onClick={handleCadastro}>CADASTRE-SE</button>
        </div>
      </form>
    </div>
  );
}
