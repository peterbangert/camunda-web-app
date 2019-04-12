export interface ConfigurationInterface {
  urls: {
    camunda: string;
    backend: string;
    websocket: string;
    extensions: {
      chat: string;
      sendMessage: string;
      workflow: string;
      deployment: string;
      openTasks: string;
      engineDefault: string;
    };
  };
  camundaHttpHeaders: {
    'Content-Type': string;
    'Authorization': string;
  };
}
