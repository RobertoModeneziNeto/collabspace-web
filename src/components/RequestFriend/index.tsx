import { Check, X } from "phosphor-react";

import {
  Avatar,
  Container,
  User,
  Info,
  Actions,
  ButtonAccept,
  ButtonRecuse,
} from "./styles";

const RequestFriend: React.FC = () => {
  return (
    <Container>
      <User>
        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQisDABGj1d2XF8DxoGhk3tn-cx2F1fWOFgY3RiL_s-5GidpAO-NmJkv6taQ9lC36ejRyc&usqp=CAU" />

        <Info>
          <h1>James Rodriguez</h1>
          <p>JamesRodriguez@gmail.comaaaaaaaaaaa</p>
        </Info>
      </User>

      <Actions>
        <ButtonAccept>
          <Check size={18} />
        </ButtonAccept>

        <ButtonRecuse>
          <X size={18} />
        </ButtonRecuse>
      </Actions>
    </Container>
  );
};

export default RequestFriend;
