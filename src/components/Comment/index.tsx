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

import { useState, useCallback } from "react";

import { createReaction, deleteReaction } from "../../services/reactions";
import { toast } from "react-toastify";
import { IReaction } from "../../services/reactions/types";
import { useAuthentication } from "../../contexts/AuthContext";
import Modal from "../Modal";
import ReactionList from "../ReactionList";

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
  const { user, me } = useAuthentication();

  const [commentReactions, setCommentReactions] = useState(reactions);

  const [userReacted, setUserReacted] = useState(
    commentReactions.some((reaction) => reaction.user.id === user?.id),
  );

  const [modalReactions, setModalReactions] = useState(false);

  const handleCreateReactions = useCallback(async () => {
    try {
      const { result, data } = await createReaction({
        commentId,
        entityType: 1,
      });

      if (result === "success") {
        if (data) {
          console.log(data);

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

  function toggleModalReactions() {
    setModalReactions(!modalReactions);
  }

  return (
    <Container>
      <AvatarSquare onClick={() => me(authorId)} avatar={authorAvatar} />

      <CommentBox>
        <InputArea>
          <AuthorAndTime>
            <h1 onClick={() => me(authorId)}>{authorName}</h1>
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
            size={18}
            onClick={toggleReaction}
            weight={userReacted ? "fill" : "regular"}
          />
          <span> • </span>
          <span onClick={toggleModalReactions}> {commentReactions.length}</span>
        </Interactions>
      </CommentBox>

      <Modal isOpen={modalReactions} onclose={toggleModalReactions}>
        <ReactionList data={commentReactions} />
      </Modal>
    </Container>
  );
};

export default Comment;
