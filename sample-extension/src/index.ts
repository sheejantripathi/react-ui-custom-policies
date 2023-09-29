import { JupyterFrontEndPlugin } from '@jupyterlab/application';
// import shareButton from './extensions/shareButton';
import loginButton from './extensions/loginButton';
import loginExtension from './extensions/loginWidget';
import policyExtension from './extensions/policyWidget';



const extensions: JupyterFrontEndPlugin<any>[] = [
  loginButton,
  loginExtension,
  policyExtension
];

export default extensions;