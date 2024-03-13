import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function CopyButton({ id }: { id: string }) {
const [onCopy ,setCopy] = useState(false);
const [onDone ,setDone] = useState(false);

  const handleCopy = async () => {
    const text = document.getElementById(id)?.textContent;
    try {
      await navigator.clipboard.writeText(text!);
      setCopy(true)
    } catch (er) {
      console.log("error copy");
    }
  };
  return (
    <div onClick={handleCopy} className="p-2 hover:scale-105 cursor-pointer hover:bg-zinc-700 rounded-md relative">
        <Check
				className={`" cursor-pointer  transition-all w-5 h-5  text-green-500 ${
					onDone ? "scale-100 " : "scale-0 "
				}`}
				onTransitionEnd={() => {
					setTimeout(() => {
						setDone(false);
						setCopy(false);
					}, 500);
				}}
			/>
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center" onTransitionEnd={() =>{ if(onCopy){
            setDone(true);
        }}}>
      <Copy className={cn("transition-all", onCopy ? "scale-0": "scale-100")}/>
        </div>
    </div>
  );
}

CopyButton;

// const id = (Math.floor(Math.random() * 100) + 1).toString();