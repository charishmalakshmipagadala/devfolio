import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

function getSocket() {
  if (!socket) {
    socket = io("http://localhost:3001", { withCredentials: true });
  }
  return socket;
}

export function useViewerCount(slug: string) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!slug) return;

    const s = getSocket();
    s.emit("join_portfolio", slug);

    s.on("viewer_count", (data: { slug: string; count: number }) => {
      if (data.slug === slug) setCount(data.count);
    });

    return () => {
      s.emit("leave_portfolio", slug);
      s.off("viewer_count");
    };
  }, [slug]);

  return count;
}
