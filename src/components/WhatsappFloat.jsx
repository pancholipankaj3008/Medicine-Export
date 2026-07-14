import { MessageCircle, Phone } from "lucide-react";

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/919313879663?text=Hello%2C%20we%20are%20interested%20in%20sourcing%20pharmaceutical%20products%20from%20your%20company.%20Please%20connect."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="relative">
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-green-500 opacity-70 animate-ping"></span>

        {/* Button */}
        <div className="relative bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg">
          <MessageCircle size={37} />
          <Phone
            size={20}
            fill="white"
            strokeWidth={0}
            className="absolute"
            style={{ bottom: "19.6px", right: "20.5px" }}
          />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppFloat;
