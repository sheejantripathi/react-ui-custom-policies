import {
    JupyterFrontEnd,
    JupyterFrontEndPlugin
  } from '@jupyterlab/application';
  import {LoginExtension} from '../buttons/loginButton';


  const Login: JupyterFrontEndPlugin<void> = {
    id: 'loginButton',
    autoStart: true,
    activate: (app: JupyterFrontEnd) => {
      console.log('Jupyterlab extension Login is activated');
  
      let buttonExtension = new LoginExtension(app);
      app.docRegistry.addWidgetExtension('Notebook', buttonExtension);
    },
  }

  export default Login;
  