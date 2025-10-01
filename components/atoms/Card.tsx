import { Card as ShadCard, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function Card({ title, description, children }: CardProps) {
  return (
    <ShadCard className="w-full p-4 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </ShadCard>
  );
}
