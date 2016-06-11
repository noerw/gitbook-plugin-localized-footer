var fs = require('fs'),
    footerString = '',
    hasFooterFile;

module.exports = {
    hooks: {
        // called on each book & each language book
        'init': function() {
            var cfg = this.config.get('pluginsConfig.localized-footer'), _this = this;

            try {
                fs.statSync(this.resolve(cfg.filename));
            } catch (e) {
                hasFooterFile = false;
                return;
            }

            hasFooterFile = true;

            this.readFileAsString(cfg.filename)
                .then(function (data) { return _this.renderBlock('markdown',data); }, this.log.error)
                .then(function(html) { footerString = html; }, this.log.error);
        },
        'page:before': function(page) {
            // append to the website renderer only
            if (this.output.name !== 'website' || !hasFooterFile) return page;
            page.content = page.content + '\n{% localizedfooter %}' + footerString + '{% endlocalizedfooter%}';
            return page;
        }
    },
    blocks: {
        'localizedfooter': {
            process: function(block) {
                return '<div id="page-footer"><hr>' + block.body + '</div>';
            }
        }
    }
};
