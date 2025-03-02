interface headingProps {
  className?: string;
}

export function Heading({ className }: headingProps) {
  return <h1 className={className}>GeoVerse</h1>;
}
