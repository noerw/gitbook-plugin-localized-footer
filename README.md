# gitbook-plugin-localized-footer

This gitbook plugin allows adding a custom footer to each page on the website output.
Requires `gitbook >=2.6.7` (should also run on 2.5.x, not tested).

I wrote these ~40 lines, as other footer-plugins were removed or insufficient for my needs.
Hoping footers will become functionality of the gitbook core.

The footer content is read from a markdown file in each books' content directory (by default `FOOTER.md`), so translated content for multi-language is possible.

Custom styles may be applied on the selector `#page-footer`.

## usage

1. add the plugin to your `book.json`, and optionally configure it. example:

    ```json
    {
      "gitbook": "3.1.1",
      "plugins": [ "localized-footer"],
      "localized-footer": {
        "filename": "../myCustomName.md" // optional, defaults to "FOOTER.md"
                                         // may also be a relative path to the book root
      }
    }
    ```

2. run `gitbook install`

3. fill the footer file(s)

    ```md
    *content published under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)*
    ```
    
## license

LGPL-3.0