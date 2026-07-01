type OtpDeliveryResult = {
  ok: boolean;
  delivery: 'sent' | 'development_preview';
  error?: string;
};

const siteName = 'Alina Popova Studio';

const isDevelopmentPreviewAllowed = () => process.env.NODE_ENV !== 'production';

const getFromAddress = () => process.env.OTP_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || '';

const otpEmailHtml = (otp: string) => `
  <div style="margin:0;padding:0;background:#fff8fb;font-family:Inter,Arial,sans-serif;color:#111014;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fff8fb;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #f2d7e3;border-radius:28px;padding:34px;">
            <tr>
              <td>
                <p style="margin:0 0 12px;color:#C73572;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">Secure verification</p>
                <h1 style="margin:0;color:#111014;font-size:28px;line-height:1.15;font-weight:700;">Your Alina Popova Studio code</h1>
                <p style="margin:18px 0 0;color:#766D78;font-size:15px;line-height:1.7;">Use this 6-digit code to continue into the Campaign OS. The code expires in 10 minutes.</p>
                <div style="margin:28px 0;padding:22px;border-radius:22px;background:#fff8fb;border:1px solid #f2d7e3;text-align:center;">
                  <p style="margin:0;color:#111014;font-size:34px;line-height:1;font-weight:800;letter-spacing:0.24em;">${otp}</p>
                </div>
                <p style="margin:0;color:#766D78;font-size:13px;line-height:1.7;">If you did not request this code, you can ignore this email. Do not share this code with anyone.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
`;

const sendResendEmail = async ({ to, otp }: { to: string; otp: string }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = getFromAddress();
  if (!apiKey || !from) return { ok: false, error: 'Email verification is not configured.' };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to,
      subject: `${otp} is your ${siteName} verification code`,
      html: otpEmailHtml(otp),
      text: `Your ${siteName} verification code is ${otp}. It expires in 10 minutes. If you did not request this code, ignore this message.`,
      reply_to: process.env.OTP_REPLY_TO_EMAIL || undefined
    })
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    console.error('OTP email send failed', { status: response.status, body });
    return { ok: false, error: 'Email provider rejected the message.' };
  }

  return { ok: true };
};

const sendOtpWebhook = async ({ url, identifier, identifierType, otp }: { url: string; identifier: string; identifierType: 'email' | 'phone'; otp: string }) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.OTP_PROVIDER_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.OTP_PROVIDER_WEBHOOK_SECRET}` } : {})
    },
    body: JSON.stringify({ identifier, identifierType, otp, purpose: 'login' })
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    console.error('OTP webhook send failed', { status: response.status, body });
    return { ok: false, error: 'OTP provider rejected the message.' };
  }

  return { ok: true };
};

export const deliverOtp = async ({
  identifier,
  identifierType,
  otp
}: {
  identifier: string;
  identifierType: 'email' | 'phone';
  otp: string;
}): Promise<OtpDeliveryResult> => {
  if (identifierType === 'email' && process.env.RESEND_API_KEY) {
    const result = await sendResendEmail({ to: identifier, otp });
    return result.ok
      ? { ok: true, delivery: 'sent' }
      : { ok: false, delivery: 'sent', error: result.error };
  }

  const webhookUrl = identifierType === 'phone'
    ? process.env.WHATSAPP_OTP_PROVIDER_URL || process.env.OTP_PROVIDER_WEBHOOK_URL
    : process.env.OTP_PROVIDER_WEBHOOK_URL;

  if (webhookUrl) {
    const result = await sendOtpWebhook({ url: webhookUrl, identifier, identifierType, otp });
    return result.ok
      ? { ok: true, delivery: 'sent' }
      : { ok: false, delivery: 'sent', error: result.error };
  }

  if (isDevelopmentPreviewAllowed()) {
    return { ok: true, delivery: 'development_preview' };
  }

  return {
    ok: false,
    delivery: 'sent',
    error: identifierType === 'email'
      ? 'Email verification is not configured.'
      : 'Phone verification is not configured.'
  };
};
