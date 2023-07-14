# Notion Export Markdown Content Cleaner

The Markdown Content Cleaner is a Node.js application that helps clean up markdown files with bad line wraps and formatting issues. It can be useful for fixing line breaks within paragraphs and ensuring proper formatting of content.

## Usage

1. Place the markdown files to be cleaned in the `./files` directory.
2. Run the application using the command `node app.js`.
3. The cleaned files will be generated in the `./processed` directory with the format `YYYY-MM-DD - Title.md`.
4. The application performs the following steps for each file:
    - Extracts the title first line of the content.
    - Cleans up the title to be filename friendly.
    - Removes unnecessary metadata lines like Created, Tags, and Time.
    - Applies the content cleaner to fix line breaks and formatting issues.
    - Adds front matter to the beginning of the file with the cleaned content.
    - Writes the cleaned file to the `./processed` directory.

Please note that the application assumes the markdown files are in the proper format with metadata and content.  This might need to be modified to fit any special cases.

## Dependencies

The Markdown Content Cleaner requires the following dependencies:

- Node.js
- File System (`fs`) module

## Customization

The application provides options to customize the front matter, tags, and file naming convention. You can modify the code in `app.js` according to your specific requirements.

## License

This application is open-source and available under the [MIT License](LICENSE).
