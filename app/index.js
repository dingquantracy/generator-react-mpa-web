const Generator = require('yeoman-generator')
const glob = require('glob')
// const mkdirp = require('mkdirp')
const fs = require('fs')

console.log(require.resolve('yeoman-generator'))

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    // Next, add your custom code
    this.option('babel') // This method adds support for a `--babel` flag

    this.answers = {}
    //this.argument('appname', { type: String, required: true });
  }

  



  initializing(){
    this.log('initializing...')
  }

  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Enter project name: ',
      default : this.appname // Default to current folder name
    }, {
      type    : 'input',
      name    : 'description',
      message : 'Enter description project:',
      default : 'this is description' // Default to current folder name
    }]).then((answers) => {
      this.log('app name: ', answers.name);
      this.log('project description: ', answers.description);
      this.answers.name = answers.name
      this.answers.desc = answers.description
    })
  }

  writing(){

    glob.sync('**', { 
      cwd: this.sourceRoot(),
      dot: true
    }).forEach((file) => {
      let sourcePath = this.templatePath(file)
      this.log(file + ' is dir: ' + fs.lstatSync(sourcePath).isDirectory())
      if(fs.lstatSync(sourcePath).isDirectory()){
        fs.mkdirSync(this.destinationPath(file))
      }else{
        this.fs.copy(sourcePath, this.destinationPath(file), this);
      }
      
    });
    
    const pkgJson = {
      name: this.answers.name,
      description: this.answers.desc
    }

    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
  }

  install(){
    this.log('安装依赖 ...')
    // this.yarnInstall()
    this.spawnCommand('yarn', ['dll']);
  }

  method1() {
    this.log('method 1 just ran');
  }

  method2() {
    this.log('method 2 just ran');
  }

  
}