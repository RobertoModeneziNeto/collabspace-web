import { ThumbsUp, ChatCircleText } from "phosphor-react";

import AvatarSquare from "../AvatarSquare";
import Comment from "../Comment";
import InputArea from "../InputArea";
import Button from "../Button";

import {
  Author,
  AuthorInfo,
  Comments,
  Container,
  Content,
  Description,
  Divider,
  CommentForm,
  Interactions,
  InteractionsInfo,
  CountReaction,
  CountComment,
  InteractionsAction,
  ButtonAction,
  Hastags,
  Header,
  CommentArea,
} from "./styles";
import { useState } from "react";

interface PostProps {
  authorAvatar: string | null;
  authorName: string;
  authorEmail: string;
  publishedAt: string;
  content: string;
  tags: string | null;
  comments: any[];
  reactions: any[];
}

const Post: React.FC<PostProps> = ({
  authorAvatar,
  authorName,
  authorEmail,
  publishedAt,
  content,
  tags,
  comments = [],
  reactions = [],
}) => {
  const [commentArea, setCommentArea] = useState(false);

  function toggleCommentArea() {
    setCommentArea(!commentArea);
  }

  return (
    <Container>
      <Header>
        <Author>
          <AvatarSquare
            src={authorAvatar || "https://i.imgur.com/HYrZqHy.jpg"}
            borderEffect
          />

          <AuthorInfo>
            <h1>{authorName}</h1>
            <p>{authorEmail}</p>
          </AuthorInfo>
        </Author>

        <time>{publishedAt}</time>
      </Header>

      <Content>
        <Description>
          <p>{content}</p>
        </Description>
        <Hastags>
          <span>{tags}</span>
        </Hastags>
      </Content>

      <Interactions>
        <InteractionsInfo>
          <CountReaction>
            <span>
              <ThumbsUp size={19} weight="bold" />
              {reactions.length}
            </span>
          </CountReaction>

          <CountComment>
            <span onClick={toggleCommentArea}>
              {comments.length} comentários
            </span>
          </CountComment>
        </InteractionsInfo>

        <InteractionsAction>
          <ButtonAction>
            <ThumbsUp size={22} />
            Reagir
          </ButtonAction>

          <ButtonAction onClick={toggleCommentArea}>
            <ChatCircleText size={22} />
            Comentar
          </ButtonAction>
        </InteractionsAction>
      </Interactions>

      <CommentArea $commentArea={commentArea}>
        <CommentForm>
          <h1>Deixe seu comentário</h1>

          <InputArea placeholder="Escreva seu comentário aqui ..." rows={3} />

          <Button>Comentar</Button>
        </CommentForm>

        <Divider />

        <Comments>
          <Comment />
        </Comments>
      </CommentArea>
    </Container>
  );
};

export default Post;
