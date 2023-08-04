import Avatar from "../Avatar";
import Comment from "../Comment";
import {
  Author,
  AuthorInfo,
  Comments,
  Container,
  Content,
  Description,
  Divider,
  CommentForm,
  Hastags,
  Header,
} from "./styles";

const Post: React.FC = () => {
  return (
    <Container>
      <Header>
        <Author>
          <Avatar />

          <AuthorInfo>
            <h1>Roberto Neto</h1>
            <p>RobertoModenezi@gmail.com</p>
          </AuthorInfo>
        </Author>

        <time>Publicado à 1h</time>
      </Header>

      <Content>
        <Description>
          <p>Fala Galera</p>
          <p>O mais importante é que ela protege meu Baseballbet!!!</p>
        </Description>
        <Hastags>
          <span>#collabspace</span>
          <span>#confia</span>
        </Hastags>
      </Content>

      <Divider />

      <CommentForm>
        <h1>Deixe seu comentário</h1>

        <textarea name=""></textarea>

        <button>Comentar</button>
      </CommentForm>

      <Divider />

      <Comments>
        <Comment />
      </Comments>
    </Container>
  );
};

export default Post;
