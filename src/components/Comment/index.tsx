import { Trash } from "phosphor-react";

import AvatarSquare from "../AvatarSquare";
import { AuthorAndTime, ButtonDelete, CommentBox, Container } from "./styles";
import { DiffToString } from "../../utils/date";
import moment from "moment";
import { useNavigate } from "react-router-dom";

interface CommentProps {
  authorId: string;
  authorAvatar: string | null;
  authorName: string;
  commentedAt: string;
  commentId: string;
  content: string;
  reactions: any[];
}

const Comment: React.FC<CommentProps> = ({
  authorId,
  authorAvatar,
  authorName,
  commentedAt,
  content,
  commentId,
  reactions = [],
}) => {
  const navigate = useNavigate();

  function handleMe() {
    navigate(`/me/${authorId}`);
  }
  return (
    <Container>
      <AvatarSquare
        onClick={handleMe}
        src={authorAvatar || "https://i.imgur.com/HYrZqHy.jpg"}
      />

      <CommentBox>
        <AuthorAndTime>
          <h1 onClick={handleMe}>{authorName}</h1>
          <time>
            Cerca de {DiffToString(moment().diff(commentedAt, "seconds"))}
          </time>
          <ButtonDelete>
            <Trash size={22} />
          </ButtonDelete>
        </AuthorAndTime>

        <p>{content}</p>
      </CommentBox>
    </Container>
  );
};

export default Comment;
