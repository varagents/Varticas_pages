import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, profession, experience, organization, source, integrations, useCase } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  // Supabase Integration
  const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error: dbError } = await supabase.from("beta_testers").insert({
    name,
    email,
    profession,
    experience,
    organization,
    referral_source: source,
    requested_integrations: (integrations && Array.isArray(integrations) && integrations.length > 0) ? integrations : null,
    use_case: useCase,
  });

  if (dbError) {
    console.error("Supabase insert error:", dbError);
    return res.status(500).json({ message: "Database insert failed." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: ["barnawalraj001@gmail.com", "soumyajit@varticas.com"],
    subject: "New Varticas Beta User Application",
    text: `
Name: ${name}
Email: ${email}
Profession: ${profession || "N/A"}
Experience: ${experience || "N/A"}
Organization: ${organization || "N/A"}
Referral Source: ${source || "N/A"}
Requested Integrations: ${integrations ? integrations.join(", ") : "N/A"}
Use Case: ${useCase || "N/A"}
    `.trim(),
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Application submitted successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Failed to submit application." });
  }
}
