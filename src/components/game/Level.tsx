import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Server, Bug, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Option {
  text: string;
  points: number;
  feedback: string;
}

interface LevelProps {
  scenario: string;
  options: Option[];
  onChoice: (points: number) => void;
}

const Level = ({ scenario, options, onChoice }: LevelProps) => {
  const [isChoosing, setIsChoosing] = useState(true);

  const handleChoice = (option: Option) => {
    setIsChoosing(false);
    onChoice(option.points);
    toast(option.feedback, {
      icon: option.points > 0 ? "✅" : "❌",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto p-6"
    >
      <div className="text-center mb-8">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 15, -15, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block mb-4"
        >
          <Server className="w-16 h-16 text-secondary" />
        </motion.div>
        
        <h2 className="text-2xl font-bold mb-4">{scenario}</h2>
        
        <div className="flex justify-center gap-2 mb-4">
          <Bug className="w-5 h-5 text-destructive animate-bounce" />
          <AlertCircle className="w-5 h-5 text-secondary animate-pulse" />
        </div>
      </div>

      {isChoosing && (
        <div className="space-y-4">
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <Button
                onClick={() => handleChoice(option)}
                variant="outline"
                className="w-full text-left justify-start h-auto py-4 hover:bg-muted"
              >
                {option.text}
              </Button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Level;