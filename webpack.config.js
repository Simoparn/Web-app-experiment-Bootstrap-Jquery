// ...

const webpack = require('webpack');
const path = require('path');


const config = {
  entry: './src/index.js',
  mode: "none",
  resolve: {
    fallback: { 
      "zlib": false ,
      "querystring": false,
      "stream": false,
      "crypto": false,
      "http": false,
      "path": false,
      "url": false,
      "buffer": false,
      "util": false,
      "net": false,
      "fs": false,
      "dgram" : false,
      "pg-native" : false,
      "mock-aws-s3" : false,
      "aws-sdk" : false,
      "nock" : false,
      "child-process" : false,
      "child_process" : false,
      "node-gyp": false,
      "nw-pre-gyp": false,
      "npm": false
      
      

    }
    
  },



  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
  rules: [   
    {
      test: /\.css$/,
      use: ['style-loader','css-loader']
    },
    {
      test: /\.html$/,
      use: ['style-loader','html-loader']
    }

  ],

  }
};
module.exports = config;
// ...