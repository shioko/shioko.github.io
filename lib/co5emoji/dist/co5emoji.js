emojilist = [
	"cmx-00",
	"cmx-01",
	"cmx-02",
	"cmx-03",
	"cmx-04",
	"cmx-05",
	"cmx-06",
	"cmx-07",
	"cmx-08",
	"cmx-09",
	"cmx-10",
	"cmx-11",
	"cmx-12",
	"cmx-cdl",
	"cmx-doge",
	"cmx-elpt",
	"cmx-knee",
	"cmx-pipi",
	"cmx-pop",
	"cmx-stbr"
]


var x1 = document.getElementById("posts");

function drawEmoji(num) {
	var emojiTag = ':-' + emojilist[num] + '-:';
	emojiRE = new RegExp(emojiTag,'gi');
	emojiSpan = '<span class="co5emoji" id="' + emojilist[num] + '"></span>';
	x1.innerHTML=x1.innerHTML.replace(emojiRE, emojiSpan);
}

for (var n=0;n<emojilist.length;n++) {
	drawEmoji(n);
}
