import { useAuthentication } from "../../contexts/AuthContext";
import { IReaction } from "../../services/reactions/types";
import AvatarCircle from "../AvatarCircle";
import {
  AuthorInfo,
  Container,
  Navbar,
  NoReaction,
  Reaction,
  Reactions,
  Title,
} from "./styles";

interface ReactionListProps {
  data: IReaction[];
}

const ReactionList: React.FC<ReactionListProps> = ({ data }) => {
  const { me } = useAuthentication();

  return (
    <Container>
      <Title>Reações</Title>
      <Navbar>Todas {data.length} </Navbar>

      <Reactions>
        {data.length ? (
          data.map((reaction) => (
            <Reaction key={reaction.id}>
              <AvatarCircle
                size="56px"
                avatar={reaction.user.avatarUrl}
                onClick={() => me(reaction.user.id)}
              />

              <AuthorInfo onClick={() => me(reaction.user.id)}>
                <h1>{reaction.user.name}</h1>
                <p>{reaction.user.email}</p>
              </AuthorInfo>
            </Reaction>
          ))
        ) : (
          <NoReaction>Ninguém reagiu a isto!</NoReaction>
        )}
      </Reactions>
    </Container>
  );
};

export default ReactionList;
