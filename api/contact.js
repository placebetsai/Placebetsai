const nodemailer = require('nodemailer');

module.exports = async function (context, req) {
  if (req.method !== 'POST') return context.res.status(405).json({ error: 'Method not allowed' });

  const { name, email, message } = req.body;
  if (!name || !email || !message) return context.res.status(400).json({ error: 'Missing fields' });

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: 'placebetsai@gmail.com',
      subject: `Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    context.res.json({ message: 'Email sent' });
  } catch (error) {
    console.error(error);
    context.res.status(500).json({ error: 'Failed to send email' });
  }
};
