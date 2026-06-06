export function getGoalModifiers(goal) {
  switch (goal) {
    case "Lose Weight":
      return {
        accessoryRepBonus: 2,
        conditioning: true,
        volumeMultiplier: 1,
      };

    case "Maintain":
      return {
        accessoryRepBonus: 0,
        conditioning: false,
        volumeMultiplier: 0.8,
      };

    case "Build Muscle":
    default:
      return {
        accessoryRepBonus: 0,
        conditioning: false,
        volumeMultiplier: 1.2,
      };
  }
}