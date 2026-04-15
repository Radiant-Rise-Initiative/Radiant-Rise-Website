import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        if (!process.env.RESEND_API_KEY) {
            console.error('Missing RESEND_API_KEY in environment variables');
            return NextResponse.json({ error: 'Mail server configuration missing' }, { status: 500 });
        }
        const { name, email, subject, message, company, type } = await request.json();

        // Construct formatting based on type (form/newsletter)
        let emailContent = "";
        // Refine the detailed subject for the orange header (replace | with em-dash —)
        let finalSubject = subject.replace(' | ', ' — ');

        if (type === 'newsletter') {
            finalSubject = "Newsletter Subscription";
            emailContent = `
                <div style="font-family: sans-serif; padding: 20px; color: #1a1a1a;">
                    <h2 style="color: #CD5929; border-bottom: 2px solid #f5f5f7; padding-bottom: 10px; margin-bottom: 20px; font-size: 18px; font-weight: 600; letter-spacing: -0.01em;">${finalSubject}</h2>
                    <p>A new user has requested to join the Radiant Rise newsletter community.</p>
                    <div style="background: #f5f5f7; padding: 20px; border-radius: 4px; border-left: 4px solid #CD5929;">
                        <p style="margin: 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Subscriber Email</p>
                        <p style="margin: 0; font-size: 18px; font-weight: 600;"><a href="mailto:${email}" style="color: black; text-decoration: none;">${email}</a></p>
                    </div>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
                    <p style="font-size: 12px; color: #666;">Sent from Radiant Rise Website</p>
                </div>
            `;
        } else {
            emailContent = `
                <div style="font-family: sans-serif; padding: 20px; color: #1a1a1a; max-width: 600px;">
                    <h2 style="color: #CD5929; border-bottom: 2px solid #f5f5f7; padding-bottom: 12px; margin-bottom: 24px; font-size: 20px; font-weight: 600; letter-spacing: -0.01em;">${finalSubject}</h2>
                    
                    <div style="margin-bottom: 24px;">
                        <p style="margin: 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Sender Information</p>
                        <p style="margin: 0; font-size: 16px;"><strong>${name}</strong> (<a href="mailto:${email}" style="color: #CD5929;">${email}</a>)</p>
                    </div>

                    ${company ? `
                        <div style="margin-bottom: 24px; padding: 15px; background: #fff; border: 1px solid #f0f0f0;">
                            <p style="margin: 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Organization / Company</p>
                            <p style="margin: 0; font-size: 16px; font-weight: 600;">${company}</p>
                        </div>
                    ` : ""}

                    <div style="background: #f5f5f7; padding: 24px; border-radius: 4px;">
                        <p style="margin: 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Message Details</p>
                        <div style="white-space: pre-wrap; margin: 0; line-height: 1.6; font-size: 16px; color: #333;">${message}</div>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0 20px 0;" />
                    <p style="font-size: 12px; color: #999; text-align: center;">This message was generated via the Radiant Rise contact system.</p>
                </div>
            `;
        }

        // Generate the specific inbox subject (the "top one")
        let inboxSubject = "";
        if (type === 'newsletter') {
            inboxSubject = "New Newsletter Subscription";
        } else {
            // Mapping for dynamic form types
            const formType = subject.split(' | ')[0];
            const subjectMap: Record<string, string> = {
                "Partner With Us": "New Partnership Message",
                "Join Our Team": "New Recruitment Message",
                "Support Us": "New Support Message"
            };
            inboxSubject = subjectMap[formType] || `New Website Message: ${name}`;
        }

        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'Radiant Rise <info@radiantriseinitiative.org>',
            to: ['info@radiantriseinitiative.org'],
            subject: inboxSubject,
            html: emailContent,
            replyTo: email,
        });

        if (error) {
            console.error('Detailed Resend API Error:', JSON.stringify(error, null, 2));
            return NextResponse.json({ error }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Email API Error:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
