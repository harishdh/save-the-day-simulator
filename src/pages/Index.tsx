import { useState, useEffect } from "react";
import WelcomeScreen from "@/components/game/WelcomeScreen";
import GameUI from "@/components/game/GameUI";
import Level from "@/components/game/Level";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const LEVEL_1_OPTIONS = [
  {
    text: "Check the logs for context",
    points: 1,
    feedback: "Smart move! The logs will give you valuable insights.",
  },
  {
    text: "Notify the team on Slack",
    points: 0,
    feedback: "Not bad, but let's investigate first before alarming everyone.",
  },
  {
    text: "Restart the build without investigation",
    points: -1,
    feedback: "Oops! Always investigate before taking action.",
  },
];

const Index = () => {
  const [gameState, setGameState] = useState<"welcome" | "playing" | "ended">("welcome");
  const [points, setPoints] = useState(0);
  const [stress, setStress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const { toast } = useToast();

  useEffect(() => {
    if (gameState === "playing") {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setGameState("ended");
            return 0;
          }
          return prev - 1;
        });
        setStress((prev) => Math.min(prev + 1.5, 100));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState]);

  const handleStart = () => {
    setGameState("playing");
    toast({
      title: "Mission Started! 🚀",
      description: "Time to save the day! Keep an eye on your stress levels.",
    });
  };

  const handleLearnMore = () => {
    window.open("https://www.harness.io/products/incident-response", "_blank");
  };

  const handleChoice = (points: number) => {
    setPoints((prev) => prev + points);
    setStress((prev) => Math.max(0, prev - (points * 10)));
    
    setTimeout(() => {
      setGameState("ended");
    }, 1500);
  };

  const getEndGameMessage = () => {
    if (points >= 1) return "Zen Master 🧘‍♂️";
    if (points === 0) return "On-Call Warrior ⚔️";
    return "Chaos Champion 🌪️";
  };

  const resetGame = () => {
    setGameState("welcome");
    setPoints(0);
    setStress(0);
    setTimeRemaining(60);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      {gameState === "welcome" && (
        <WelcomeScreen onStart={handleStart} onLearnMore={handleLearnMore} />
      )}

      {gameState === "playing" && (
        <>
          <GameUI 
            stress={stress}
            points={points}
            timeRemaining={timeRemaining}
          />
          <Level
            scenario="A build just failed! What's your first move?"
            options={LEVEL_1_OPTIONS}
            onChoice={handleChoice}
          />
        </>
      )}

      {gameState === "ended" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 max-w-lg mx-auto p-8"
        >
          <h2 className="text-3xl font-bold">{getEndGameMessage()}</h2>
          <p className="text-xl">Final Score: {points} points</p>
          <p className="text-gray-600">
            Your stress level could've been lower with Harness Incident Response.
          </p>
          
          <div className="space-y-4">
            <Button
              onClick={() => window.open("https://www.harness.io/products/incident-response", "_blank")}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90"
            >
              Join Beta
            </Button>
            
            <Button
              onClick={resetGame}
              variant="outline"
              size="lg"
              className="w-full"
            >
              Play Again
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Index;