
import { Button } from "@/components/ui/button";

export function CustomButton({ children, ...props }) {
  return (
    <Button className="w-full" {...props}>
      {children}
    </Button>
  );
}
