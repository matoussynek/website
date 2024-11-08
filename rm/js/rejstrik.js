var filePDF;
var pdfjsLib = window['pdfjs-dist/build/pdf'];
var texts = {};
var checkBoxes = {};

function selectFile(){
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    // pdfjsLib.GlobalWorkerOptions.workerSrc = '../lib/pdfjs/pdf.worker.mjs
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf';
    input.onchange = function(event) {

        var file = event.target.files[0];
    
        var fileReader = new FileReader();  
    
        fileReader.onload = function() {
    
            var typedarray = new Uint8Array(this.result);
    
            filePDF = pdfjsLib.getDocument(typedarray);
            filePDF.promise.then(function(pdf) {
                console.log('PDF loaded');
                document.getElementById('fileNameID').innerText = file.name;
                getDocumentText(pdf)
                //console.log(texts);


            }, function (reason) {
                // PDF loading error
                console.error(reason);
            });
    
    
        };
        fileReader.readAsArrayBuffer(file);
    
     }
    input.click();
}
function selectSum(id){
    let col = document.getElementById(id).style.color;
    if (col == 'rgb(0,0,0)'){
        document.getElementById(id).style.color = 'rgb(0,0,188)';
    }
    else{
        document.getElementById(id).style.color = 'rgb(0,0,0)';
    }
}
function search(text){
    let sumbar = document.getElementById("sumBarId");
    sumbar.value = "";
    document.getElementById('displayID').innerText = "loading...";
    let res = {};
    for (let key in texts) {
        // check if the property/key is defined in the object itself, not in parent
        if (texts.hasOwnProperty(key) && texts[key].toLowerCase().includes(text.toLowerCase())) {
            let words = texts[key].split(' ');
            
            for (let i = 0; i < words.length; i++){
                var word = words[i].toLowerCase();
                if (word == text.toLowerCase()){
                    if (!res.hasOwnProperty(word)){
                        res[word] = [];
                    }
                    res[word].push(key);
                }
                if (word.includes(text.toLowerCase())){
                    if (!res.hasOwnProperty(word)){
                        res[word] = [];
                    }
                    res[word].push(key);
                }
            }
        }
    }
    checkBoxes = {};
    let resTxt = '';
    let i = 0;
    for (let key in res){
        resTxt += '<input type="checkbox" class="wcb checkbox-flip" id="word' + i + '" checked/>&#9;';
        resTxt += '<b>' + key + '</b>' + ': ';
        let uniqueArray = res[key].filter(function(item, pos) {
            return res[key].indexOf(item) == pos;
        });
        checkBoxes["word"+i] = uniqueArray;
        // for (let i = 0; i < uniqueArray.length; i++){
        //     resTxt += uniqueArray[i] + ' ';
        // }
        resTxt += uniqueArray.join(", ");
        resTxt += '</br>';
        i++;
    }
    var dis = document.getElementById('displayID');
    dis.innerHTML = resTxt;
    var frag = document.createDocumentFragment();
}

function getDocumentText(pdf) {
    let text = [];
    for (let i = 0; i < pdf.numPages; i++) {
        getPageText(i+1,pdf);
    }
}
function getPageText(pageNum, PDFDocumentInstance) {
    // Return a Promise that is solved once the text of the page is retrieven
    return new Promise(function (resolve, reject) {
        PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
            // The main trick to obtain the text of the PDF page, use the getTextContent method
            pdfPage.getTextContent().then(function (textContent) {
                var textItems = textContent.items;
                var finalString = "";
                // Concatenate the string of the item to the final string
                for (var i = 0; i < textItems.length; i++) {
                    var item = textItems[i];

                    finalString += item.str.replaceAll('\n',' ');// + ' ';
                }
                
                texts[''+pageNum] = clearText(finalString);
                //texts.push({''+pageNum, finalString});
                // Solve promise with the text retrieven from the page
                resolve(finalString);
            });
        });
    });
}
function clearText(text){
    let res = text;
    res = res.replaceAll("\n",' ');
    res = res.replaceAll('(','');
    res = res.replaceAll(')','');
    res = res.replaceAll(',',' ');
    res = res.replaceAll('.',' ');
    res = res.replaceAll('=','');
    res = res.replaceAll('\"','');
    res = res.replaceAll(']','');
    res = res.replaceAll('[','');
    res = res.replaceAll('/[0-9]+/','');
    
    return res;
}

function generateSum(){
    let res = [];
    var dis = document.getElementById('displayID');
    //console.log(checkBoxes);
    for (let i =0;i < dis.childNodes.length;i++){
        let n = dis.childNodes[i];
        if (n.id && n.checked){
            for (let v = 0; v < checkBoxes[n.id].length; v++){
                res.push(checkBoxes[n.id][v]);
            }
            
        }
    }
    res = [...new Set(res)];
    var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    res.sort(collator.compare);
    let sumbar = document.getElementById("sumBarId");
    sumbar.value = res.join(', ');
    //console.log(res.join(', '));
}

function copyToClipboard(){
    let sumbar = document.getElementById("sumBarId");
    sumbar.select();
    
    document.execCommand('copy');
}

function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
  }
  
  function decode_utf8(s) {
    return decodeURIComponent(escape(s));
  }

