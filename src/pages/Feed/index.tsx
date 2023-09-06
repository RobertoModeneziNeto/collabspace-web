import { useState, useCallback, useEffect } from "react";

import { toast } from "react-toastify";

import LayoutDefault from "../../layouts/Default";

import CreatePost from "../../components/CreatePost";
import Post from "../../components/Post";
import ProfileCard from "../../components/ProfileCard";

import { Container, Posts } from "./styles";
import { IPost } from "../../services/posts/types";
import { listAllPosts } from "../../services/posts";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const handleListAllPosts = useCallback(async () => {
    try {
      const { result, message, data } = await listAllPosts();

      if (result === "success") if (data) setPosts(data.posts);

      if (result === "error") toast.error(message);
    } catch (error: any) {
      toast.error(`Erro ao listar posts ${error.message}`);
    }
  }, []);

  useEffect(() => {
    handleListAllPosts();
  }, [handleListAllPosts]);

  return (
    <LayoutDefault>
      <Container>
        <ProfileCard />

        <Posts>
          <CreatePost onCreatePost={handleListAllPosts} />

          {posts.map((post) => (
            <Post
              key={post.id}
              authorId={post.user.id}
              authorAvatar={post.user.avatarUrl}
              authorName={post.user.name}
              authorEmail={post.user.name}
              postId={post.id}
              content={post.content}
              tags={post.tags}
              comments={post.comments}
              reactions={post.reactions}
              publishedAt={post.publishedAt}
              onCreateComment={handleListAllPosts}
            />
          ))}
        </Posts>
      </Container>
    </LayoutDefault>
  );
};

export default Feed;
