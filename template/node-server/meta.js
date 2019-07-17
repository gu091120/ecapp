module.exports ={
    prompts:{
        name: {
            when: 'isNotTest',
            type: 'string',
            required: true,
            message: 'Project name',
          },
          description: {
            when: 'isNotTest',
            type: 'string',
            required: false,
            message: 'Project description',
            default: 'A Vue.js project',
          },
          author: {
            when: 'isNotTest',
            type: 'string',
            message: 'Author',
          },
    }
}