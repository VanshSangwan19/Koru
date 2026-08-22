import { config } from "../config/index.js";

export async function sendContactNotification(submission) {
  const { notifyEmail, host, port, user, pass } = config.smtp;

  if (!notifyEmail || !host || !user || !pass) {
    console.log("[mail] SMTP not configured, skipping notification");
    return false;
  }

  try {
    const nodemailer = (await import("nodemailer")).default;
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Koru Website" <${user}>`,
      to: notifyEmail,
      replyTo: submission.email,
      subject: `New project request from ${submission.name}`,
      text: [
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Phone: ${submission.phone || "—"}`,
        `Company: ${submission.company || "—"}`,
        `Project type: ${submission.projectType || "—"}`,
        `Budget: ${submission.budget || "—"}`,
        ``,
        `Message:`,
        submission.message,
      ].join("\n"),
    });

    console.log("[mail] notification sent");
    return true;
  } catch (err) {
    console.error("[mail] failed to send notification:", err.message);
    return false;
  }
}
