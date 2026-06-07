export const welcomeTemplate = (email, name) => `
<div style="margin:0;padding:0;background:#291832;font-family:Arial,sans-serif;">

  <div style="padding:40px 20px;">
    <div style="
      max-width:600px;
      margin:auto;
      background:#3D284C;
      border-radius:20px;
      overflow:hidden;
      border:1px solid #BB9DD7;
      box-shadow:0 0 30px rgba(187,157,215,0.25);
    ">

      <!-- Header -->
      <div style="
        background:linear-gradient(
          180deg,
          #3D284C 0%,
          #4A335F 100%
        );
        padding:30px;
        margin:10px;
        border-radius:20px;
        text-align:center;
      ">
        <img
          src="https://res.cloudinary.com/dqfwkavre/image/upload/v1780816051/seal_mailman_e4op95.png"
          alt="Seal Chat Mascot"
          style="width:240px;height:auto;"
        />

        <h1 style="
          color:#FFFFFF;
          margin:15px 0 0;
          font-size:32px;
          font-family:'Courier New', Courier, monospace;
        ">
          Welcome To SealChat
        </h1>
      </div>

      <!-- Content -->
      <div style="padding:35px;">

        <p style="
          color:#DECAE9;
          font-size:20px;
          line-height:1.6;
          font-family:'Trebuchet MS', sans-serif;
        ">
          Hey <strong>${name}</strong>,
        </p>

        <p style="
          color:#D4BDE3;
          font-size:16px;
          line-height:1.8;
          font-family:'Trebuchet MS', sans-serif;
        ">
          Your mailbox just got a little more exciting.<br>
          <b>
            Welcome aboard SealChat — a cozy place to chat,
            connect, and share messages with friends.
          </b>
        </p>

        <div style="text-align:center;margin:35px 0;">
          <a
            href="#"
            style="
              display:inline-block;
              background:#BB9DD7;
              color:#291832;
              text-decoration:none;
              padding:16px 34px;
              border-radius:12px;
              font-weight:700;
              font-size:16px;
              font-family:'Courier New', Courier, monospace;
              box-shadow:0 4px 15px rgba(187,157,215,0.4);
            "
          >
            Start Chatting
          </a>
        </div>

        <div style="
          background:#3D284C;
          border:1px solid #BB9DD7;
          border-radius:12px;
          padding:18px;
          color:#DECAE9;
          font-size:14px;
          line-height:1.7;
          font-family:'Trebuchet MS', sans-serif;
        ">
          🦭 Your friendly seal messenger is ready to deliver
          conversations, reactions, and good vibes.
        </div>

        <p style="
          margin-top:30px;
          color:#D4BDE3;
          font-size:13px;
          font-family:'Trebuchet MS', sans-serif;
        ">
          If you didn't create this account, you can safely ignore this email.
        </p>

        <hr style="
          border:none;
          border-top:1px solid #BB9DD7;
          margin:30px 0;
        ">

        <p style="
          color:#D4BDE3;
          font-size:13px;
          text-align:center;
          font-family:'Courier New', Courier, monospace;
        ">
          Cheers,
          <br><br>
          <strong style="color:#DECAE9;">
            The SealChat Team
          </strong>
        </p>

      </div>
    </div>
  </div>

</div>
`;