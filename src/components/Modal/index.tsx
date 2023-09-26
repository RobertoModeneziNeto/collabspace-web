import { ReactNode } from "react";
import { Container, Content } from "./styles";

import { X } from "phosphor-react";

interface ModalProps {
  isOpen: boolean;
  onclose(): void;
  width?: string;
  height?: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onclose,
  width = "480px",
  height,
  children,
}) => {
  const id = "modal";

  function handleOutSideClick(e: any) {
    if (e.target.id === id) onclose();
  }

  return (
    isOpen && (
      <Container id={id} onClick={handleOutSideClick}>
        <Content $width={width} $height={height}>
          <X size={20} weight="bold" onClick={onclose} />
          {children}
        </Content>
      </Container>
    )
  );
};

export default Modal;
