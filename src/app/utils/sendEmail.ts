import nodemailer from 'nodemailer';
import config from '../config';

// ─── Transporter ─────────────────────────────────────────────────────────────
const createTransporter = () =>
  nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.email_user,
      pass: config.email_pass,
    },
  });

// ─── Templates ───────────────────────────────────────────────────────────────
export const otpEmailTemplate = (data: { name?: string; otp: string }) => {
  const userName = data.name || 'User';
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .otp-box { background-color: #f4f4f4; padding: 20px; text-align: center; border-radius: 5px; margin: 20px 0; }
        .otp-code { font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Email Verification OTP</h2>
        <p>Hello ${userName},</p>
        <p>Use the following OTP code to verify your email and submit your review:</p>
        <div class="otp-box">
          <div class="otp-code">${data.otp}</div>
        </div>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    </body>
    </html>
  `;
};

export const emailUpdateOtpTemplate = (data: {
  name?: string;
  otp: string;
  newEmail: string;
}) => {
  const userName = data.name || 'User';
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .otp-box { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; text-align: center; border-radius: 10px; margin: 24px 0; }
        .otp-code { font-size: 36px; font-weight: bold; color: #ffffff; letter-spacing: 8px; }
        .info { background: #f8f9fa; border-left: 4px solid #667eea; padding: 12px 16px; border-radius: 4px; margin: 16px 0; }
        .footer { color: #888; font-size: 13px; margin-top: 24px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2 style="color:#667eea;">📧 Email Update Request</h2>
        <p>Hello <strong>${userName}</strong>,</p>
        <p>We received a request to update your account email to:</p>
        <div class="info">
          <strong>${data.newEmail}</strong>
        </div>
        <p>Enter the OTP below to confirm this change:</p>
        <div class="otp-box">
          <div class="otp-code">${data.otp}</div>
        </div>
        <p>This OTP will expire in <strong>10 minutes</strong>.</p>
        <p class="footer">If you did not request this change, please ignore this email. Your current email will remain unchanged.</p>
      </div>
    </body>
    </html>
  `;
};

export const passwordChangedTemplate = (data: { name?: string }) => {
  const userName = data.name || 'User';
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .alert { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 20px; border-radius: 10px; text-align: center; color: white; margin: 20px 0; }
        .footer { color: #888; font-size: 13px; margin-top: 24px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2 style="color:#11998e;">🔐 Password Changed Successfully</h2>
        <p>Hello <strong>${userName}</strong>,</p>
        <div class="alert">
          <p style="margin:0; font-size:16px;">Your password has been updated successfully.</p>
        </div>
        <p>You have been automatically logged in with your new credentials.</p>
        <p class="footer">If you did not make this change, please contact support immediately.</p>
      </div>
    </body>
    </html>
  `;
};

// ─── Contact Notification Template ──────────────────────────────────────────
export const contactNotificationTemplate = (data: {
  name: string;
  email?: string;
  phone?: string;
  subject: string;
  message: string;
}) => {
  const now = new Date();
  const date = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const time = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0; padding:0; font-family: -apple-system, 'Segoe UI', Roboto, sans-serif; background:#f4f4f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5; padding:24px 0;">
        <tr>
          <td align="center">
            <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #e4e4e7;">

              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg, #6366f1, #8b5cf6); padding:20px 24px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <span style="font-size:20px; line-height:1;">💬</span>
                        <span style="font-size:16px; font-weight:600; color:#fff; margin-left:8px; vertical-align:middle;">New Contact Message</span>
                      </td>
                      <td align="right">
                        <span style="font-size:12px; color:rgba(255,255,255,0.8);">${date} • ${time}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding:20px 24px;">

                  <!-- Info rows -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; color:#27272a;">
                    <tr>
                      <td style="padding:8px 0; color:#71717a; width:70px; vertical-align:top;">Name</td>
                      <td style="padding:8px 0; font-weight:600;">${data.name}</td>
                    </tr>
                    ${
                      data.email
                        ? `<tr>
                      <td style="padding:8px 0; color:#71717a; vertical-align:top;">Email</td>
                      <td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#6366f1; text-decoration:none;">${data.email}</a></td>
                    </tr>`
                        : ''
                    }
                    ${
                      data.phone
                        ? `<tr>
                      <td style="padding:8px 0; color:#71717a; vertical-align:top;">Phone</td>
                      <td style="padding:8px 0;"><a href="tel:${data.phone}" style="color:#6366f1; text-decoration:none;">${data.phone}</a></td>
                    </tr>`
                        : ''
                    }
                    <tr>
                      <td style="padding:8px 0; color:#71717a; vertical-align:top;">Subject</td>
                      <td style="padding:8px 0; font-weight:500;">${data.subject}</td>
                    </tr>
                  </table>

                  <!-- Divider -->
                  <div style="height:1px; background:#e4e4e7; margin:12px 0;"></div>

                  <!-- Message -->
                  <p style="font-size:12px; color:#a1a1aa; text-transform:uppercase; letter-spacing:0.5px; margin:0 0 8px 0;">Message</p>
                  <div style="background:#fafafa; border-left:3px solid #8b5cf6; padding:12px 16px; border-radius:0 6px 6px 0;">
                    <p style="font-size:14px; line-height:1.6; color:#3f3f46; margin:0; white-space:pre-wrap;">${data.message}</p>
                  </div>

                  ${
                    data.email
                      ? `<!-- Reply Button -->
                  <div style="margin-top:20px; text-align:center;">
                    <a href="mailto:${data.email}?subject=Re: ${data.subject}" style="display:inline-block; background:#6366f1; color:#fff; text-decoration:none; padding:10px 24px; border-radius:6px; font-size:13px; font-weight:600;">
                      Reply to ${data.name}
                    </a>
                  </div>`
                      : ''
                  }

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:14px 24px; background:#fafafa; border-top:1px solid #e4e4e7; text-align:center;">
                  <p style="font-size:11px; color:#a1a1aa; margin:0;">Portfolio Contact Form • © ${new Date().getFullYear()}</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

// ─── Send Helper ─────────────────────────────────────────────────────────────
export const sendEmail = async (
  to: string,
  html: string,
  subject?: string,
  replyTo?: string,
  fromName?: string,
) => {
  const transporter = createTransporter();

  const result = await transporter.sendMail({
    from: `"${fromName || 'Portfolio Admin'}" <${config.email_user || 'sujon.fullstack@gmail.com'}>`,
    to,
    subject: subject || 'Email Verification ✔',
    ...(replyTo && { replyTo }),
    html,
  });

  return result;
};
