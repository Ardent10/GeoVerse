import { Link } from "react-router";

interface headingProps {
  className?: string;
}

export function Heading({ className }: headingProps) {
  return (
    <Link to="/">
      <h1 className={className}>GeoVerse</h1>
    </Link>
  );
}
