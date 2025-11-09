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
  const params = new URLSearchParams()
  if (subject) params.append("subject", subject)
  if (body) {
    // URLSearchParams will properly encode the body, converting spaces to + and newlines to %0A
    // This is correct for mailto links - email clients will decode it properly
    params.append("body", body)
  }
  const queryString = params.toString()
  return `mailto:${email}${queryString ? `?${queryString}` : ""}`
}

