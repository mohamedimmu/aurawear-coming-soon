import React from "react";
import ComingSoonCard from "./ComingSoonCard";
import TshirtsandTanks from "@/assets/tshirts-tanks.jpg"
import PantsandShorts from "@/assets/pants-shorts.jpg";

const ComingSoonSection = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold font-lora">Coming Soon</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ComingSoonCard
          title="Tanks and T-shirts"
          category="t-shirts"
          image={TshirtsandTanks}
        />
        <ComingSoonCard
          title="Trousers and Pants"
          category="trousers"
          image={PantsandShorts}
        />
      </div>
    </section>
  );
};

export default ComingSoonSection;
