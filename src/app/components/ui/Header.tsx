"use client";

import Link from "next/link";
import React from "react";
import ButtonPrimary from "./ButtonPrimary";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 flex w-full justify-between items-center p-4">
      <Link href="/">
        <span className="pl-2 text-xl font-bold">Turing.bet</span>
      </Link>
      <ButtonPrimary
        label="Login"
        onClick={() => {
          null;
        }}
        disabled={false}
      />
    </div>
  );
};

export default Header;
