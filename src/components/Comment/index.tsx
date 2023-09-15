import { Trash, ThumbsUp } from "phosphor-react";

import AvatarSquare from "../AvatarSquare";
import {
  AuthorAndTime,
  ButtonDelete,
  CommentBox,
  Container,
  InputArea,
  Interactions,
} from "./styles";
import { DiffToString } from "../../utils/date";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { useState, useCallback } from "react";

import { useAuthentication } from "../../contexts/AuthContext";
import { createReaction, deleteReaction } from "../../services/reactions";
import { toast } from "react-toastify";
import { IReaction } from "../../services/reactions/types";

interface CommentProps {
  postAuhtorId: string;
  authorId: string;
  authorAvatar: string | null;
  authorName: string;
  commentedAt: string;
  commentId: string;
  content: string;
  reactions: IReaction[];
  onDelete(id: string): void;
}

const Comment: React.FC<CommentProps> = ({
  postAuhtorId,
  authorId,
  authorAvatar,
  authorName,
  commentedAt,
  content,
  commentId,
  reactions = [],
  onDelete,
}) => {
  const navigate = useNavigate();
  const { user } = useAuthentication();

  const [commentReactions, setCommentReactions] = useState(reactions);

  const [userReacted, setUserReacted] = useState(
    commentReactions.some((reaction) => reaction.user.id === user?.id),
  );

  const handleCreateReactions = useCallback(async () => {
    try {
      const { result, data } = await createReaction({
        commentId,
        entityType: 1,
      });

      if (result === "success") {
        if (data) {
          setCommentReactions((prevState) => {
            const commentReactions = [...prevState];

            commentReactions.unshift(data);

            return commentReactions;
          });

          setUserReacted(true);
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [commentId]);

  const handleDeleteReactions = useCallback(async (reactionId: string) => {
    try {
      const { result } = await deleteReaction({
        reactionId,
      });

      if (result === "success") {
        setCommentReactions((prevState) =>
          prevState.filter((reaction) => reaction.id !== reactionId),
        );
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, []);

  function toggleReaction() {
    if (userReacted) {
      const reaction = commentReactions.find(
        (reaction) => reaction.user.id === user?.id,
      );

      if (reaction) {
        handleDeleteReactions(reaction.id);

        setUserReacted(false);
      }

      return;
    }

    handleCreateReactions();
    setUserReacted(true);
  }

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
        <InputArea>
          <AuthorAndTime>
            <h1 onClick={handleMe}>{authorName}</h1>
            <time>
              Cerca de {DiffToString(moment().diff(commentedAt, "seconds"))}
            </time>

            {(user && user.id === authorId) ||
            (user && user.id === postAuhtorId) ? (
              <ButtonDelete onClick={() => onDelete(commentId)}>
                <Trash size={22} />
              </ButtonDelete>
            ) : null}
          </AuthorAndTime>

          <p>{content}</p>
        </InputArea>

        <Interactions>
          <ThumbsUp
            onClick={toggleReaction}
            size={18}
            weight={userReacted ? "fill" : "regular"}
          />
          <span>•</span>
          <span>{commentReactions.length}</span>
        </Interactions>
      </CommentBox>
    </Container>
  );
};

export default Comment;
