import { FC, MouseEventHandler } from "react";
import { Container } from "./styles";

interface IProps {
  value: string;
  isPrimary: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<IProps> = ({ value, isPrimary, onClick }) => {
  return (
    <Container onClick={onClick} isPrimary={isPrimary}>
      {value}
    </Container>
  )
}