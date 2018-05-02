### 项目说明

本文档是对yeoman生成项目的简单说明，如果之后不需要了🙅‍，可以删掉。

#### 关于dll

yoeman初始化项目的时候会自动使用**webpack.dll.js**的配置打包生成dll文件，默认包含['react', 'react-dom', 'react-router-dom'], 可以自己修改相应配置并运行 `yarn dll`

#### 启动项目

运行 `yarn start` 轻松愉快

#### 访问

由于是多页项目，最后产出多个html，访问的时候需要对照**src/pages/**下的目录来访问，比如**http://localhost:9000/static/views/demo.html#/demo1**， **http://localhost:9000/static/views/home.html**

#### SSR支持

如果需要支持服务端渲染，可以运行`yarn client` 在根目录client目录下生成babel编译后的react组件，再通过拷贝到服务端或者关联的方式进行服务端渲染。


#### 关于模板index.html

如果你不需要实现SSR，可以讲index.html中的hbs模板的变量删除，并且在entry.js中使用**render**方法，不过直接使用**hydrate**方式也并没有什么问题。