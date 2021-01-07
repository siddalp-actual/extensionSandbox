require('../style/plugin.css');

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  ICommandPalette,
  MainAreaWidget,
  ToolbarButton
} from '@jupyterlab/apputils';

import {
  NotebookActions, NotebookPanel, INotebookModel
} from '@jupyterlab/notebook';

import {
  Widget
} from '@lumino/widgets'

import {
  IDisposable,
  DisposableDelegate
} from '@lumino/disposable';

export default [{
    id: 'jupyterlab_extensionSandbox',
    autoStart: true,
    optional: [ICommandPalette],
    activate: activateFunction
}];

/**
 * A notebook widget extension that adds a button to the toolbar.
 */
export
class ButtonExtension /* implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> */ {
  /**
   * Create a new extension object.
   */
  createNew(panel, context) {
    let callback = () => {
      NotebookActions.runAll(panel.content, context.sessionContext);
    };
    let button = new ToolbarButton({
      className: 'myButton',
      iconClass: 'fa fa-fast-forward',
      onClick: callback,
      tooltip: 'Run All'
      // label: 'RnAl'
    });

    panel.toolbar.insertItem(0, 'runAll', button);
    return new DisposableDelegate(() => {
      button.dispose();
    });
  }
}

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

    app.docRegistry.addWidgetExtension('Notebook', new ButtonExtension());

}
