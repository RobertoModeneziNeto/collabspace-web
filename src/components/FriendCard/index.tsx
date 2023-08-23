import { Avatar, Container, Info } from "./styles";

const FriendCard: React.FC = () => {
  return (
    <Container>
      <Avatar src="https://cdn.discordapp.com/attachments/1013116744946171915/1143688020361490432/image.png" />

      <Info>
        <h1>Paulo Junior</h1>
        <p>8 amigos em comum</p>
      </Info>
    </Container>
  );
};

export default FriendCard;
