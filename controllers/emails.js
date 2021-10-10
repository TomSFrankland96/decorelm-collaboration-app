const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



module.exports.sendEmail = async (req, res) => {
  const msg = {
    to: req.body.recipient,
    from: 'enquiries@decorelm.com', // Use the email address or domain you verified above
    subject: req.body.subject,
    text: req.body.message,
  };
  //ES8
  (async () => {
    try {
      await sgMail.send(msg);
      req.flash('success', 'Successfully sent email!');
      res.redirect('/emails');
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
        req.flash('error', 'Failed to send email!');
        res.redirect('/emails');
      }
    }
  })();
}
