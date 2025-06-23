const nodemailer = require('nodemailer');
const logger = require('./logger');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send password reset email
const sendPasswordResetEmail = async (email, resetUrl) => {
  try {
    const mailOptions = {
      from: `"Rehearsal Scheduler" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'Password Reset',
      html: `
        <h1>Reset Your Password</h1>
        <p>You requested a password reset. Please click the link below to reset your password:</p>
        <a href="${resetUrl}" style="padding: 10px 20px; background-color: #3f51b5; color: white; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
        <p>This link is valid for 30 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Password reset email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error(`Error sending password reset email: ${error.message}`);
    throw new Error('Error sending password reset email');
  }
};

// Send rehearsal invitation email
const sendRehearsalInvitation = async (email, bandName, rehearsalDetails, acceptUrl) => {
  try {
    const mailOptions = {
      from: `"Rehearsal Scheduler" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: `Rehearsal Invitation: ${bandName}`,
      html: `
        <h1>You're Invited to a Rehearsal</h1>
        <p><strong>${bandName}</strong> has invited you to a rehearsal:</p>
        <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>Date:</strong> ${new Date(rehearsalDetails.startTime).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${new Date(rehearsalDetails.startTime).toLocaleTimeString()} - ${new Date(rehearsalDetails.endTime).toLocaleTimeString()}</p>
          <p><strong>Location:</strong> ${rehearsalDetails.location.name}, ${rehearsalDetails.location.address}</p>
          ${rehearsalDetails.description ? `<p><strong>Details:</strong> ${rehearsalDetails.description}</p>` : ''}
        </div>
        <a href="${acceptUrl}" style="padding: 10px 20px; background-color: #3f51b5; color: white; text-decoration: none; border-radius: 5px;">
          Respond to Invitation
        </a>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Rehearsal invitation email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error(`Error sending rehearsal invitation email: ${error.message}`);
    throw new Error('Error sending rehearsal invitation email');
  }
};

// Send rehearsal reminder email
const sendRehearsalReminder = async (email, bandName, rehearsalDetails) => {
  try {
    const mailOptions = {
      from: `"Rehearsal Scheduler" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: `Rehearsal Reminder: ${bandName}`,
      html: `
        <h1>Upcoming Rehearsal Reminder</h1>
        <p>This is a reminder about your upcoming rehearsal with <strong>${bandName}</strong>:</p>
        <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>Date:</strong> ${new Date(rehearsalDetails.startTime).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${new Date(rehearsalDetails.startTime).toLocaleTimeString()} - ${new Date(rehearsalDetails.endTime).toLocaleTimeString()}</p>
          <p><strong>Location:</strong> ${rehearsalDetails.location.name}, ${rehearsalDetails.location.address}</p>
          ${rehearsalDetails.description ? `<p><strong>Details:</strong> ${rehearsalDetails.description}</p>` : ''}
        </div>
        <p>Don't forget to bring your instrument and any materials needed for the rehearsal.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Rehearsal reminder email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error(`Error sending rehearsal reminder email: ${error.message}`);
    throw new Error('Error sending rehearsal reminder email');
  }
};

module.exports = {
  sendPasswordResetEmail,
  sendRehearsalInvitation,
  sendRehearsalReminder,
};
