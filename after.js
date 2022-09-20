// this code will be executed after page load

let styleDeclarations = [
    'background-color: black',
    'color: white',
    'z-index: 3000',
    'font-size: 14px',
    'position: fixed',
    'left: 50%',
    'transform: translate(-50%, -50%)',
    'margin: 0 auto',
    'text-align: center',
    'padding: 12px',
    'border-radius: 4px',
    'white-space: nowrap',
    'box-shadow: 0 1px 6px 0 rgb(0 0 0 / 6%), 0 2px 12px 0 rgb(0 0 0 / 16%)',
    'transition: all .3s ease-out',
    'bottom: -100px'
];

let popupElement =  document.createElement('div');
popupElement.innerText = 'Link to current page copied to clipboard';
popupElement.setAttribute('style', styleDeclarations.join(';'));

const injectPopup = () => {
    const bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.insertBefore(popupElement, bodyElement.firstChild);
}

injectPopup(); // inject the HTML for the popup to the current page

const displayPopup = () => {
    styleDeclarations.pop();
    styleDeclarations.push('bottom: 0');
    popupElement.setAttribute('style', styleDeclarations.join(';'));
};

const hidePopup = async () => {
    styleDeclarations.push('opacity: 0');
    popupElement.setAttribute('style', styleDeclarations.join(';'));
    await new Promise(r => setTimeout(r, 500)); // sleep
}

const resetPopup = () => {
    styleDeclarations.pop(); // remove opacity declaration
    styleDeclarations.pop(); // remove bottom declaration
    styleDeclarations.push('bottom: -100px');
    popupElement.setAttribute('style', styleDeclarations.join(';'));
}

document.addEventListener('keydown', async event => {
    if ((event.metaKey || event.ctrlKey) && (event.key === 'l')) {
        const peek = document.querySelector('.notion-peek-renderer a');
        // Copy the current URL to the clipboard:
        await navigator.clipboard.writeText(
            peek ? document.querySelector('.notion-peek-renderer a') :
            window.location.href
        );
        displayPopup();
        await new Promise(r => setTimeout(r, 5000)); // sleep
        await hidePopup();
        await resetPopup();
        // Prevent any further processing of the event:
        event.preventDefault();
        event.stopPropagation();
    }
}, true);
