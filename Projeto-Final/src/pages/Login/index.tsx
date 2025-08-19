import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { userSchema, type UserFormData } from "../../schemas/userSchema";
import { authService } from "../../services/authService";
import eyeIcon from "../../assets/eye-icon.png";

export default function Login() {
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
      const response = await authService.login(data);
      console.log("Login bem-sucedido!", response);
      reset();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Credenciais inválidas.";
      setError("root", {
        message: message,
      });
    }
  }

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
              {...register("userOrEmail")}
            />
            {errors.userOrEmail && (
              <span className={styles.errorMessage}>
                {errors.userOrEmail.message}
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
          <button type="button">CADASTRE-SE</button>
        </div>
      </form>
    </div>
  );
}
