const command = {
  command: "run",
  description: "Run a third-party command",
  builder: {},
  help: {
    usage: "truffle run [<command>]",
    options: [
      {
        option: "<command>",
        description: "Name of the third-party command to run."
      }
    ]
  },
  run(options, done) {
    const Config = require("truffle-config");
    const Run = require("../run");
    const config = Config.detect(options);

    if (options._.length === 0) {
      const help = require("./help");
      help.displayCommandHelp("run");
      return;
    }

    const customCommand = options._[0];

    if (config.plugins) {
      let pluginConfigs = Run.load(config, done);
      Run.run(pluginConfigs, customCommand);
      done();
    } else {
      console.error(
        "\nError: No plugins detected in the configuration file.\n"
      );
      done();
    }
  }
};

module.exports = command;