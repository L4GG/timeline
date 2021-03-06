/* eslint-env mocha */
import glob from 'glob';
import { CLIEngine } from 'eslint';
import { assert } from 'chai';

const paths = glob.sync('./+(src|tests)/**/*.js');
const engine = new CLIEngine({
  useEslintrc: true,
});

const results = engine.executeOnFiles(paths).results;

describe('ESLint', function() {
  results.forEach(result => generateTest(result));
});

function generateTest({ filePath, messages }) {
  it(filePath.replace(process.cwd(), ''), function() {
    if (messages.length > 0) {
      assert.fail(false, true, formatMessages(messages));
    }
  });
}

function formatMessages(messages) {
  const errors = messages.map(message => {
    return `${message.line}:${message.column} ${message.message.slice(
      0,
      -1
    )} - ${message.ruleId}\n`;
  });

  return `\n${errors.join('')}`;
}
