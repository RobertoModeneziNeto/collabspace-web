import RequestFriend from "../../components/RequestFriend";

import LayoutDefault from "../../layouts/Default";
import FriendCard from "../../components/FriendCard";

import { Camera, PencilSimple, MapPin, Phone, Clock } from "phosphor-react";

import {
  Overview,
  Cover,
  Avatar,
  UserInfo,
  General,
  Contact,
  Total,
  Sidebar,
  Requests,
  Content,
  Container,
  RequestList,
  Friends,
  FriendList,
  AreaFriendButton,
  UserBanner,
  EditCoverButton,
  EditInfoButton,
} from "./styles";

const Profile: React.FC = () => {
  return (
    <LayoutDefault>
      <Container>
        <Content>
          <Overview>
            <UserBanner>
              <EditCoverButton>
                <Camera size={22} weight="fill" />
              </EditCoverButton>

              <Cover src="https://jovemnerd.com.br/wp-content/uploads/2021/12/NC808-game-dev-WALLPAPER.png" />

              <Avatar src="data:image/jpeg;base64,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" />

              <EditInfoButton>
                <PencilSimple size={22} weight="bold" />
              </EditInfoButton>
            </UserBanner>

            <UserInfo>
              <General>
                <h1>Roberto Neto</h1>
                <p>É que eu sou DEV!!</p>

                <Total>
                  <span>
                    <strong>115</strong> publicações
                  </span>
                  <span>
                    <strong>10</strong> amigos
                  </span>
                </Total>
              </General>

              <Contact>
                <span>
                  <MapPin size={20} weight="bold" />
                  Jaborandi, São Paulo, Brasil
                </span>
                <span>
                  <Phone size={20} weight="bold" />
                  (17) 99242-4418
                </span>
                <span>
                  <Clock size={20} weight="bold" />
                  Entrou em Março de 2023
                </span>
              </Contact>
            </UserInfo>
          </Overview>

          <Friends>
            <h1>Amigos</h1>
            <FriendList>
              <FriendCard />
              <FriendCard />
              <FriendCard />
              <FriendCard />
              <FriendCard />
              <FriendCard />
              <FriendCard />
              <FriendCard />
              <FriendCard />
              <FriendCard />
              <FriendCard />
              <FriendCard />
            </FriendList>

            <AreaFriendButton>
              <button>Ver todos os amigos</button>
            </AreaFriendButton>
          </Friends>
        </Content>

        <Sidebar>
          <Requests>
            <h1>Solicitações de amizade</h1>
            <RequestList>
              <RequestFriend />
              <RequestFriend />
            </RequestList>
          </Requests>
        </Sidebar>
      </Container>
    </LayoutDefault>
  );
};

export default Profile;
