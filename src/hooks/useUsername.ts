import { USER_CHAT_KEY } from "@/constants/username";
import { generateUsername } from "@/lib/generate-username";
import { useEffect, useState } from "react";

export const useUsername = () => {
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

  return { username };
};
