import { ThumbsUp, ChatCircleText } from "phosphor-react";

import { DiffToString } from "../../utils/date";

import AvatarSquare from "../AvatarSquare";
import Comment from "../Comment";
import InputArea from "../InputArea";
import Button from "../Button";
import { FormEvent, useCallback, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

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
import { createComment } from "../../services/comments";
import { toast } from "react-toastify";
import { IComment } from "../../services/comments/types";

interface PostProps {
  authorId: string;
  authorAvatar: string | null;
  authorName: string;
  authorEmail: string;
  publishedAt: string;
  postId: string;
  content: string;
  tags: string | null;
  comments: IComment[];
  reactions: any[];
  onCreateComment: () => void;
}

const Post: React.FC<PostProps> = ({
  authorId,
  authorAvatar,
  authorName,
  authorEmail,
  publishedAt,
  postId,
  content,
  tags,
  comments = [],
  reactions = [],
  onCreateComment,
}) => {
  const [commentArea, setCommentArea] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const handleCreateComment = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        const { result, message } = await createComment({
          postId,
          content: commentContent,
        });

        if (result === "success") {
          setCommentContent("");
          onCreateComment();
          toast.success(message);
        }

        if (result === "error") {
          toast.error(message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [commentContent, postId, onCreateComment],
  );

  function toggleCommentArea() {
    setCommentArea(!commentArea);
  }

  const navigate = useNavigate();

  function handleMe() {
    navigate(`/me/${authorId}`);
  }

  return (
    <Container>
      <Header>
        <Author>
          <AvatarSquare
            onClick={handleMe}
            src={authorAvatar || "https://i.imgur.com/HYrZqHy.jpg"}
            borderEffect
          />

          <AuthorInfo>
            <h1 onClick={handleMe}>{authorName}</h1>
            <p>{authorEmail}</p>
          </AuthorInfo>
        </Author>

        <time>
          Publicado há {DiffToString(moment().diff(publishedAt, "seconds"))}
        </time>
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
        <CommentForm onSubmit={handleCreateComment}>
          <h1>Deixe seu comentário</h1>

          <InputArea
            name="commentContent"
            value={commentContent}
            rows={3}
            placeholder="Escreva seu comentário aqui ..."
            required
            onChange={(e) => {
              setCommentContent(e.target.value);
            }}
          />

          <Button>Comentar</Button>
        </CommentForm>

        <Divider />

        <Comments>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              postAuhtorId={authorId}
              content={comment.content}
              commentedAt={comment.commentedAt}
              authorName={comment.user.name}
              authorAvatar={comment.user.avatarUrl}
              authorId={comment.user.id}
              commentId={comment.id}
              reactions={comment.reactions}
            />
          ))}
        </Comments>
      </CommentArea>
    </Container>
  );
};

export default Post;
