import { ReactNode } from "react";
import { Container, Content } from "./styles";

import { X } from "phosphor-react";

interface ModalProps {
  isOpen: boolean;
  onclose(): void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onclose, children }) => {
  const id = "modal";

  function handleOutSideClick(e: any) {
    if (e.target.id === id) onclose();
  }

  return (
    isOpen && (
      <Container id={id} onClick={handleOutSideClick}>
        <Content>
          <X size={20} weight="bold" onClick={onclose} />
          {children}
        </Content>
      </Container>
    )
  );
};

export default Modal;
