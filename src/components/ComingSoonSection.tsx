import React from "react";
import ComingSoonCard from "./ComingSoonCard";
import TshirtsandTanks from "@/assets/category/tshirts.jpg";
import PantsandShorts from "@/assets/category/joggers.png";

const ComingSoonSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h2 className="font-inter xs:text-2xl text-xl font-semibold">
          Coming Soon
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ComingSoonCard
          title="Tanks and T-shirts"
          category="t-shirts"
          image={TshirtsandTanks}
          formId="TshirtsTanksLeads"
        />
        <ComingSoonCard
          title="Trousers and Pants"
          category="trousers"
          image={PantsandShorts}
          formId="PantsTrousersLeads"
        />
      </div>
    </section>
  );
};

export default ComingSoonSection;
