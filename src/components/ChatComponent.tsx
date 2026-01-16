"use client";

import { useRef, useState } from "react";

const ChatComponent = () => {
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto p-4">
        all msg
      </div>

      <div className="rounded-lg border-t border-zinc-800 bg-zinc-900/30 p-4">
        <div className="flex gap-4">
          <div className="group relative flex-1">
            <span className="absolute top-1/2 left-4 -translate-y-1/2 animate-pulse text-blue-500">
              {">"}
            </span>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) {
                  //sending msg

                  inputRef.current?.focus();
                }
              }}
              placeholder="Start Conversation..."
              autoFocus
              className="w-full rounded-md border border-zinc-800 bg-black py-3 pr-4 pl-8 text-sm text-zinc-100 transition-colors placeholder:text-zinc-700 focus:border-zinc-700 focus:outline-none"
            />
          </div>

          <button className="cursor-pointer rounded-md bg-zinc-800 px-6 text-sm font-bold text-zinc-400 transition-all hover:bg-blue-800 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-50">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
