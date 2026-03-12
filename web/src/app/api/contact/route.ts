import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactPayload {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

function formatDate(): string {
  return new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    dateStyle: "full",
    timeStyle: "short",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactPayload;
    const timestamp = formatDate();

    const htmlBody = `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;border:2px solid #1a2744;border-radius:8px;overflow:hidden">
  <div style="background:#1a2744;padding:20px 24px;color:#fff">
    <h1 style="margin:0;font-size:18px;letter-spacing:1px">PESAN KONTAK — LAPOR PAK MANANG</h1>
    <p style="margin:6px 0 0;font-size:12px;color:#c8a84e">${timestamp}</p>
  </div>
  <div style="padding:24px">
    <table style="width:100%;border-collapse:collapse;font-size:14px;color:#333">
      <tr style="background:#f8f9fa"><td style="padding:10px 12px;font-weight:600;width:120px;border-bottom:1px solid #e9ecef">Nama</td><td style="padding:10px 12px;border-bottom:1px solid #e9ecef">${body.fullName}</td></tr>
      <tr><td style="padding:10px 12px;font-weight:600;border-bottom:1px solid #e9ecef">Email</td><td style="padding:10px 12px;border-bottom:1px solid #e9ecef"><a href="mailto:${body.email}">${body.email}</a></td></tr>
      <tr style="background:#f8f9fa"><td style="padding:10px 12px;font-weight:600;border-bottom:1px solid #e9ecef">Subjek</td><td style="padding:10px 12px;border-bottom:1px solid #e9ecef"><strong>${body.subject}</strong></td></tr>
    </table>
    <div style="margin-top:16px;padding:16px;background:#f8f9fa;border-radius:6px;border-left:4px solid #c8a84e">
      <p style="margin:0 0 6px;font-weight:600;font-size:13px;color:#1a2744">Pesan</p>
      <p style="margin:0;font-size:14px;color:#333;white-space:pre-wrap;line-height:1.6">${body.message}</p>
    </div>
  </div>
  <div style="background:#f8f9fa;padding:12px 24px;text-align:center;font-size:11px;color:#666;border-top:1px solid #e9ecef">
    Dikirim melalui halaman Kontak <strong>LAPOR PAK MANANG</strong>
  </div>
</div>`.trim();

    const textBody =
      `PESAN KONTAK — LAPOR PAK MANANG\n` +
      `Waktu: ${timestamp}\n\n` +
      `Nama : ${body.fullName}\n` +
      `Email: ${body.email}\n` +
      `Subjek: ${body.subject}\n\n` +
      `Pesan:\n${body.message}`;

    let emailSent = false;
    const notifyEmail = process.env.NOTIFY_EMAIL || "adithyodw@gmail.com";

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"LAPOR PAK MANANG" <${process.env.SMTP_USER || notifyEmail}>`,
        to: notifyEmail,
        replyTo: body.email,
        subject: `[Kontak] ${body.subject}`,
        text: textBody,
        html: htmlBody,
      });
      emailSent = true;
    } catch (emailErr) {
      console.error("Contact email send failed:", emailErr);
    }

    const waNumber = process.env.NOTIFY_WHATSAPP || "6590616870";
    const waText = encodeURIComponent(
      `💬 *PESAN KONTAK — LAPOR PAK MANANG*\n\n` +
        `📅 ${timestamp}\n` +
        `👤 *Nama:* ${body.fullName}\n` +
        `📧 *Email:* ${body.email}\n\n` +
        `📋 *Subjek:* ${body.subject}\n\n` +
        `💬 *Pesan:*\n${body.message}\n\n` +
        `—\n_Dikirim via halaman Kontak LAPOR PAK MANANG_`
    );
    const waUrl = `https://wa.me/${waNumber}?text=${waText}`;

    return NextResponse.json({ success: true, emailSent, waUrl });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { success: false, error: "Gagal mengirim pesan" },
      { status: 500 }
    );
  }
}
