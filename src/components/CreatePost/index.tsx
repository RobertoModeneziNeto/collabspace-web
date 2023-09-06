import { useState, useCallback, FormEvent } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import AvatarSquare from "../AvatarSquare";
import Button from "../Button";
import InputArea from "../InputArea";
import { Container, Form } from "./styles";

import { useAuthentication } from "../../contexts/AuthContext";
import { createPost } from "../../services/posts";

interface CreatePostProps {
  onCreatePost: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onCreatePost }) => {
  const navigate = useNavigate();
  const { user } = useAuthentication();

  const [content, setContent] = useState<string>("");

  const handleCreatePost = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        const { result, message } = await createPost({ content });

        if (result === "success") {
          setContent("");
          onCreatePost();
          toast.success(message);
        }
        if (result === "error") toast.error(message);
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [content, onCreatePost],
  );

  const handleMe = () => {
    if (user) navigate(`/me/${user.id}`);
  };

  return (
    <Container>
      <AvatarSquare
        onClick={handleMe}
        src={user?.avatarUrl || "https://i.imgur.com/HYrZqHy.jpg"}
        borderEffect
      />
      <Form onSubmit={handleCreatePost}>
        <InputArea
          name="content"
          value={content}
          rows={2}
          placeholder="O que temos pra hoje?"
          required
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <Button>Publicar</Button>
      </Form>
    </Container>
  );
};

export default CreatePost;
