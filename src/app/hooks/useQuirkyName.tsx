import { useState, useEffect } from "react";

// A list of quirky words to mix with the generated name
const quirkyWords = [
  "Fluffy",
  "Quirky",
  "Zesty",
  "Jumpy",
  "Wobbly",
  "Breezy",
  "Giggly",
  "Snazzy",
  "Whizzy",
  "Nifty",
  "Zippy",
  "Peppy",
  "Slinky",
  "Funky",
  "Bubbly",
  "Dizzy",
  "Spunky",
  "Frizzy",
  "Wacky",
  "Plucky",
  "Cheeky",
  "Loopy",
  "Perky",
  "Swirly",
  "Bouncy",
  "Spiffy",
  "Chirpy",
  "Groovy",
  "Jazzy",
  "Punky",
  "Silly",
  "Nutty",
  "Goofy",
  "Ritzy",
  "Chilly",
  "Dorky",
  "Twisty",
  "Quirky",
  "Snappy",
  "Zappy",
  "Spirited",
];

// Hook to generate quirky names from a userId
export const useQuirkyName = (userId: string | null) => {
  const [quirkyName, setQuirkyName] = useState<string>("");

  // Hash function to convert a string into a consistent hash code
  const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char; // hash * 31 + char
    }
    return hash;
  };

  // Generate quirky name based on the userId
  useEffect(() => {
    if (userId) {
      const hash = hashCode(userId);

      // Ensure hash is always positive
      const positiveHash = Math.abs(hash);

      // Get a quirky word based on the hash (cyclically choose from the list)
      const quirkyWord = quirkyWords[positiveHash % quirkyWords.length];

      // Generate a unique name using the quirky word and the hash
      const uniqueName = `${quirkyWord}-${positiveHash}`;

      // Set the quirky name to the state
      setQuirkyName(uniqueName);
    }
  }, [userId]);

  return quirkyName;
};
