import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CustomInput({ label, id, type = "text", ...props }) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} {...props} />
    </div>
  );
}
