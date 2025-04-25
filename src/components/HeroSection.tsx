export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden mt-8 md:mt-12 px-6 md:px-12">
      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-400/50 to-red-400 pointer-events-none" /> */}

      <div className="relative flex flex-col items-center justify-start  gap-8">
        {/* Subheading */}
        <div className="max-w-2xl mx-auto text-center animate-hero-fade-in [animation-delay:200ms]">
          <p className="text-sm xs:text-base md:text-lg text-black/80 leading-relaxed">
            Sign up to get exclusive early access to our first official drop.
            Premium fits. Limited stock. Members get it first.
          </p>
        </div>

        {/* Heading */}
        <div className="w-full flex flex-col items-center ">
          <h1 className="font-grotesk text-4xl xxs:text-5xl xs:text-6xl sm:text-7xl md:text-8xl font-medium text-black tracking-tight text-center leading-[1.1] md:leading-[1.2] animate-hero-fade-in space-y-1 uppercase">
            <span className="block">Be First</span>
            <span className="block">to Experience the</span>
            <span className="block bg-gradient-to-r from-peach to-primary bg-clip-text">
              Launch Lineup
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
