import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
  email?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ message: 'Valid email is required' });
    }

    // In a real application, you would add the email to a database
    // or send it to a mailing list service.
    // For now, we'll just log it and send a success response.
    console.log(`Email received for waitlist: ${email}`);

    // Simulate sending an email to your placeholder
    // In a real app, use a library like nodemailer or an email API service
    console.log(`Simulating sending confirmation to gigacode.developer@gmail.com about ${email}`);

    res.status(200).json({ message: 'Successfully joined the Girth Waits List!', email });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
} 