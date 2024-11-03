import { Label } from "@/components/ui/label";

export default function InfoCardField({ label = " - ", value = "N/A" }) {
  return (
    <div>
      <Label className="text-sm font-normal text-gray-500">{label}</Label>
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  );
}
