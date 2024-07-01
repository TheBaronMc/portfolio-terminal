const colorToHexCode: Map<string,string> = new Map<string, string>();
colorToHexCode.set('red', '#E44A3E');
colorToHexCode.set('blue', '#3F8CEC');
colorToHexCode.set('green', '#72BE47');
colorToHexCode.set('yellow', '#E6A439');

function replaceColorTag(text: string): string {
    text = text.replace(/\\033\[m/g, "</div>")
    
    // Finding all matches
    const pattern: RegExp = /\\033\[([#a-zA-Z0-9]*?)m/g

    let match;
    while ((match = pattern.exec(text)) !== null) {
        const color: string = match[1];
        const hexcode: string =  colorToHexCode.get(color) || color;
        
        text =  text.replace(`\\033[${color}m`, `<div style="color: ${hexcode}; display: flex; flex-direction: row;">`);
    }

    return text;
}

function processLinkTags(text: string): string {
    const pattern: RegExp = /\[([^[]*)\]\(([^)]*)\)/g;

    let match;
    while ((match = pattern.exec(text)) !== null) {
        const text_to_show: string = match[1];
        const link: string = match[2];
        
        text =  text.replace(match[0], `<a href="${link}" target="_blank">${text_to_show}</a>`);
    }

    return text;
}

function formatTextToHTML(text: string): string {
    return text
    .replace(/ /g, '&nbsp;')
    .split('\n')
    .map(processLinkTags)
    .map(replaceColorTag)
    .map((s) => `<div class="line">${s}</div>`)
    .join('');
}

export {formatTextToHTML}