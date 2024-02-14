import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {


  return (
    <>
      <main className="mx-4">{children}</main>
    </>
  );
}
