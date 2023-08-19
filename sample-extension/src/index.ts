import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the mysampleextension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'mysampleextension:plugin',
  description: 'A JupyterLab frontend extension to capture the custon sharing policies for certain research assets in a notebook environment ',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension mysampleextension is activated!');
  }
};

export default plugin;
