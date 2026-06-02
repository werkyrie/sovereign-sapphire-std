import { WHATSAPP_URL } from "@/lib/brand";
import { Icon } from "./icons";

export function WhatsAppFAB({ propertyName }: { propertyName: string }) {
  const href = `${WHATSAPP_URL}?text=${encodeURIComponent(
    `Hi Jerwin, I'm interested in ${propertyName}. Please send available units and pricing.`
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Inquire about ${propertyName} on WhatsApp`}
      className="property-fab"
    >
      <Icon name="whatsapp" size={26} />
    </a>
  );
}
