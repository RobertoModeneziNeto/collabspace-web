import { useState, useEffect, useCallback, FormEvent } from "react";

import { useParams } from "react-router-dom";

import moment from "moment";

import AvatarCircle from "../../components/AvatarCircle";

import RequestFriend from "../../components/RequestFriend";

import LayoutDefault from "../../layouts/Default";
import FriendCard from "../../components/FriendCard";

import Modal from "../../components/Modal";

import { listUserById, updateAvatar, updateCover } from "../../services/Users";
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
  FormEdit,
  InputEdit,
  ButtonEdit,
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
  const { handleAvatarUrl, handleCoverUrl, signOut } = useAuthentication();

  const [user, setUser] = useState<IUser | null>(null);

  const [modalEditAvatar, setModalEditAvatar] = useState(false);

  const [modalEditCover, setModalEditCover] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState("");

  const [coverUrl, setCoverUrl] = useState("");

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

  const handleUpdateAvatar = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        const { result, message } = await updateAvatar({ avatarUrl });

        if (result === "success") {
          handleAvatarUrl(avatarUrl);
          setModalEditAvatar(!modalEditAvatar);

          toast.success(message);
        }
        if (result === "error") toast.error(message);
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [avatarUrl, handleAvatarUrl, modalEditAvatar],
  );

  const handleUpdateCover = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        const { result, message } = await updateCover({ coverUrl });

        if (result === "success") {
          handleCoverUrl(coverUrl);
          setModalEditCover(!modalEditCover);

          toast.success(message);
        }
        if (result === "error") toast.error(message);
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [coverUrl, handleCoverUrl, modalEditCover],
  );

  function toggleModalEditAvatar() {
    setModalEditAvatar(!modalEditAvatar);
  }

  function toggleModalEditCover() {
    setModalEditCover(!modalEditCover);
  }

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
                <Camera
                  size={22}
                  weight="fill"
                  onClick={toggleModalEditCover}
                />
              </EditCoverButton>

              <Cover
                src={
                  coverUrl ||
                  user?.coverUrl ||
                  "https://i.imgur.com/gH2QLjf.png"
                }
              />
              <div>
                <AvatarCircle
                  size="192px"
                  avatar={avatarUrl || user?.avatarUrl}
                  onClick={toggleModalEditAvatar}
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

      <Modal
        width="75%"
        height="120px"
        isOpen={modalEditAvatar}
        onclose={toggleModalEditAvatar}
      >
        <FormEdit onSubmit={handleUpdateAvatar}>
          <InputEdit
            name="avatarUrl"
            type="text"
            value={avatarUrl}
            onChange={(e) => {
              setAvatarUrl(e.target.value);
            }}
            required
            placeholder="URL da imagem"
          />
          <ButtonEdit>Salvar</ButtonEdit>
        </FormEdit>
      </Modal>

      <Modal
        width="75%"
        height="120px"
        isOpen={modalEditCover}
        onclose={toggleModalEditCover}
      >
        <FormEdit onSubmit={handleUpdateCover}>
          <InputEdit
            name="coverUrl"
            type="text"
            value={coverUrl}
            onChange={(e) => {
              setCoverUrl(e.target.value);
            }}
            required
            placeholder="URL do cover"
          />
          <ButtonEdit>Salvar</ButtonEdit>
        </FormEdit>
      </Modal>
    </LayoutDefault>
  );
};

export default Profile;
