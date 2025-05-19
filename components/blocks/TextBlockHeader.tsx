import React from 'react'
import { cn } from "@/lib/utils";
interface TextBlockHeaderProps {
  title: string;
  description: string;
  textBlockCenter?: boolean;
}

const TextBlockHeader = ({ title, description, textBlockCenter = false }: TextBlockHeaderProps) => {
  return (
    <div className={cn(textBlockCenter && "text-center")}>
      <h2 className="mb-3 text-xl font-semibold md:mb-4 md:text-3xl lg:mb-6">
        {title}
      </h2>
      <p className="mb-4 text-muted-foreground lg:text-lg">
        {description}
      </p>
    </div>
  )
}
export default TextBlockHeader