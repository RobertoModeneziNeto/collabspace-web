import { useState, useCallback, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ThumbsUp, ChatCircleText } from "phosphor-react";
import { toast } from "react-toastify";
import moment from "moment";

import { DiffToString } from "../../utils/date";

import { useAuthentication } from "../../contexts/AuthContext";

import { createComment, deleteComment } from "../../services/comments";
import { createReaction, deleteReaction } from "../../services/reactions";
import { IComment } from "../../services/comments/types";
import { IReaction } from "../../services/reactions/types";

import AvatarSquare from "../AvatarSquare";
import Comment from "../Comment";
import InputArea from "../InputArea";
import Button from "../Button";

import {
  Container,
  Header,
  Author,
  AuthorInfo,
  Content,
  Description,
  Hastags,
  Divider,
  Interactions,
  InteractionsInfo,
  CountReaction,
  CountComment,
  InteractionsAction,
  ButtonAction,
  CommentArea,
  CommentForm,
  Comments,
} from "./styles";

interface PostProps {
  authorId: string;
  authorAvatar: string | null;
  authorName: string;
  authorEmail: string;
  postId: string;
  content: string;
  tags: string | null;
  comments: IComment[];
  reactions: IReaction[];
  publishedAt: string;
}

const Post: React.FC<PostProps> = ({
  authorId,
  authorAvatar,
  authorName,
  authorEmail,
  postId,
  content,
  tags,
  comments = [],
  reactions = [],
  publishedAt,
}) => {
  const navigate = useNavigate();
  const { user } = useAuthentication();

  const [postComments, setPostComments] = useState(comments);
  const [postReactions, setPostReactions] = useState(reactions);

  const [commentArea, setCommentArea] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const [userReacted, setUserReacted] = useState(
    postReactions.some((reaction) => reaction.user.id === user?.id),
  );

  const handleCreateComment = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        const { result, message, data } = await createComment({
          postId,
          content: commentContent,
        });

        if (result === "success") {
          if (data) {
            setCommentContent("");

            setPostComments((prevState) => {
              const postComments = [...prevState];

              postComments.unshift(data);

              return postComments;
            });

            toast.success(message);
          }
        }

        if (result === "error") {
          toast.error(message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [postId, commentContent],
  );

  const handleDeleteComment = useCallback(
    async (commentId: string) => {
      try {
        const { result } = await deleteComment({ commentId, postId });

        if (result === "success") {
          setPostComments((prevState) =>
            prevState.filter((comment) => comment.id !== commentId),
          );
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [postId],
  );

  const handleCreateReaction = useCallback(async () => {
    try {
      const { result, data } = await createReaction({
        postId,
        entityType: 1,
      });

      if (result === "success") {
        if (data) {
          setPostReactions((prevState) => {
            const postReactions = [...prevState];

            postReactions.unshift(data);

            return postReactions;
          });
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [postId]);

  const handleDeleteReaction = useCallback(async (reactionId: string) => {
    try {
      const { result } = await deleteReaction({ reactionId });

      if (result === "success") {
        setPostReactions((prevState) =>
          prevState.filter((reaction) => reaction.id !== reactionId),
        );
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, []);

  function toggleReaction() {
    if (userReacted) {
      const reaction = postReactions.find(
        (reaction) => reaction.user.id === user?.id,
      );

      if (reaction) {
        handleDeleteReaction(reaction.id);

        setUserReacted(false);
      }

      return;
    }

    handleCreateReaction();
    setUserReacted(true);
  }

  function toggleCommentArea() {
    setCommentArea(!commentArea);
  }

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
              <ThumbsUp size={19} weight={userReacted ? "fill" : "bold"} />

              {postReactions.length}
            </span>
          </CountReaction>

          <CountComment>
            <span onClick={toggleCommentArea}>
              {postComments.length} comentários
            </span>
          </CountComment>
        </InteractionsInfo>

        <InteractionsAction>
          <ButtonAction onClick={toggleReaction}>
            <ThumbsUp size={22} weight={userReacted ? "fill" : "regular"} />
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
            onChange={(e) => setCommentContent(e.target.value)}
          />

          <Button>Comentar</Button>
        </CommentForm>

        <Divider />

        <Comments>
          {postComments.map((comment) => (
            <Comment
              key={comment.id}
              postAuhtorId={authorId}
              authorId={comment.user.id}
              authorAvatar={comment.user.avatarUrl}
              authorName={comment.user.name}
              commentId={comment.id}
              content={comment.content}
              reactions={comment.reactions}
              commentedAt={comment.commentedAt}
              onDelete={handleDeleteComment}
            />
          ))}
        </Comments>
      </CommentArea>
    </Container>
  );
};

export default Post;
