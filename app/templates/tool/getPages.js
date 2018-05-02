const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const buildConfig = require('./config')



/**
 * 遍历目录
 * 
 * @param {string} path 需要遍历的路径
 */
function getFileList(path){
  let fileList = [];
  const walk = (path) => {
    const dirList = fs.readdirSync(path);
    dirList.forEach(function(item){
      if(fs.statSync(path + '/' + item).isDirectory()){
        walk(path + '/' + item);
      }else{
        fileList.push(path + '/' + item);
      }
    });
  }
  walk(path)
  return fileList
}

function webpackConfigPatch(fileList){
  const config = {
    entry: {},
    plugins: []
  }
  const ENTRY_REG = /\/pages\/(.*)\/entry\.js$/

  fileList.forEach((item) => {
    let matches = item.match(ENTRY_REG)
    if(matches !== null) {

      let pageName = matches[1].split('/').join('_')
      config.entry[pageName] = [item]

      config.plugins.push(new HtmlWebpackPlugin({
        inject: true,
        chunks: [pageName],
        template: '!!raw-loader!' + path.resolve(__dirname, '../index.html'),
        filename: `views/${pageName.split('_').join('/')}.html`,
      }))
    }
    
  })

  return config
}

module.exports = function() {
  const fileList = getFileList(path.resolve(__dirname, '../src/pages'));

  return webpackConfigPatch(fileList)
}