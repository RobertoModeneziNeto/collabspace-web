import Avatar from "../Avatar";
import { Container, Content, Divider, Hastags } from "./styles";

const Post: React.FC = () => {
  return (
    <Container>
      <header>
        <div>
          <Avatar />

          <section>
            <h1>Roberto Neto</h1>

            <p>RobertoModenezi@gmail.com</p>
          </section>
        </div>

        <p>Publicado à 1h</p>
      </header>

      <main>
        <Content>
          <p>Fala Galera</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            deserunt adipisci impedit hic ut tempora optio quibusdam reiciendis
            debitis illo, repellendus, mollitia quos esse, architecto dicta
            provident ipsum earum ex.
          </p>
        </Content>
        <Hastags>
          <span>#collabspace</span>
          <span>#confia</span>
        </Hastags>
      </main>

      <Divider />

      <footer>
        <h1>Deixe seu comentário</h1>

        <textarea name=""></textarea>

        <button>Comentar</button>
      </footer>
    </Container>
  );
};

export default Post;
