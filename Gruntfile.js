module.exports = function (grunt) {
  const { spawn, spawnSync } = require('child_process');
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

  grunt.registerTask('start-app', 'Start the app process', function () {
    const done = this.async();
    const appProcess = spawn('npm', ['start'], {
      cwd: __dirname,
      stdio: 'inherit',
      shell: true
    });

    const shutdown = () => {
      if (!appProcess.killed) {
        appProcess.kill('SIGTERM');
      }
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

    appProcess.on('exit', (code) => {
      process.off('SIGINT', shutdown);
      process.off('SIGTERM', shutdown);
      done(code === 0);
    });
  });

  grunt.registerTask('serve', ['check', 'start-app']);
  grunt.registerTask('default', ['check']);
};
