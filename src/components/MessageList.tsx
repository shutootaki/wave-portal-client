import { Wave } from "../types/waves";

type Props = {
  wave: Wave;
  index: number;
};

export const MessageList = ({ wave, index }: Props) => {
  return (
    <div
      key={index}
      style={{
        backgroundColor: "#F8F8FF",
        marginTop: "16px",
        padding: "8px",
      }}
    >
      <p>Address: {wave.address}</p>
      <p>Time: {String(wave.timestamp)}</p>
      <p>Message: {wave.message}</p>
    </div>
  );
};
