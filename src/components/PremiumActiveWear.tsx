import React from "react";

function PremiumActiveWear() {
  return (
    <div>
      <div className="mb-16 text-center">
        <p className="mb-2 text-sm text-muted-foreground uppercase">Facts</p>
        <h2 className="mx-auto max-w-3xl text-3xl leading-tight font-medium text-foreground md:text-4xl font-lora">
          Choose excellence with our premium activewear selection.
        </h2>
      </div>

      {/* Stats */}
      <div className="mb-16 flex flex-col justify-center gap-8 md:flex-row md:gap-24">
        <div className="text-center">
          <p className="mb-4 text-5xl font-bold text-green-500 md:text-6xl">
            68%
          </p>
          <p className="mx-auto max-w-xs text-muted-foreground">
            of our fabrics are recycled, reflecting our dedication to
            sustainability.
          </p>
        </div>
        <div className="text-center">
          <p className="mb-4 text-5xl font-bold text-green-500 md:text-6xl">
            100%
          </p>
          <p className="mx-auto max-w-xs text-muted-foreground">
            of our technical fabrics are chemical-free, ensuring your comfort
            and safety.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PremiumActiveWear;
