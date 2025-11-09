// Contact information configuration
export const contactInfo = {
  email: "your.email@example.com", // Replace with actual email
  phone: "+40 123 456 789", // Replace with actual phone number (format: +country code number)
}

// Generate WhatsApp link
export function getWhatsAppLink(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/\s+/g, "").replace(/\+/g, "")
  const encodedMessage = message ? `&text=${encodeURIComponent(message)}` : ""
  return `https://wa.me/${cleanPhone}${encodedMessage}`
}

// Generate mailto link
export function getEmailLink(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams()
  if (subject) params.append("subject", subject)
  if (body) params.append("body", body)
  const queryString = params.toString()
  return `mailto:${email}${queryString ? `?${queryString}` : ""}`
}

