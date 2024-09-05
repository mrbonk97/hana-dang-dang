import Image from "next/image";

interface MessageTemplageProps {
  face?: boolean;
  type: "BOT" | "USER";
  title?: string | null;
  message?: string | null;
  children?: React.ReactNode;
}

export const MessageTemplate = ({
  face,
  type,
  title,
  message,
  children,
}: MessageTemplageProps) => {
  return (
    <div className={`w-full flex flex-col ${type == "USER" && "items-end"}`}>
      {face && (
        <Image
          src={"/images/boii-face.png"}
          width={60}
          height={60}
          alt="hana-boy"
          className="p-1 mb-1 w-12 h-12 rounded-full bg-custom-300/20"
        />
      )}
      <div
        className={`mt-1 w-3/4 p-5 space-y-2 rounded-3xl border bg-card text-card-foreground shadow-sm ${
          type == "USER" && "bg-secondary "
        } `}
      >
        {title && <h4 className="text-lg font-bold opacity-80">{title}</h4>}
        {message && (
          <p className="whitespace-pre-wrap font-medium opacity-70">
            {message}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

// {type == "BOT" && (
//   <Image
//     src={"/images/boii-face.png"}
//     width={60}
//     height={60}
//     alt="hana-boy"
//     className="p-1 w-12 h-12 rounded-full bg-custom-300/20"
//   />
// )}
