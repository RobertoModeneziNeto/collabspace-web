import Header from "../../components/Header";
import Post from "../../components/Post";
import ProfileCard from "../../components/ProfileCard";

import { Container, Content, Posts } from "./styles";

const Feed: React.FC = () => {
  return (
    <Container>
      <Header />

      <Content>
        <ProfileCard />

        <Posts>
          <Post />
        </Posts>
      </Content>
    </Container>
  );
};

export default Feed;
