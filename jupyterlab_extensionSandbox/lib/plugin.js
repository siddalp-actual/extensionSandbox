require('../style/plugin.css');

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  ICommandPalette,
  MainAreaWidget
} from '@jupyterlab/apputils';

import {
  Widget
} from '@lumino/widgets'

export default [{
    id: 'jupyterlab_extensionSandbox',
    autoStart: true,
    optional: [ICommandPalette],
    activate: activateFunction
}];

function activateFunction(app, palette) {
  console.log('JupyterLab extension jupyterlab_extensionSandbox is activated!');
  console.log('app commands:', app.commands);
  console.log('ICommandPalette:', palette)

  // Create a blank content widget inside of a MainAreaWidget
  const content = new Widget();
  const widget = new MainAreaWidget({ content });
  widget.id = 'extensionSandbox-widget1';
  widget.title.label = 'extensionSandbox Widget';
  widget.title.closable = true;

  // Add an application command
  const command = 'apod:open';
  app.commands.addCommand(command, {
      label: 'extensionSandbox Command',
      execute: () => {
        if (!widget.isAttached) {
          // Attach the widget to the main work area if it's not there
          app.shell.add(widget, 'main');
        }
        // Activate the widget
        app.shell.activateById(widget.id);
      }
    });

    // Add the command to the palette.
    palette.addItem({ command, category: 'Tutorial' });
}
