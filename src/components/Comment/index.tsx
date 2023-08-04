import { Trash } from "phosphor-react";

import Avatar from "../Avatar";
import { AuthorAndTime, CommentBox, Container } from "./styles";

const Comment: React.FC = () => {
  return (
    <Container>
      <Avatar />

      <CommentBox>
        <AuthorAndTime>
          <h1>Roberto Neto</h1>
          <time>Cerca de 2h</time>
          <button>
            <Trash size={22} />
          </button>
        </AuthorAndTime>

        <p>E esse Baseballbet bem astheric!! já tenho o meu veredito!</p>
      </CommentBox>
    </Container>
  );
};

export default Comment;
