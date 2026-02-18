import nodemailer from 'nodemailer';
import config from '../config';

// ─── Transporter ─────────────────────────────────────────────────────────────
const createTransporter = () =>
  nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.email_user || 'mdsujon258549@gmail.com',
      pass: config.email_pass || 'zxyr hvfh yhat mree',
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

// ─── Send Helper ─────────────────────────────────────────────────────────────
export const sendEmail = async (to: string, html: string, subject?: string) => {
  const transporter = createTransporter();

  const result = await transporter.sendMail({
    from: `"Portfolio Admin" <${config.email_user || 'mdsujon258549@gmail.com'}>`,
    to,
    subject: subject || 'Email Verification ✔',
    text: 'Hi there, we received a request to verify your email. If you did not make this request, you can safely ignore this email.',
    html,
  });

  return result;
};
