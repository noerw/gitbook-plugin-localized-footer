var fs = require('fs'),
    footerString = '',
    cfg,
    hasFooterFile;

module.exports = {
    hooks: {
        // called on each book & each language book
        'init': function() {
            cfg = this.config.get('pluginsConfig.localized-footer'), _this = this;

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
                var hline = cfg.hline ? '<hr>' : '';
                return '<div class="page-footer">' + hline + block.body + '</div>';
            }
        }
    }
};
