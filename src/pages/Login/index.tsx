import { Button, Container, Form, Group, Input, Label } from "./styles";

const Login: React.FC = () => {
  return (
    <Container>
      <Form>
        <h1>Entrar</h1>

        <Group>
          <Label htmlFor=""> Endereço de e-mail </Label>
          <Input type="text" placeholder="Digite seu e-email" required />
        </Group>

        <Group>
          <Label htmlFor=""> Sua senha secreta </Label>
          <Input type="password" placeholder="Digite sua senha" required />
        </Group>

        <Button>Fazer login</Button>
      </Form>
    </Container>
  );
};

export default Login;
