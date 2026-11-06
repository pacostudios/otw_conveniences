/** Store-wide details. Change them here and the whole site updates. */
export const STORE = {
  name: "OTW Convenience Store",
  /** Shown at the top of the cart. */
  deliveryNote: "Free courier delivery",
  /**
   * Country code and number, digits only, for example "15551234567".
   * While this is empty, all WhatsApp links are hidden.
   */
  whatsappNumber: "61494783896",
};

export const WHATSAPP_URL = STORE.whatsappNumber
  ? `https://wa.me/${STORE.whatsappNumber}`
  : undefined;
