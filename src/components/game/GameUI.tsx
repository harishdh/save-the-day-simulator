import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle } from "lucide-react";

interface GameUIProps {
  stress: number;
  points: number;
  timeRemaining: number;
}

const GameUI = ({ stress, points, timeRemaining }: GameUIProps) => {
  const [stressColor, setStressColor] = useState("bg-green-500");
  
  useEffect(() => {
    if (stress > 75) {
      setStressColor("bg-red-500");
    } else if (stress > 50) {
      setStressColor("bg-yellow-500");
    } else {
      setStressColor("bg-green-500");
    }
  }, [stress]);

  return (
    <div className="fixed top-4 left-4 right-4 flex items-center justify-between px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-secondary" />
          <div className="w-32">
            <p className="text-xs text-gray-500 mb-1">Stress Level</p>
            <Progress value={stress} className={stressColor} />
          </div>
        </div>
        
        <Badge variant="outline" className="font-mono">
          {points} pts
        </Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4" />
        <span className="font-mono">{timeRemaining}s</span>
      </div>
    </div>
  );
};

export default GameUI;