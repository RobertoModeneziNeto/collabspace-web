import { useState, useCallback, FormEvent } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { createUser } from "../../services/Users";
import { useAuthentication } from "../../contexts/AuthContext";

import { Spiner } from "../../assets/sources";

import {
  Container,
  Form,
  ErrorAlert,
  Group,
  Label,
  Input,
  AreaEmail,
  AreaPassword,
  Button,
  PasswordMeter,
  LinkLogin,
} from "./styles";

const Register: React.FC = () => {
  const { handleLoggedEmail } = useAuthentication();
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState<boolean>(false);

  const areaEmail = !name || !birthDate;
  const areaPassword = !email || !confirmEmail || areaEmail;
  const isTheSameEmails = email === confirmEmail;
  const isEmail = email.match(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  );
  const isTheSamePasswords = password === confirmPassword;
  const isPasswordStrong = password.match(
    /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  );

  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      setLoading(true);

      try {
        const { result, message, data } = await createUser({
          name,
          email,
          confirmEmail,
          password,
          confirmPassword,
          birthDate,
        });

        if (result === "success") {
          if (data) {
            handleLoggedEmail(data.email);
          }
          toast.success(message);
          handleLogin();
        }

        if (result === "error") toast.error(message);

        setLoading(false);
      } catch (error: any) {
        toast.error(error.message);
        setLoading(false);
      }
    },
    [
      birthDate,
      confirmEmail,
      confirmPassword,
      email,
      name,
      password,
      handleLogin,
      handleLoggedEmail,
    ],
  );

  return (
    <Container>
      <Form onSubmit={handleSubmit} autoComplete="on">
        <h1>Cadastre-se</h1>

        {email && !isEmail && <ErrorAlert>o e-mail não é valido!</ErrorAlert>}
        {confirmEmail && !isTheSameEmails && (
          <ErrorAlert>Os e-mails não coincidem!</ErrorAlert>
        )}
        {confirmPassword && !isTheSamePasswords && (
          <ErrorAlert>As senhas não coincidem!</ErrorAlert>
        )}

        <Group>
          <Label htmlFor="name">Nome</Label>

          <Input
            type="text"
            id="name"
            placeholder="Seu nome completo"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Group>

        <Group>
          <Label htmlFor="birthdate">Data de nascimento</Label>

          <Input
            type="date"
            id="birthdate"
            value={birthDate}
            min="1900-01-01"
            max="2022-12-31"
            required
            onChange={(e) => {
              setBirthDate(e.target.value);
            }}
          />
        </Group>

        <AreaEmail $areaEmail={areaEmail}>
          <Label htmlFor="email">Endereço de e-mail</Label>

          <Input
            type="text"
            id="email"
            placeholder="Seu e-mail"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <Input
            type="text"
            id="confirmarEmail"
            placeholder="Confirmar e-mail"
            required
            value={confirmEmail}
            onChange={(e) => {
              setConfirmEmail(e.target.value);
            }}
            onPaste={(e) => {
              e.preventDefault();
            }}
          />
        </AreaEmail>

        <AreaPassword
          $areaPassword={areaPassword || !isTheSameEmails || !isEmail}
        >
          <Label htmlFor="password">Sua senha secreta</Label>

          <Input
            type="password"
            id="password"
            placeholder="Sua senha"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          {password && <PasswordMeter $isWeak={!isPasswordStrong} />}

          <Input
            type="password"
            id="confirmPassword"
            placeholder="Confirmar senha"
            required
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            onPaste={(e) => {
              e.preventDefault();
            }}
          />
        </AreaPassword>

        <Button
          disabled={
            areaEmail ||
            areaPassword ||
            !isTheSameEmails ||
            !isEmail ||
            !isTheSamePasswords ||
            !isPasswordStrong
          }
        >
          {loading ? <Spiner /> : "Cadastrar-se"}
        </Button>

        <LinkLogin>
          <p>Já tem conta?</p>
          <a onClick={handleLogin}>Entrar agora</a>
        </LinkLogin>
      </Form>
    </Container>
  );
};

export default Register;
