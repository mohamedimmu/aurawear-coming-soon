import React  from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import Link from "next/link";
// import NavigationMenu from "@/components/NavigationMenu";
// import ActionMenu from "@/components/ActionMenu";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";

const Navbar = async () => {
  const headersList = await headers();
  const pathname = headersList.get("x-current-path") || "";
  const isHomePage = pathname === "";

  // const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 10) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <header
      className={cn(
        "z-50 w-full transition-all duration-300",
        isHomePage
          ? "absolute top-0 left-0"
          : "bg-background/80 sticky top-0 backdrop-blur-md",
      )}
    >
      <div className="container-custom">
        <div className="relative flex h-20 items-center justify-between gap-8">
          {/* Left side - Menu */}
          <div className="flex items-center">
            {/* <NavigationMenu /> */}
          </div>

          {/* Center - Logo */}
          <Link
            href="/"
            aria-label="Aurawear Logo"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer"
          >
            <Logo width={360} height={100} />
          </Link>

          {/* Right side - Icons */}
          {/* <ActionMenu /> */}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`bg-background fixed inset-0 z-40 hidden transition-transform duration-300 ease-in-out`}
      >
        <div className="container flex h-full flex-col pt-20 pb-6">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4"
            // onClick={toggleMobileMenu}
            aria-label="Close menu"
          >
            <Menu className="h-6 w-6" />
          </Button>

          <nav className="flex-1">
            <ul className="space-y-6 text-lg">
              <li>
                <a
                  href="#"
                  className="hover:text-primary block py-2 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary block py-2 transition-colors"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary block py-2 transition-colors"
                >
                  Collections
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary block py-2 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary block py-2 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className="mt-auto">
            <div className="flex items-center space-x-4">
              <a href="#" className="text-foreground hover:text-primary">
                Instagram
              </a>
              <a href="#" className="text-foreground hover:text-primary">
                Twitter
              </a>
              <a href="#" className="text-foreground hover:text-primary">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
