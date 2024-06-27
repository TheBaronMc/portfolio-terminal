const colorToHexCode: Map<string,string> = new Map<string, string>();
colorToHexCode.set('red', '#E44A3E');
colorToHexCode.set('blue', '#3F8CEC');
colorToHexCode.set('green', '#72BE47');
colorToHexCode.set('yellow', '#E6A439');

function replaceColorTag(text: string): string {
    text = text.replace(/\\033\[m/g, "</div>")
    
    // Finding all matches
    const pattern: RegExp = /\\033\[([a-zA-Z0-9]*?)m/g

    let match;
    while ((match = pattern.exec(text)) !== null) {
        const color: string = match[1];
        const hexcode: string =  colorToHexCode.get(color) || color;
        
        text =  text.replace(`\\033[${color}m`, `<div style="color: ${hexcode}; display: flex; flex-direction: row;">`);
    }

    return text;
}

function formatTextToHTML(text: string): string {
    const t = text
    .replace(/ /g, '&nbsp;')
    .split('\n')

    console.log(t);

    return t 
    .map((s) => `<div class="line">${replaceColorTag(s)}</div>`)
    .join('');
}

export {formatTextToHTML}