module.exports = appInfo => {
  const config = {};
  config.keys = "sam123098";
  // 添加配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };
  config.news = {
    pageSize: 15,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };

  config.logger = {
    level: 'DEBUG',
    consoleLevel: 'DEBUG',
  };
  return config;
};
