type DialogueBoxProps = {
  text: string;
  className?: string;
};

function DialogueBox({ text, className = "" }: DialogueBoxProps) {
  return (
    <div
      className={`px-4 py-4 bg-white opacity-80 font-bold text-black text-xl border-y-4 border-r-4 border-l-0 border-green-600 rounded-tr-lg rounded-br-lg shadow-md ${className}`}
      style={{
        borderLeft: "none",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      }}
    >
      {text}
    </div>
  );
}

export default DialogueBox;
