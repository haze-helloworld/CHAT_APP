export const welcomeTemplate = (email ,name) => `
  <div style="font-family: monospace, sans-serif; background-color: rgb(0, 19, 39); padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: rgb(9, 56, 72); border-radius: 10px; padding: 30px; text-align: center;">
      
    <img src="https://res.cloudinary.com/dqfwkavre/image/upload/v1776953655/cat_puhcng.png" alt="CAT" style="width: 100px; margin-bottom: 20px;" />
      <h1 style="color: #ebebeb;">Welcome to Chatty</h1>
      
      <p style="font-size: 20px; color: #a3a2f8;">
        Hey <strong>${name}</strong>, we're excited to have you onboard!
      </p>
      
      <p style="font-size: 16px; color: #609be3;">
        Start chatting, exploring, and enjoying the experience 🚀
      </p>

      <a href="#" style="
        display: inline-block;
        margin-top: 20px;
        padding: 12px 20px;
        background-color: #f7ff02;
        color: rgb(00, 19, 39);
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
      ">
        Get Started
      </a>

      <p style="margin-top: 30px; font-size: 12px; color: #aaa;">
        If you didn’t sign up, you can ignore this email.
      </p>

      <p style="font-size: 12px; color: #f0f0f0;">
        Cheers,<br />
        jjttanvi@gmail.com
        </p>
    </div>
  </div>
`;