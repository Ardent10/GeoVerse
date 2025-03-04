import React from "react";
import { PixelBubble } from "./bubble";

interface ChatBubbleProps {
  text: string;
  variant: "user" | "bot";
  id?: string;
}

export function ChatBubble({ id, text, variant }: ChatBubbleProps) {
  const isUser = variant === "user";

  return (
    <div
      key={id}
      className={`flex items-center gap-2 w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <img
          src="/assets/common/bot.png"
          alt="Bot"
          height={50}
          width={50}
          className="rounded-full bg-yellow-400 p-2"
        />
      )}

      <PixelBubble
        text={text}
        direction={isUser ? "right" : "left"}
        className="text-sm font-minecraft"
        borderColor="#eab308"
      />

      {isUser && (
        <img
          src="/assets/common/user.png"
          alt="User"
          height={50}
          width={50}
          className="rounded-full"
        />
      )}
    </div>
  );
}
