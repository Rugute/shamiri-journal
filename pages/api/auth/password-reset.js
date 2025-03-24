import nodemailer from 'nodemailer';

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const { email } = req.body;

	if (!email) {
		return res.status(400).json({ error: 'Email is required' });
	}

	try {
		// Create a transporter for sending emails
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS, // Ensure this is an app-specific password generated in your Google account
			},
		});

		// Generate a reset token (for demonstration purposes, use a random string)
		const resetToken = Math.random().toString(36).slice(2);

		// Send the email
		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: 'Shamiri Personal Journal Password Reset',
			text: `Use this token to reset your password: ${resetToken}`,
		});

		return res.status(200).json({ message: 'Password reset email sent' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal server error' });
	}
}
