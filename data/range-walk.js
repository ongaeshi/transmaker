// 付録 1：レンジ内のノードを探索する
// http://domes.lingua.heliohost.org/dom/intro-ranges1.html#section-1-5-1

Range_walk.STOP = 2;
Range_walk.SKIP = 1;

function Range_walk (range, callbackfn, thisArg) {
    var startContainer = range.startContainer;
    var startOffset    = range.startOffset;
    var endContainer   = range.endContainer;
    var endOffset      = range.endOffset;

    var node; {
        switch (startContainer.nodeType) {
        case 3: case 4: case 7: case 8:
            node = startContainer;
            break;
        default :
            node = startContainer.childNodes;
            node = node[startOffset - Number (startOffset === node.length)];
            break;
        }
    }
    var end; {
        switch (endContainer.nodeType) {
        case 3: case 4: case 7: case 8:
            end = endContainer;
            break;
        default :
            if (endOffset === 0) {
                end = endContainer;
            }
            else {
                end = endContainer.childNodes[endOffset - 1];
                
                if (node === end) {
                    while (end.hasChildNodes ()) {
                        end = end.lastChild;
                    }
                }
            }
            break;
        }
    }
    var dir;
    var n;
    
    while (node) {
        switch (callbackfn.call (thisArg, node)) {
            
        case Range_walk.STOP :
            return thisArg;
            
        case Range_walk.SKIP :
            dir = 'nextSibling';
            break;
            
        default :
            dir = 'firstChild';
            break;
        }
        if (node === end) {
            break;
        }
        if ((n = node[dir])) {
            node = n;
            continue;
        }
        do {
            if ((n = node.nextSibling)) {
                node = n;
                break;
            }
        }
        while ((node = node.parentNode));
    }
    return thisArg;
};

