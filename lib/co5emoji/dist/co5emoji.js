var x = document.getElementsByTagName("p"),
emojiStart = '<span class="co5emoji" id="',
emojiEnd = '"></span>';
for (var i=0;i<x.length;i++){
x[i].innerHTML=x[i].innerHTML.replace(/:-/g, ' <span class="co5emoji" id="').replace(/-:/g, '"></span> ');
}
