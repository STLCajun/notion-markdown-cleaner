const fs = require('fs');

let files = fs.readdirSync('./files');
for (let file of files) {
    // if filename doesn't start with . continue
    if (file[0] !== '.') {
        // Get Content of File
        let content = fs.readFileSync(`./files/${file}`, 'utf8');

        // Look for the Title (first line)
        let title = content.split('\n')[0];
        // remove the # from the title
        title = title.replace('# ', '');

        // Look for the date // ex: Created: June 11, 2012 10:05 PM format to YYYY-MM-DD
        let date = content.match(/Created: (.*)/)[1];
        date = new Date(date);

        // Set time to yyyy-mm-dd hh:mm
        let datetime = formatDateTime(date);

        date = date.toISOString().split('T')[0];

        // Clean up title to be filename friendly - remove extra punctuation - no space replacement or lowercase
        title = title.replace(/[^a-zA-Z0-9 ]/g, "");
        let filename = date + ' - ' + title + '.md';

        // rename the file based on the filename
        //fs.renameSync(`./files/${file}`, `./files/${filename}`);
        console.log(`${filename}`);

        // Create Front Matter
        let frontMatter = `---\ntitle: "${title}"\ndate: ${datetime}\npublish: false\ntype: personal-journal\ntags: blog-archive\n---\n\n`;
        console.log(frontMatter);
        console.log('\n\n');

        // Remove title line from content
        content = content.replace(/.*\n/, '');

        // Search For lines that start with Created, Tags, and Time
        // Remove Them
        content = content.replace(/Created: (.*)\n/, '');
        content = content.replace(/Tags: (.*)\n/, '');
        content = content.replace(/Time: (.*)\n/, '');

        // Trim any additional whitespace before the content
        content = content.replace(/^\s+/, '');

        let tags = `tags: [[+Personal Journal]]\n\n-----\n`

        // Add Front Matter to the beginning of the file
        content = frontMatter + tags + cleanUpMarkdown(content);

        // Write the file
        fs.writeFileSync(`./processed/${filename}`, content);
    }
}

function formatDateTime(date) {
    // Extract date components
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    var day = String(date.getDate()).padStart(2, '0');

    // Extract time components
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');

    // Format the date and time
    var formattedDateTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;

    return formattedDateTime;
}

function cleanUpMarkdown(markdownContent) {
    // Split the content into paragraphs
    var paragraphs = markdownContent.split(/\n{2,}/);

    // Clean up each paragraph
    var cleanedParagraphs = paragraphs.map(function (paragraph) {
        // Remove leading and trailing whitespace from each line
        var lines = paragraph.split('\n').map(function (line) {
            return line.trim();
        });

        // Join the lines to form a cleaned paragraph
        return lines.join(' ');
    });

    // Join the cleaned paragraphs to form the final content
    var cleanedContent = cleanedParagraphs.join('\n\n');

    return cleanedContent;
}