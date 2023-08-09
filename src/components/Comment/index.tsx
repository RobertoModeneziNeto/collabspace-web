import { Trash } from "phosphor-react";

import Avatar from "../Avatar";
import { AuthorAndTime, ButtonDelete, CommentBox, Container } from "./styles";

const Comment: React.FC = () => {
  return (
    <Container>
      <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLxpmmwZWwQ0F1olKT3br8rWaliSaHNPvPDg&usqp=CAU" />

      <CommentBox>
        <AuthorAndTime>
          <h1>Rodrigo Goes</h1>
          <time>Cerca de 2h</time>
          <ButtonDelete>
            <Trash size={22} />
          </ButtonDelete>
        </AuthorAndTime>

        <p>
          Vamos analisar esse Baseballbet, me parece bem astheric!! já tenho o
          meu veredito!
        </p>
      </CommentBox>
    </Container>
  );
};

export default Comment;
