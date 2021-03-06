
const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');

module.exports = {
  mode: 'production',
  entry: {
    // 项目中用到该依赖库文件
    vendor: ['react', 'react-dom']
  },
  // 输出文件
  output: {
    // 文件名称
    filename: '[name].dll.js', 
    // 将输出的文件放到dist目录下
    path: path.resolve(__dirname, '../dll'),
    /*
     存放相关的dll文件的全局变量名称，比如对于jquery来说的话就是 _dll_jquery, 在前面加 _dll
     是为了防止全局变量冲突。
    */
    library: '_dll_[name]'
  },
  plugins: [
    // 使用插件 DllPlugin
    new DllPlugin({
      /*
       该插件的name属性值需要和 output.library保存一致，该字段值，也就是输出的 manifest.json文件中name字段的值。
       比如在jquery.manifest文件中有 name: '_dll_jquery'
      */
      name: '_dll_[name]',

      /* 生成manifest文件输出的位置和文件名称 */
      path: path.resolve(__dirname, '../dll', '[name].manifest.json')
    })
  ]
}