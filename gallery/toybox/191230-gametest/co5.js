const canvas1 = document.getElementById('canvas1');
const ctx = canvas1.getContext('2d');
const globalColor = {hair: 'A', eye: 'A'};
const cvsLoading = document.getElementById('loading');
const pathStyle = {
	hair0:0,
	hair1:0,
	face:0,
	mouth:0,
	nose:0,
	cloth:0,
	hair2:0,
	brow:0,
	hair3:0,
	hair4:0,
	hair5:0,
	eye:0,
	other:0
}

//------创建图片路径↓

function changeColor (part, color) { // 更改全局颜色
	globalColor[part] = color;
	console.log(`set ${part} color = ${color}`)
}
function changeStyle (path,styleNum) { // 按图层更改样式编号
	pathStyle[path] = styleNum;
	console.log(`set ${path} style = ${styleNum}`)
}
function setImgSrc (part,path) { // 创建图片路径，区分需要染色的 part(=hair or eye) 以及不需要染色的 part(= 输入 null)
	const element = document.getElementById(path);
	if(0 === pathStyle[path]){
	element.src = 'img/0.png';
	} else {
		switch(part){
		case 'hair': 
		case 'eye': return element.src = `img/${path}/${pathStyle[path]}-${globalColor[part]}.png`;
		default: return element.src = `img/${path}/${pathStyle[path]}.png`;
		}
	}
}

//----绘制 canvas↓

function getImg (start) { // 根据给定的 start (= 0 or 1) 创建图片列表，0 = 脑壳在最下层，1 = 辫子在最下层，默认写 1
	let imgLayer;
	if(1 === start){
		imgLayer = ['hair1','hair0','face','mouth','nose','cloth','hair2','brow','hair3','hair4','hair5','eye','other'];
	} else {
		imgLayer = ['hair0','hair1','face','mouth','nose','cloth','hair2','brow','hair3','hair4','hair5','eye','other'];
	}
	const imgList = [];
	for(index in imgLayer){
		imgList.push(document.getElementById(imgLayer[index]).src);
	}
	console.log('图片列表获取完成');
	return imgList;
}

function drawImg (imgList, n) { // 绘制图片
	if (n < imgList.length) {
		const image = new Image();
		image.src = imgList[n];
		image.onload = function() {
			ctx.drawImage(this,0,0);
			drawImg(imgList, n+1);
		}
	}  else {
			ctx.textAlign = "center";
			ctx.fillStyle = "#555";
			ctx.font = "30px Cambria";
			ctx.fillText("@Shioko",512,700);
			console.log('绘制完成');
			cvsLoading.style.opacity = '0';
	}
}
function drawing (n,start) { // 绘制 图片 + logo，除了特殊辫子其它参数都是 (0,1)
	ctx.clearRect(0,0,1024,1024);
	cvsLoading.style.opacity = '1';
	const imgList = getImg(start);
	drawImg(imgList, n);
}

//-----按钮动作↓

function setHair (path, styleNum,init) { // 辫子在底层【默认
	changeStyle(path,styleNum);
	setImgSrc('hair',path);
	if (! init) {
		drawing(0,1)
	}
}

function setEye (styleNum,init) {
	changeStyle('eye',styleNum);
	setImgSrc('eye','eye');
	if (! init) {
		drawing(0,1)
	}
}

function setPart (path, styleNum,init) {
	changeStyle(path,styleNum);
	setImgSrc(null,path);
	if (! init) {
		drawing(0,1)
	}
}

function setColor (part,color) {
	changeColor(part, color);
	if ('hair' === part) {
		const hairList = ['hair0','hair1','hair2','hair3','hair4','hair5','brow'];
		for (var n=0; n < hairList.length; n++) {
			setImgSrc('hair',hairList[n]);
		}
	}
	if ('eye' === part) {
		setImgSrc('eye','eye');
	}

	drawing(0,1);
}

// ------开发中按钮↓

function setHair1 (path, styleNum) { // 脑壳在底层，暂时用不到
	changeStyle(path,styleNum);
	setImgSrc('hair',path);
	drawing(0,0)
}

function setPair (path, styleNum) {
	// 单马尾变双马尾的功能，鬼知道今年能不能实现啊，鸽置鸽置
}
function setImgLayer (n) {
	switch (n) {
		case 1: imgLayer = ['hair1','hair0','face','mouth','nose','cloth','hair2','brow','hair3','hair4','hair5','eye','other'];break;
		case 0: imgLayer = ['hair1','hair0','face','mouth','nose','cloth','hair2','brow','hair3','hair4','hair5','eye','other'];break;
		default: console.log('请输入图层顺序编号')
	}
}

//----初始化↓

function initImg () {
	setHair('hair0',1,'芒');
	setHair('hair1',0,'果');
	setHair('hair2',1,'是');
	setHair('hair3',0,'只');
	setHair('hair4',0,'大');
	setHair('hair5',0,'臭');
	setHair('brow',1,'猫');
	setEye(1,'喵');
	setPart('face',1,'喵');
	setPart('mouth',1,'喵');
	setPart('nose',1,'喵');
	setPart('other',0,'喵');
	setPart('cloth',0,'喵');
	console.log('初始化完成');
}

window.addEventListener('load', function () {
	changeColor('hair', 'A');
	changeColor('eye', 'A');
	initImg ();
	drawing(0,1);
})