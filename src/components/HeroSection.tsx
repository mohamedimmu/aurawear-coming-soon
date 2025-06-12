export default function HeroSection() {
  return (
    <section className="relative mt-8 w-full overflow-hidden px-6 md:mt-12 md:px-12">
      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-400/50 to-red-400 pointer-events-none" /> */}

      <div className="relative flex flex-col items-center justify-start gap-8">
        {/* Subheading */}
        <div className="animate-hero-fade-in mx-auto max-w-2xl text-center [animation-delay:200ms]">
          <p className="xs:text-base text-sm leading-relaxed text-black/80 md:text-lg">
            Sign up to get exclusive early access to our first official drop.
            Premium fits. Limited stock. Members get it first.
          </p>
        </div>

        {/* Heading */}
        <div className="flex w-full flex-col items-center">
          <h1 className="font-inter xxs:text-5xl xs:text-6xl animate-hero-fade-in space-y-1 text-center text-4xl leading-[1.1] font-medium tracking-tight text-black uppercase sm:text-7xl md:text-8xl md:leading-[1.2]">
            <span className="block">Be First</span>
            <span className="block">to Experience the</span>
            <span className="from-peach to-primary block bg-gradient-to-r bg-clip-text">
              Launch Lineup
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
