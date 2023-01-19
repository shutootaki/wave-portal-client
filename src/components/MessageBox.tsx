import { type } from "os";
import React from "react";

type Props = {
  messageValue: string;
  setMesasgeValue: React.Dispatch<React.SetStateAction<string>>;
};

export const MessageBox = ({ messageValue, setMesasgeValue }: Props) => {
  return (
    <textarea
      name="massageArea"
      placeholder="メッセージはこちら"
      id="message"
      value={messageValue}
      onChange={(e) => setMesasgeValue(e.target.value)}
    />
  );
};
