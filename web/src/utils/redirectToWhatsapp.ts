/* eslint-disable @typescript-eslint/no-explicit-any */
export function redirigirWhatsApp(phone: string, message: string = "") {
  const encodedMessage = encodeURIComponent(message);
  const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
  const isMobile =
    /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);

  const url = isMobile
    ? `https://wa.me/${phone}?text=${encodedMessage}` // móvil → app o navegador
    : `https://web.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`; // PC → WhatsApp Web

  window.open(url, "_blank");
}
