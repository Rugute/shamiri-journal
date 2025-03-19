import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default Auth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // You can validate the username and password against your DB here
        const user = await findUser(credentials.username);
        if (user && bcrypt.compareSync(credentials.password, user.passwordHash)) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
});
