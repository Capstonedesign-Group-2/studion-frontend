/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['studion-s3.s3.ap-northeast-2.amazonaws.com']
  }
}
