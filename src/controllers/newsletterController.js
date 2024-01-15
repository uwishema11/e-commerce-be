import request from 'request';
import dotenv from 'dotenv';

dotenv.config();

const sendNewsLetter = (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const data = {
      members: [
        {
          email_address: email,
          status: 'subscribed',
          mergw_fields: {
            FNAME: firstName,
            LANAME: lastName,
          },
        },
      ],
    };
    const postData = JSON.stringify(data);
    // Make a POST request to the MailChimp API
    const options = {
      url: 'https://us21.api.mailchimp.com/3.0/lists/46c8167a3b',
      method: 'POST',
      headers: {
        Authorization: `apikey ${process.env.MAILCHIMP_APIKEY}`,
      },
      body: postData,
    };

    request(options, (err, response) => {
      if (err) {
        console.log(err);
        return res.status(404).json({
          status: false,
          message: 'failled to subscribe',
        });
      }
      if (response.statusCode === 200) {
        return res.status(201).json({
          status: true,
          message: 'Subscribed successfully',
        });
      }
      return res.status(404).json({
        status: false,
        message: 'failled to subscribe',
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export default sendNewsLetter;
