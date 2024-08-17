import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TruckIcon, TicketIcon } from "@heroicons/react/24/outline";
import CountUp from "react-countup";

export function DeliveryChargeALert({
  deliveryCharge = 75,
  subTotal,
}: {
  deliveryCharge: number;
  subTotal: number;
}) {
  return (
    <Alert className="border-0 ring-2 ring-my-accent-800 bg-my-accent-950">
      <div>
        <AlertDescription className="flex items-center gap-2">
          <TruckIcon className="w-6 h-6 inline-block" />
          {subTotal > 75 ? (
            "Congrats! You get free standard shipping."
          ) : (
            <span>
              You&apos;re{" "}
              <CountUp
                start={0}
                end={subTotal - deliveryCharge}
                preserveValue
                prefix="$"
              />{" "}
              away from free shipping.
            </span>
          )}
        </AlertDescription>
      </div>
    </Alert>
  );
}
