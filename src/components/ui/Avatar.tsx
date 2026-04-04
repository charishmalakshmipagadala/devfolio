interface AvatarProps {
  name: string;
  size?: number;
}

export function Avatar({ name, size = 48 }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      style={{
        width: size,
        height: size,
        fontSize: size * 0.35,
      }}
      className="rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center font-bold text-white flex-shrink-0"
    >
      {initials || "?"}
    </div>
  );
}
