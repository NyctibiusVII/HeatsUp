/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  generateEtags: false,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  serverRuntimeConfig: {
      // Will only be available on the server side
  },
  publicRuntimeConfig: {
      // Will be available on both server and client
      DEVELOPER_NAME: process.env.DEVELOPER_NAME,
      MY_GITHUB: `${process.env.GITHUB}${process.env.DEVELOPER_NAME}`,

      ERROR_GET: `Algo deu errado. Por favor recarregue a página, se o erro persistir consulte meu contato no github: ${process.env.GITHUB}${process.env.DEVELOPER_NAME}`
  },
  images: {
      domains: ['github.com', 'avatars.githubusercontent.com', 'cdn.custom-cursor.com'],
  }
}
