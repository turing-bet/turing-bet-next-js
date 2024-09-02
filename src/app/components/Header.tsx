import React from "react";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 flex w-full justify-between items-center p-4">
      <span className="pl-2 text-xl font-bold">Turing.bet</span>
      <span className="bg-[#43369F] p-2 px-4 rounded-xl hover:bg-[#6A5BE0] cursor-pointer">
        Login
      </span>
    </div>
  );
};

export default Header;
