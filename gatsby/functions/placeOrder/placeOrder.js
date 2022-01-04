const nodemailer = require("nodemailer");

function generateOrderEmail({ order, total }) {
  return `
  <div>
  <h2>Your recent Order for ${total}</h2>
  <p>Please start walking over, we will have your 
  order ready in the next 20 minutes</p>
  <ul>
   ${order
     .map(
       (item) => `<li>
   <img src="${item.thumbnail}" alt="${item.name}" />
   ${item.size} ${item.name} - ${item.price}
   </li>`
     )
     .join("")}
  </ul>
  <p>Your total is <strong>$${total}</strong> due at pickup</p>
  <style>
    ul{
      list-style: none;
    }
  </style>
  </div>
  `;
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

//wait function to halt the execution of app
//call it with an await like: await wait()
/* function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
} */

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  //Check if they have filled out the honeypot

  if (body.shehad) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Boop Beep Bop zzzst good bye" }),
    };
  }

  //Validate data coming in is correct
  const requiredFields = ["email", "name", "order"];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops you are missing the ${field} field`,
        }),
      };
    }
  }

  //make sure user has items in order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing?!`,
      }),
    };
  }

  //send email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>`,
    subject: "New Order",
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  //send success or error message
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "success" }),
  };
};
