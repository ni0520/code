module.exports = function (grunt) {
  const { spawnSync } = require('child_process');
  const fs = require('fs');
  const path = require('path');

  grunt.registerTask('syntax', 'Check JavaScript syntax', () => {
    const result = spawnSync(process.execPath, ['--check', 'index.js'], {
      cwd: __dirname,
      encoding: 'utf8'
    });

    if (result.status !== 0) {
      grunt.log.error(result.stderr || result.stdout);
      return false;
    }

    grunt.log.ok('index.js syntax check passed.');
  });

  grunt.registerTask('validate-json', 'Validate project JSON files', () => {
    ['haikus.json', 'notes.json', 'process.json'].forEach((fileName) => {
      const filePath = path.join(__dirname, fileName);
      const content = fs.readFileSync(filePath, 'utf8');
      JSON.parse(content);
      grunt.log.ok(`${fileName} is valid JSON.`);
    });
  });

  grunt.registerTask('check', ['syntax', 'validate-json']);

  grunt.registerTask('serve', 'Run app with check before start', () => {
    grunt.task.run(['check']);

    const done = grunt.task.current.async();
    const appProcess = spawnSync('npm', ['start'], {
      cwd: __dirname,
      stdio: 'inherit',
      shell: true
    });

    if (appProcess.status !== 0) {
      done(false);
      return;
    }

    done();
  });

  grunt.registerTask('default', ['check']);
};
