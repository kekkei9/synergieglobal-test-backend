import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    baseUrl: {
      backend: process.env.BASE_URL,
      frontend: process.env.CLIENT_BASE_URL,
    },
    url: {
      shortLinkExpiration: process.env.SHORT_LINK_EXPIRATION,
    },
    database: {
      port: process.env.DATABASE_PORT,
    },
    postgres: {
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      name: process.env.POSTGRES_NAME,
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
    },
    jwt: {
      jwtSecret: process.env.JWT_SECRET,
      jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
      refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
      accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
    },
  };
});
