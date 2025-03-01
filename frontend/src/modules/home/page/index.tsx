import { Button } from "pixel-retroui";

export function Home() {
  return (
    <div>
      <Button onClick={() => console.log("Clicked!")}>Play Now</Button>
    </div>
  );
}
