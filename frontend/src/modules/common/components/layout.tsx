import { Footer } from "./footer";
import { Navbar } from "./navbar";

interface layoutProps{
 children: any
}

export function Layout({children}:layoutProps) {
  return (
    <div className="w-full h-screen flex flex-col">
    <Navbar />
    <div className="flex-grow min-h-0 overflow-auto">{children}</div>
    <Footer />
  </div>
  );
}
