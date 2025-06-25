export function formatPhoneNumber(phone: string): string {
  if (!phone) return "";
  
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 10) {
    // Formato estándar de 10 dígitos
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith("1")) {
    // Si empieza con 1 (US code)
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  } else {
    // Si tiene otro formato, lo devuelve como está (o puedes personalizar más)
    return phone;
  }
}
