import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ListItem {
  title: string;
  description: string;
  link: string;
}

interface ListThreeColProps {
  listData: {
    title: string;
    description: string;
    items: ListItem[];
  };
  lightBackground?: boolean;
}

export default function ListThreeCol({ listData, lightBackground }: ListThreeColProps) {
  return (
    <Card className={`w-full ${lightBackground ? 'bg-primary-foreground' : ''}`}>
      <CardContent className="p-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{listData.title}</h3>
          <p className="text-sm text-muted-foreground">{listData.description}</p>
        </div>

        <Separator className="my-6" />

        <div className="space-y-6">
          {listData.items.map((item, index) => (
            <div key={index} className="grid gap-4 sm:grid-cols-3">
              <dt className="font-medium">{item.title}</dt>
              <dd className="flex items-center justify-between sm:col-span-2">
                <span className="text-sm text-muted-foreground">{item.description}</span>
                <Button variant="ghost" size="sm" asChild className="ml-4">
                  <Link href={item.link}>
                    Sign up <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </dd>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
