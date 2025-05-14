import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src="https://shadcnblocks.com/images/block/patterns/square-alt-grid.svg"
          className="opacity-90 [mask-image:radial-gradient(75%_75%_at_center,white,transparent)]"
        />
      </div>
      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
              <img
                src="https://shadcnblocks.com/images/block/block-1.svg"
                alt="logo"
                className="h-16"
              />
            </div>
            <div>
              <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                Creating Connection Through{" "}
                <span className="text-orange-400">Conversation</span>
              </h1>
              <h2 className="mb-3 text-lg font-bold tracking-tight text-pretty lg:text-3xl">
                Support Mediation. Build Stronger Communities.
              </h2>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                We offer free, confidential, and community-led mediation in Howard County. Whether you're facing family conflict or just want a better way to talk things through, we’re here to help — without judgment, pressure, or cost.
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Button className="shadow-sm transition-shadow hover:shadow">
                Request Mediation
              </Button>
              <Button variant="outline" className="group">
                Learn more{" "}
                <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
            <div className="mt-20 flex flex-col items-center gap-5">
              <p className="font-medium text-muted-foreground lg:text-left">
                Built with open-source technologies
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <img
                    src="https://shadcnblocks.com/images/block/logos/shadcn-ui-icon.svg"
                    alt="shadcn/ui logo"
                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                  />
                </a>
                <a
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <img
                    src="https://shadcnblocks.com/images/block/logos/typescript-icon.svg"
                    alt="TypeScript logo"
                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                  />
                </a>

                <a
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <img
                    src="https://shadcnblocks.com/images/block/logos/react-icon.svg"
                    alt="React logo"
                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                  />
                </a>
                <a
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <img
                    src="https://shadcnblocks.com/images/block/logos/tailwind-icon.svg"
                    alt="Tailwind CSS logo"
                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
