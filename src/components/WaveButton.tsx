import { FC } from "react";

type Props = {
  children: string;
  onClick?: () => void;
};

export const WaveButton: FC<Props> = ({ children, onClick }) => {
  return (
    <button className="waveButton" onClick={onClick}>
      {children}
    </button>
  );
};
