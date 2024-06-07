const express = require("express");
const nodemailer = require("nodemailer");
const { mjml2html } = require("mjml");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());  


function getConfirmationNoti() {
  return `
    <mjml>
      <mj-head>
        <mj-title>Last Minute Offer</mj-title>
        <mj-preview>Last Minute Offer...</mj-preview>
      </mj-head>
      <mj-body width="500px">
        <mj-section full-width="full-width" background-color="#efefef">
          <mj-column>
            <mj-image src="https://static.wixstatic.com/media/5cb24728abef45dabebe7edc1d97ddd2.jpg" />
          </mj-column>
        </mj-section>
        <mj-section>
          <mj-column>
            <mj-button padding="20px" background-color="#346DB7" href="https://www.wix.com/">
              I like it!
            </mj-button>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `;
}

app.post("/send-email", async (req, res) => {
  const { to, subject } = req.body;

  // Validate request data
  if (!to || !subject) {
    return res.status(400).send("Missing 'to' or 'subject' in request body");
  }

  // Verify that environment variables are loaded
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Missing EMAIL_USER or EMAIL_PASS environment variables");
    return res.status(500).send("Server configuration error");
  }

  // Get MJML content
  const mjmlContent = getConfirmationNoti();
  const { html, errors } = mjml2html(mjmlContent);

  if (errors.length > 0) {
    console.error("MJML rendering errors:", errors);
    return res.status(500).send("Error rendering email template");
  }

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "apikey",
      pass: "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",
    },
  });

  // Email options
  const mailOptions = {
    from: `"DUC NAILS" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: subject,
    html: html,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
