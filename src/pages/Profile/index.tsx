import { useState, useEffect, useCallback } from "react";

import { useParams } from "react-router-dom";

import moment from "moment";

import AvatarCircle from "../../components/AvatarCircle";

import RequestFriend from "../../components/RequestFriend";

import LayoutDefault from "../../layouts/Default";
import FriendCard from "../../components/FriendCard";

import { listUserById } from "../../services/Users";
import { IUser } from "../../services/Users/types";
import { toast } from "react-toastify";

import { Camera, PencilSimple, MapPin, Phone, Clock } from "phosphor-react";

import {
  Overview,
  Cover,
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
import { useAuthentication } from "../../contexts/AuthContext";

moment.defineLocale("pt-br", {
  weekdays: "Segunda_Terça_Quarta_Quinta_Sexta_Sábado_Domingo".split("_"),
  months:
    "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
      "_",
    ),
});

const Profile: React.FC = () => {
  const { id } = useParams();
  const { signOut } = useAuthentication();

  const [user, setUser] = useState<IUser | null>(null);

  const handleListUserById = useCallback(async () => {
    try {
      if (id) {
        const { result, message, data } = await listUserById({ id });

        if (result === "success") {
          if (data) setUser(data.user);
        }

        if (result === "error") toast.error(message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [id]);

  useEffect(() => {
    handleListUserById();
  }, [id, handleListUserById]);

  return (
    <LayoutDefault>
      <Container>
        <Content>
          <Overview>
            <UserBanner>
              <EditCoverButton>
                <Camera size={22} weight="fill" />
              </EditCoverButton>

              <Cover src="https://i.imgur.com/gH2QLjf.png" />
              <div>
                <AvatarCircle
                  size="192px"
                  src={user?.avatarUrl || "https://i.imgur.com/HYrZqHy.jpg"}
                />
              </div>

              <EditInfoButton>
                <PencilSimple size={22} weight="bold" />
              </EditInfoButton>
            </UserBanner>

            <UserInfo>
              <General>
                <h1>{user?.name}</h1>
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

                {user?.telephone && (
                  <span>
                    <Phone size={20} weight="bold" />
                    {user.telephone}
                  </span>
                )}

                <span>
                  <Clock size={20} weight="bold" />
                  {moment(user?.createdAt).format("[Entrou em] MMMM [de] YYYY")}
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

          <a style={{ color: "white", marginTop: "1rem" }} onClick={signOut}>
            Sair
          </a>
        </Sidebar>
      </Container>
    </LayoutDefault>
  );
};

export default Profile;
