import * as dotenv from 'dotenv';

dotenv.config();

export const getConfig = () => {
  const { env } = process;

  return {
    env: env.NODE_ENV,
    port: env.PORT || 3002,
    databases: {
      mysql: {
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_DATABASE,
        host: env.HOST,
        port: env.DB_PORT,
      },
    },
    jwt: {
      accessTokenSecret: env.JWT_SECRET
    },
    aws: {
      accessKeyID: env.AWS_ACCESS_KEY_ID,
      secretKey: env.AWS_SECRET_KEY,
      region: env.AWS_REGION,
      bucketName: env.AWS_BUCKET_NAME
    }
  };
};
