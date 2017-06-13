module.exports = app => {
  class NewsController extends app.Controller {
    * list() {
      const ctx = this.ctx;
      const page = ctx.query.page || 1;
      const pageSize = this.config.news.pageSize;
      app.logger.debug('invoke service....');
      const idList = yield ctx.service.news.list(page);
      const newsList = yield idList.map(id => ctx.service.news.getItem(id));
      app.logger.debug('finished.');
      yield this.ctx.render('news/list.tpl', { list: newsList, page, pageSize });
    }

    * detail() {
      const ctx = this.ctx;
      const id = ctx.params.id;
      const newsInfo = yield ctx.service.news.getItem(id);
      // get comment parallel
      const commentList = yield (newsInfo.kids || []).map(id => ctx.service.news.getItem(id));
      yield ctx.render('news/detail.tpl', { item: newsInfo, comments: commentList });
    }

    * user() {
      const ctx = this.ctx;
      const id = ctx.params.id;
      const userInfo = yield ctx.service.news.getUser(id);
      yield ctx.render('news/user.tpl', { user: userInfo });
    }
  }
  return NewsController;
};
