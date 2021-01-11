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
  DocumentRegistry
} from '@jupyterlab/docregistry';

import {
  NotebookActions, NotebookPanel, INotebookModel
} from '@jupyterlab/notebook';

import {
  fastForwardIcon
} from '@jupyterlab/ui-components';

import {
  IDocumentManager
} from '@jupyterlab/docmanager'

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
    optional: [ICommandPalette, IDocumentManager],
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
      iconClass: 'fast-forward',
      icon: fastForwardIcon,
      onClick: callback,
      tooltip: 'Run all cells',
      label: 'RunAll'
    });
    console.log('new ButtonExtension with: ' + context.contentsModel)
    panel.toolbar.insertItem(10, 'runAll', button);
    return new DisposableDelegate(() => {
      button.dispose();
    });
  }
}

function activateFunction(app, palette, docMgr) {
    /*
    ** The parameters passed into this are
    ** app, a JupyterFrontEnd
    ** and anything on the required or optional properties of the object
    ** here, an ICommandPalette
    */
    console.log('JupyterLab extension jupyterlab_extensionSandbox is activated!');
    console.log('app:', app)
    console.log('app commands:', app.commands);
    console.log('app.docRegistry:', app.docRegistry)
    //for (m in app.docRegistry.modelFactories) {
    //  console.log(m)
    //}
    console.log('ICommandPalette:', palette)
    console.log('docMgr:', docMgr)

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
    palette.addItem({ command, category: 'extensionSandbox' });

    app.docRegistry.addWidgetExtension('Notebook', new ButtonExtension());

}
