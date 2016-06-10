var fs = require('fs'),
    footerString = '',
    hasFooterFile;

module.exports = {
    hooks: {
        // called on each book & each language book
        'init': function() {
            var cfg = this.config.get('pluginsConfig.localized-footer');

            try {
                fs.statSync(this.resolve(cfg.filename));
            } catch (e) {
                hasFooterFile = false;
                return;
            }

            hasFooterFile = true;

            var data = fs.readFileSync(this.resolve(cfg.filename), 'utf-8');
            this.formatString('markdown', data)
                .then(function(html) { footerString = html; }, console.error);
        },
        'page:before': function(page) {
            // append to the website renderer only
            if (!hasFooterFile) return page;
            page.content = page.content + '\n{% pagefooter %}' + footerString + '{% endpagefooter%}';
            return page;
        }
    },
    blocks: {
        'pagefooter': {
            process: function(block) {
                return '<div id="page-footer" style="color: #666;"><hr>' + block.body + '</div>';
            }
        }
    }
};
