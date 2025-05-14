import { HandHeart, UserRoundCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Donate = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col rounded-xl border lg:flex-row">
          <div className="grow px-8 py-8 lg:px-16">
            <Badge variant="outline">Support Our Work</Badge>
            <div className="mt-4 max-w-xl">
              <h2 className="text-3xl font-semibold md:text-4xl">
                At MCRC, we embrace the gift economy, where every service we offer is grounded in mutual support and generosity.
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                We believe that conflict resolution and restorative justice should be accessible to all, regardless of financial resources. That is why we provide our mediation and restorative justice services free of charge, trusting in the power of community to sustain the work we do together.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button>Start free trial</Button>
              <Button variant="outline">Schedule demo</Button>
            </div>
          </div>
          <div className="flex grow basis-5/12 flex-col justify-between border-t lg:border-t-0 lg:border-l">
            <a
              href="#"
              className="flex h-full items-center px-9 py-6 transition-colors hover:bg-muted/50 lg:justify-center"
            >
              <div className="flex gap-4">
                <HandHeart
                  className="size-8 shrink-0 md:size-10"
                  strokeWidth={1.5}
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold md:text-xl">
                    Donate
                  </h3>
                  <p className="max-w-lg text-muted-foreground md:text-lg">
                    Help us keep mediation free, mediation is not just a service it is a cause. A commitment to resolving conflict with the parties in the conflict.
                  </p>
                </div>
              </div>
            </a>
            <Separator />
            <a
              href="#"
              className="flex h-full items-center px-9 py-6 transition-colors hover:bg-muted/50 lg:justify-center"
            >
              <div className="flex gap-4">
                <UserRoundCheck
                  className="size-8 shrink-0 md:size-10"
                  strokeWidth={1.5}
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold md:text-xl">
                    Volunteer
                  </h3>
                  <p className="max-w-lg text-muted-foreground md:text-lg">
                    Join our mission to build stronger, more connected communities—one conversation at a time.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Donate };
