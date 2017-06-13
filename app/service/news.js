module.exports = app => {
  class NewsService extends app.Service {
    constructor(ctx) {
      super(ctx);
      this.config = this.ctx.app.config.news;
      this.serverUrl = this.config.serverUrl;
      this.pageSize = this.config.pageSize;
    }

    /**
     * request hacker-news api
     * @param {String} api - Api name
     * @param {Object} [opts] - urllib options
     * @return {Promise} response.data
     */
    * request(api, opts) {
      const options = Object.assign({
        dataType: 'json',
        timeout: [ '30s', '30s' ],
      }, opts);
      app.logger.debug('fetching: '+`${this.serverUrl}/${api}`);
      const result = yield this.ctx.curl(`${this.serverUrl}/${api}`, options);
      //app.logger.debug('result data='+JSON.stringify(result));
      return result.data;
    }

    * list(page = 1, pageSize = this.pageSize) {
      const result = yield this.request('topstories.json', {
        data: {
          orderBy: '"$key"',
          startAt: `"${pageSize * (page - 1)}"`,
          endAt: `"${pageSize * page - 1}"`,
        },
      });

      return Object.keys(result).map(key => result[key]);
    }

    /**
     * query item
     * @param {Number} id - itemId
     * @return {Promise} item info
     */
    * getItem(id) {
      return yield this.request(`item/${id}.json`);
    }

    /**
     * get user info
     * @param {Number} id - userId
     * @return {Promise} user info
     */
    * getUser(id) {
      return yield this.request(`user/${id}.json`);
    }
  }
  return NewsService;
};
