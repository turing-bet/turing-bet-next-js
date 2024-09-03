import { ReactNode } from "react";

const ButtonPrimary = ({
  onClick,
  label,
  disabled,
}: {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: string | ReactNode;
  disabled: boolean;
}) => {
  return (
    <button
      className="bg-[#43369F] p-2 px-4 rounded-xl hover:bg-[#6A5BE0] hover:scale-105 hover:shadow-md active:scale-95 cursor-pointer disabled:brightness-50 disabled:grayscale disabled:cursor-default transform transition-transform duration-100"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ButtonPrimary;
