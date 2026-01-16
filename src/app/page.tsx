"use client";

import { useEffect, useState } from "react";
import { generateUsername } from "../../lib/generate-username";
import { USER_CHAT_KEY } from "../../constants/username";

export default function Home() {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const initializeUsername = () => {
      const userStored = localStorage.getItem(USER_CHAT_KEY);

      if (userStored) {
        setUsername(userStored);
        return;
      }

      const generatedUsername = generateUsername();
      localStorage.setItem(USER_CHAT_KEY, generatedUsername);
      setUsername(generatedUsername);
    };

    initializeUsername();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-blue-500">
            &copy;ephemeral_conversations
          </h1>
          <p className="text-sm text-red-500">
            End-to-end encrypted chats that self-destruct...
          </p>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <div className="space-y-2">
            <div className="space-y-2">
              <label className="flex items-center text-zinc-500">
                Chat Handle
              </label>

              <div className="flex items-center gap-3">
                <div className="flex-1 rounded-md border border-zinc-800 bg-zinc-950 p-3 font-mono text-sm text-zinc-400">
                  {username}
                </div>
              </div>
            </div>

            <button className="mt-2 w-full cursor-pointer rounded-md bg-zinc-100 p-3 text-black transition-colors hover:bg-zinc-50 hover:not-only:text-black disabled:opacity-50">
              LAUNCH ROOM
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
