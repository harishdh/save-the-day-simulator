import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
  onLearnMore: () => void;
}

const WelcomeScreen = ({ onStart, onLearnMore }: WelcomeScreenProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-6 max-w-lg mx-auto p-8"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center"
      >
        <Shield className="w-10 h-10 text-white" />
      </motion.div>
      
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Save the Day!
      </h1>
      
      <p className="text-lg text-gray-600">
        The system is down, and you're on-call. Are you ready to be the hero we need?
      </p>
      
      <div className="space-y-4">
        <Button 
          onClick={onStart}
          size="lg" 
          className="w-full bg-primary hover:bg-primary/90 text-white"
        >
          Yes, let's fix it! 🚀
        </Button>
        
        <Button 
          onClick={onLearnMore}
          variant="outline" 
          size="lg"
          className="w-full"
        >
          Tell me more first 🤔
        </Button>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;