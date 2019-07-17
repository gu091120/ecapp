module.exports ={
    prompts:{
        name: {
            when: 'isNotTest',
            type: 'string',
            required: true,
            message: 'Project name',
          },
          description: {
            type: 'string',
            required: false,
            message: 'Project description',
            default: 'A Vue.js project',
          },
          author: {
            type: 'string',
            message: 'Author',
          },
          terminal:{
            type:"list",
            message:"select terminal type",
            choices:["PC","H5"],
            default:0
          },
          router:{
            type:"confirm",
            message: 'Install react-router?',
          },
          redux:{
            type:"confirm",
            message: 'Install redux?',
          },
          autoInstall: {
            when: 'isNotTest',
            type: 'list',
            message:
              'Should we run `npm install` for you after the project has been created? (recommended)',
            choices: [
              {
                name: 'Yes, use NPM',
                value: 'npm',
                short: 'npm',
              },
              {
                name: 'Yes, use Yarn',
                value: 'yarn',
                short: 'yarn',
              },
              {
                name: 'No, I will handle that myself',
                value: false,
                short: 'no',
              },
            ],
          },
    },
    filters: {
      "src/reducer/*": "redux",
      "src/action/*": "redux",
      "src/containers/*": "redux",
    },
}