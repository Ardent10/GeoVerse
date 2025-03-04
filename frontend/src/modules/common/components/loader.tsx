export function PixelLoader({ variant }: { variant: "ghost" | "bg" }) {
  return (
    <>
      {variant === "bg" ? (
        <div className="bg-yellow-400 rounded-full p-4">
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3dzNTNwMzg5NDF3cHBiMzczazhuZHRndWc5cHB2a3Bhd2d5NWc4eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/aYKTYtCYb2ECSKfyal/giphy.gif"
            alt="loader"
            className="h-8 w-8"
          />
        </div>
      ) : (
        <img
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3dzNTNwMzg5NDF3cHBiMzczazhuZHRndWc5cHB2a3Bhd2d5NWc4eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/aYKTYtCYb2ECSKfyal/giphy.gif"
          alt="loader"
          className="h-8 w-8"
        />
      )}
    </>
  );
}
