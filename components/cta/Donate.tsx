import { HandHeart, UserRoundCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const Donate = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-7xl bg-primary-foreground">
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
              <Link href="/resources/donate">
                <Button>Get Started</Button>
              </Link>
              <Link href="/resources/volunteer">
                <Button variant="outline">How You Can Help</Button>
              </Link>
            </div>
          </div>
          <div className="flex grow basis-5/12 flex-col justify-between border-t lg:border-t-0 lg:border-l">
            <Link
              href="/resources/donate"
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
            </Link>
            <Separator />
            <Link
              href="/resources/volunteer"
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
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Donate };
