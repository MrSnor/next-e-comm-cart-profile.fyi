import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TicketIcon } from "@heroicons/react/24/outline";
import { Discount } from "@/types";

export function DiscountAlert({ discountData }: { discountData: Discount[] }) {
  return (
    <Alert className="border-0 ring-2 ring-my-accent-800 bg-my-accent-950">
      <div>
        <AlertTitle>
          <TicketIcon className="w-6 h-6 inline-block" />
        </AlertTitle>
        <AlertDescription>
          {discountData.map((item) => (
            <div key={item.code} className="mt-2">
              <span className="select-all selection:bg-my-background-700 selection:text-my-text-950 font-semibold">
                {item.code}
              </span>{" "}
              -{" "}
              {item.discountType === "percentage"
                ? `${item.discount}% off`
                : `$${item.discount} off`}
            </div>
          ))}
        </AlertDescription>
      </div>
    </Alert>
  );
}
