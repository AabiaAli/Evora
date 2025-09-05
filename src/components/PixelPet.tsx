import React from "react";

type PetType =
  | "luna"
  | "hoot"
  | "cocoa"
  | "sage"
  | "ember"
  | "azure";
type PetMood = "happy" | "working" | "sleeping" | "excited";
type PetSize = "sm" | "md" | "lg";

interface PixelPetProps {
  type: PetType;
  mood?: PetMood;
  size?: PetSize;
  animated?: boolean;
}

interface PetInfo {
  name: string;
  species: string;
  workingActivity: string;
  personality: string;
}

const petInfo: Record<PetType, PetInfo> = {
  luna: {
    name: "Luna",
    species: "Cat",
    workingActivity: "Typing on tiny keyboard",
    personality: "Curious and independent",
  },
  hoot: {
    name: "Hoot",
    species: "Owl",
    workingActivity: "Reading miniature books",
    personality: "Wise and studious",
  },
  cocoa: {
    name: "Cocoa",
    species: "Bunny",
    workingActivity: "Organizing papers with tiny paws",
    personality: "Energetic and helpful",
  },
  sage: {
    name: "Sage",
    species: "Dragon",
    workingActivity: "Breathing gentle focus flames",
    personality: "Mystical and protective",
  },
  ember: {
    name: "Ember",
    species: "Fox",
    workingActivity: "Sketching in a notebook",
    personality: "Creative and clever",
  },
  azure: {
    name: "Azure",
    species: "Bird",
    workingActivity: "Flying around with messages",
    personality: "Free-spirited and encouraging",
  },
};

// Pixel art representations using CSS
const getPixelArt = (type: PetType, mood: PetMood) => {
  const baseStyles = "pixel-art block";

  switch (type) {
    case "luna":
      return (
        <div
          className="w-12 h-12 bg-contain bg-no-repeat bg-center"
          style={{
            backgroundImage:
              "url('https://64.media.tumblr.com/a71bc83661d3be8192c7d6cd62e2e966/tumblr_n3fc3rdi8a1rzn9vfo1_500.gif')",
          }}
          data-mood={mood}
        />
      );

    case "hoot": // Owl
      return (
        <div
          className="w-12 h-12 bg-contain bg-no-repeat bg-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/originals/d3/6c/ec/d36cece974faf2eb660a0f688550035e.gif')",
          }}
          data-mood={mood}
        />
      );

    case "cocoa": // Bunny
      return (
        <div
          className="w-12 h-12 bg-contain bg-no-repeat bg-center"
          style={{
            backgroundImage:
              "url('https://31.media.tumblr.com/2524713a30add62d08fa5f7932713c54/tumblr_mqz5weqslL1rn7prko1_500.gif')",
          }}
          data-mood={mood}
        />
      );

    case "sage": // Dragon
      return (
        <div
          className="w-12 h-12 bg-contain bg-no-repeat bg-center"
          style={{
            backgroundImage:
              "url('https://i.redd.it/2m1uvab0zgd51.gif')",
          }}
          data-mood={mood}
        />
      );

    case "ember": // Fox
      return (
        <div className="relative">
          <div className="pixel-pet-ember" data-mood={mood}>
            {/* Fox body */}
            <div className="w-7 h-5 bg-orange-500 rounded-lg relative">
              {/* Head */}
              <div className="w-4 h-3 bg-orange-500 rounded-lg absolute -left-1 top-1">
                {/* Ears */}
                <div className="w-1 h-2 bg-orange-600 absolute -top-1 left-0 transform rotate-12"></div>
                <div className="w-1 h-2 bg-orange-600 absolute -top-1 right-0 transform -rotate-12"></div>
                {/* Eyes */}
                <div className="w-1 h-1 bg-black rounded-full absolute top-1 left-0.5"></div>
                <div className="w-1 h-1 bg-black rounded-full absolute top-1 right-0.5"></div>
                {/* Snout */}
                <div className="w-2 h-1 bg-orange-400 rounded-full absolute -left-1 top-1.5"></div>
                <div className="w-0.5 h-0.5 bg-black absolute -left-1 top-1.5"></div>
              </div>
              {/* Tail */}
              <div className="w-2 h-6 bg-orange-600 rounded-full absolute -right-1 top-0 transform rotate-45">
                <div className="w-1 h-2 bg-white absolute bottom-0 right-0"></div>
              </div>
              {/* Legs */}
              <div className="w-1 h-2 bg-orange-600 absolute -bottom-2 left-1"></div>
              <div className="w-1 h-2 bg-orange-600 absolute -bottom-2 right-1"></div>
            </div>
          </div>
        </div>
      );

    case "azure": // Bird
      return (
        <div className="relative">
          <div className="pixel-pet-azure" data-mood={mood}>
            {/* Bird body */}
            <div className="w-5 h-4 bg-sky-400 rounded-full relative">
              {/* Head */}
              <div className="w-3 h-3 bg-sky-400 rounded-full absolute -left-1 top-0">
                {/* Eye */}
                <div className="w-1 h-1 bg-black rounded-full absolute top-1 left-1"></div>
                {/* Beak */}
                <div className="w-1 h-0.5 bg-orange-400 absolute left-0 top-1"></div>
              </div>
              {/* Wing */}
              <div className="w-3 h-2 bg-sky-600 rounded-full absolute top-1 left-1"></div>
              {/* Tail */}
              <div className="w-2 h-3 bg-sky-600 absolute -right-1 top-0 rounded-r-full"></div>
              {/* Feet */}
              <div className="w-0.5 h-1 bg-orange-400 absolute -bottom-1 left-1"></div>
              <div className="w-0.5 h-1 bg-orange-400 absolute -bottom-1 left-2"></div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
      );
  }
};

const getSizeClasses = (size: PetSize) => {
  switch (size) {
    case "sm":
      return "scale-75";
    case "lg":
      return "scale-150";
    default:
      return "scale-100";
  }
};

export function PixelPet({
  type,
  mood = "happy",
  size = "md",
  animated = true,
}: PixelPetProps) {
  const pet = petInfo[type];

  // Safety check in case type is not found
  if (!pet) {
    console.warn(`Pet type "${type}" not found in petInfo`);
    return (
      <div
        className={`inline-flex flex-col items-center gap-2 ${getSizeClasses(size)}`}
      >
        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
        {size !== "sm" && (
          <div className="text-center">
            <p className="text-xs font-medium text-gray-700">
              Unknown Pet
            </p>
            <p className="text-xs text-gray-500">Unknown</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex flex-col items-center gap-2 ${getSizeClasses(size)}`}
    >
      <div
        className={`${animated ? "hover:animate-wiggle" : ""} transition-transform`}
      >
        {getPixelArt(type, mood)}
      </div>

      {size !== "sm" && (
        <div className="text-center">
          <p className="text-xs font-medium text-gray-700">
            {pet.name}
          </p>
          <p className="text-xs text-gray-500">{pet.species}</p>
        </div>
      )}
    </div>
  );
}

export { petInfo };
export type { PetType, PetMood, PetInfo };