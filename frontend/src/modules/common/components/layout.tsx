import { Footer } from "./footer";
import { Navbar } from "./navbar";

interface layoutProps{
 children: any
}

export function Layout({children}:layoutProps) {
  return (
    <div className="w-full h-full">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
