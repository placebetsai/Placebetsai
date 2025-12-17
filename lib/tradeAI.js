// This simulates an AI checking trends and picking a trade.
// In the future, you replace this function with an OpenAI API call.

export async function getTradeOfTheMonth() {
  // SIMULATED DATABASE OF TRADES
  const trades = [
    {
      title: "Elevator Mechanic",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop", // Generic stock photo
      description: "Highest paid trade of 2025. Union protected, $100k+ potential, zero student debt.",
      link: "/trade-schools"
    },
    {
      title: "Underwater Welder",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
      description: "High risk, insane reward. Travel the world and earn $200/hr welding in the deep.",
      link: "/trade-schools"
    },
    {
      title: "Wind Turbine Tech",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop",
      description: "Green energy boom. Climb high, fix turbines, and secure a recession-proof future.",
      link: "/trade-schools"
    }
  ];

  // Logic to pick one based on the current month (Simple Rotation)
  // This ensures it changes automatically every month without you touching it.
  const date = new Date();
  const monthIndex = date.getMonth(); // 0 = Jan, 1 = Feb, etc.
  
  // Modulo operator % loops through the array so it never runs out
  const selectedTrade = trades[monthIndex % trades.length];

  return selectedTrade;
}
