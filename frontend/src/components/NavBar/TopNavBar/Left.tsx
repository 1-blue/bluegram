import React from "react";
import Link from "next/link";

const LeftMenu = () => {
  return (
    <>
      <Link href="/">
        <a>
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Blegram
          </span>
        </a>
      </Link>
    </>
  );
};

export default LeftMenu;
