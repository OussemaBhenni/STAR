const singUpConfirmationEmailTemplate = (nom, API_ENDPOINT, email, confirmationCode) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Confirmation de votre inscription</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border: 2px solid goldenrod;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        h1 {
          color: goldenrod;
        }
        p {
          color: #333;
          line-height: 1.6;
        }
        a {
          color: goldenrod;
          text-decoration: none;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Bonjour ${nom},</h1>
        <p>Merci pour votre inscription.</p>
        <p>Votre nom d'utilisateur est : ${email}</p>
        <p>Veuillez suivre ce lien pour activer votre compte :</p>
        <a href="${API_ENDPOINT}/account/${confirmationCode}/enable">Je confirme que je souhaite activer mon compte</a>
        <p>Cordialement.</p>
        <p>Email from STAR E-learning platform</p>
      </div>
    </body>
  </html>
`;

const forgotPasswordEmailTemplate = (nom, email, API_ENDPOINT, token) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Réinitialisation de votre mot de passe</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border: 2px solid goldenrod;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        h1 {
          color: goldenrod;
        }
        p {
          color: #333;
          line-height: 1.6;
        }
        a {
          color: goldenrod;
          text-decoration: none;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Bonjour ${nom},</h1>
        <p>Vous avez récemment fait une demande de réinitialisation du mot de passe de votre compte : ${email}</p>
        <p>Votre code de réinitialisation est : ${token}</p>
        <p>Utilisez ce code pour commencer le processus de réinitialisation.</p>
        <p>Cordialement.</p>
        <p>Email from STAR E-learning platform</p>
      </div>
    </body>
  </html>
`;

const resetPasswordConfirmationEmailTemplate = (nom) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Confirmation de réinitialisation du mot de passe</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border: 2px solid goldenrod;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        h1 {
          color: goldenrod;
        }
        p {
          color: #333;
          line-height: 1.6;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Bonjour ${nom},</h1>
        <p>Votre mot de passe a été réinitialisé avec succès.</p>
        <p>Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.</p>
        <p>Cordialement.</p>
        <p>Email from STAR E-learning platform</p>
      </div>
    </body>
  </html>
`;

// export module
module.exports = {
  singUpConfirmationEmailTemplate,
  forgotPasswordEmailTemplate,
  resetPasswordConfirmationEmailTemplate,
};
