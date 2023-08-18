import LayoutDefault from "../../layouts/Default";

import CreatePost from "../../components/CreatePost";
import Post from "../../components/Post";
import ProfileCard from "../../components/ProfileCard";

import { Posts } from "./styles";

const Feed: React.FC = () => {
  return (
    <LayoutDefault>
      <ProfileCard />

      <Posts>
        <CreatePost />

        <Post />
        <Post />
        <Post />
        <Post />
      </Posts>
    </LayoutDefault>
  );
};

export default Feed;
