// Contact information configuration
export const contactInfo = {
  email: "your.email@example.com", // Replace with actual email
  phone: "+40 728 428 170", // Replace with actual phone number (format: +country code number)
}

// Generate WhatsApp link
export function getWhatsAppLink(phone: string, message?: string): string {
  // Remove all spaces and convert 00 prefix to + for international format
  let cleanPhone = phone.replace(/\s+/g, "")
  
  // Convert 00 prefix to + (e.g., 0040 -> +40)
  if (cleanPhone.startsWith("00")) {
    cleanPhone = "+" + cleanPhone.substring(2)
  }
  
  // Remove + if present for wa.me format (wa.me uses numbers without +)
  cleanPhone = cleanPhone.replace(/\+/g, "")
  
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : ""
  return `https://wa.me/${cleanPhone}${encodedMessage}`
}

// Generate mailto link
export function getEmailLink(email: string, subject?: string, body?: string): string {
  const params: string[] = []
  if (subject) {
    params.push(`subject=${encodeURIComponent(subject)}`)
  }
  if (body) {
    // encodeURIComponent keeps spaces as %20 which avoids + characters showing in some email clients
    params.push(`body=${encodeURIComponent(body)}`)
  }
  const queryString = params.join("&")
  return `mailto:${email}${queryString ? `?${queryString}` : ""}`
}

