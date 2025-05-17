import { Resend } from 'resend';

if (!process.env.NEXT_PUBLIC_RESEND_API) {
  throw new Error('Missing Resend API key');
}

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API);

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function sendEmail({ to, subject, html, from = 'MCRC <noreply@mcrchoward.org>', replyTo }: EmailOptions) {
  try {
    const data = await resend.emails.send({
      from,
      to,
      subject,
      html,
      replyTo,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send email');
  }
}

export async function sendContactFormEmail(formData: ContactFormData) {
  const { name, email, phone, subject, message } = formData;

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `;

  return sendEmail({
    to: 'derrick.valentine@gmail.com', // Replace with your admin email
    subject: `New Contact Form: ${subject}`,
    html,
    replyTo: email,
  });
}

// Add more email templates as needed
export async function sendEventReminderEmail(to: string, eventName: string, eventDate: string, eventDetails: string) {
  const html = `
    <h2>Event Reminder: ${eventName}</h2>
    <p>This is a reminder about your upcoming event:</p>
    <p><strong>Date:</strong> ${eventDate}</p>
    <p><strong>Details:</strong></p>
    <p>${eventDetails}</p>
  `;

  return sendEmail({
    to,
    subject: `Reminder: ${eventName}`,
    html,
  });
} 