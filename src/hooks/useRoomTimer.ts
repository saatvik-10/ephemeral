import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useRoomTimer(ttlData?: number) {
  const route = useRouter();

  const [timeRemaining, setTimeRemaining] = useState<number | undefined>(
    ttlData,
  );

  useEffect(() => {
    if (ttlData !== undefined) {
      setTimeRemaining(ttlData);
    }
  }, [ttlData]);

  useEffect(() => {
    if (timeRemaining === undefined || timeRemaining <= 0) {
      if (timeRemaining === 0) {
        route.push("/?destroyed=true");
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === undefined || prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, route]);

  return {
    timeRemaining,
  };
}
