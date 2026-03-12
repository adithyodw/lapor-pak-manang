import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ReportPayload {
  fullName: string;
  nik: string;
  phone: string;
  email: string;
  title: string;
  category: string;
  location: string;
  description: string;
}

function generateTrackingId(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `LPM-${ymd}-${rand}`;
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
    const body = (await req.json()) as ReportPayload;
    const trackingId = generateTrackingId();
    const timestamp = formatDate();

    const emailBody = `
══════════════════════════════════════════
  LAPORAN BARU — LAPOR PAK MANANG
══════════════════════════════════════════

Kode Pelacakan : ${trackingId}
Tanggal/Waktu  : ${timestamp}

── IDENTITAS PELAPOR ─────────────────────
Nama Lengkap   : ${body.fullName}
NIK            : ${body.nik}
Telepon        : ${body.phone}
Email          : ${body.email}

── RINCIAN KEJADIAN ──────────────────────
Judul          : ${body.title}
Kategori       : ${body.category}
Lokasi         : ${body.location}

── KRONOLOGI ─────────────────────────────
${body.description}

══════════════════════════════════════════
  Dikirim melalui platform LAPOR PAK MANANG
══════════════════════════════════════════
`.trim();

    const htmlBody = `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:640px;margin:0 auto;border:2px solid #1a2744;border-radius:8px;overflow:hidden">
  <div style="background:#1a2744;padding:20px 24px;color:#fff">
    <h1 style="margin:0;font-size:18px;letter-spacing:1px">LAPORAN BARU — LAPOR PAK MANANG</h1>
    <p style="margin:6px 0 0;font-size:12px;color:#c8a84e">Kode: <strong>${trackingId}</strong> &bull; ${timestamp}</p>
  </div>
  <div style="padding:24px">
    <table style="width:100%;border-collapse:collapse;font-size:14px;color:#333">
      <tr style="background:#f8f9fa"><td style="padding:10px 12px;font-weight:600;width:140px;border-bottom:1px solid #e9ecef">Nama Lengkap</td><td style="padding:10px 12px;border-bottom:1px solid #e9ecef">${body.fullName}</td></tr>
      <tr><td style="padding:10px 12px;font-weight:600;border-bottom:1px solid #e9ecef">NIK</td><td style="padding:10px 12px;border-bottom:1px solid #e9ecef">${body.nik}</td></tr>
      <tr style="background:#f8f9fa"><td style="padding:10px 12px;font-weight:600;border-bottom:1px solid #e9ecef">Telepon</td><td style="padding:10px 12px;border-bottom:1px solid #e9ecef">${body.phone}</td></tr>
      <tr><td style="padding:10px 12px;font-weight:600;border-bottom:1px solid #e9ecef">Email</td><td style="padding:10px 12px;border-bottom:1px solid #e9ecef">${body.email}</td></tr>
      <tr style="background:#f8f9fa"><td style="padding:10px 12px;font-weight:600;border-bottom:1px solid #e9ecef">Judul</td><td style="padding:10px 12px;border-bottom:1px solid #e9ecef"><strong>${body.title}</strong></td></tr>
      <tr><td style="padding:10px 12px;font-weight:600;border-bottom:1px solid #e9ecef">Kategori</td><td style="padding:10px 12px;border-bottom:1px solid #e9ecef">${body.category}</td></tr>
      <tr style="background:#f8f9fa"><td style="padding:10px 12px;font-weight:600;border-bottom:1px solid #e9ecef">Lokasi</td><td style="padding:10px 12px;border-bottom:1px solid #e9ecef">${body.location}</td></tr>
    </table>
    <div style="margin-top:16px;padding:16px;background:#f8f9fa;border-radius:6px;border-left:4px solid #c8a84e">
      <p style="margin:0 0 6px;font-weight:600;font-size:13px;color:#1a2744">Kronologi Kejadian</p>
      <p style="margin:0;font-size:14px;color:#333;white-space:pre-wrap;line-height:1.6">${body.description}</p>
    </div>
  </div>
  <div style="background:#f8f9fa;padding:12px 24px;text-align:center;font-size:11px;color:#666;border-top:1px solid #e9ecef">
    Dikirim melalui platform <strong>LAPOR PAK MANANG</strong>
  </div>
</div>`.trim();

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
        subject: `[LAPOR PAK MANANG] ${body.title} — ${trackingId}`,
        text: emailBody,
        html: htmlBody,
      });
      emailSent = true;
    } catch (emailErr) {
      console.error("Email send failed (SMTP not configured?):", emailErr);
    }

    const waNumber = process.env.NOTIFY_WHATSAPP || "6590616870";
    const waText = encodeURIComponent(
      `📋 *LAPORAN BARU — LAPOR PAK MANANG*\n\n` +
        `🔖 Kode: *${trackingId}*\n` +
        `📅 ${timestamp}\n\n` +
        `👤 *Pelapor:* ${body.fullName}\n` +
        `📞 ${body.phone}\n` +
        `📧 ${body.email}\n\n` +
        `📝 *Judul:* ${body.title}\n` +
        `📂 *Kategori:* ${body.category}\n` +
        `📍 *Lokasi:* ${body.location}\n\n` +
        `📖 *Kronologi:*\n${body.description}\n\n` +
        `—\n_Dikirim via LAPOR PAK MANANG_`
    );
    const waUrl = `https://wa.me/${waNumber}?text=${waText}`;

    return NextResponse.json({
      success: true,
      trackingId,
      emailSent,
      waUrl,
    });
  } catch (err) {
    console.error("Submit report error:", err);
    return NextResponse.json(
      { success: false, error: "Gagal mengirim laporan" },
      { status: 500 }
    );
  }
}
