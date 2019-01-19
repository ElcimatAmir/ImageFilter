// для установки первоначальных фотграфии в обоих дивов
window.onload = function(){
	var canvas  = document.getElementById("originalImage");
	var canvas2 = document.getElementById("editImage");
	var context = canvas.getContext("2d") ;	
	var context2 = canvas2.getContext("2d") ;	
	var img = new Image() ;
	var img2 = new Image() ;
	
	img.onload = function(){
		context.drawImage(img,0,0,canvas.width,canvas.height);
		var pixelData = context.getImageData(0,0,canvas.width,canvas.height);
		context.putImageData(pixelData,0,0);	
	}
	img.src = 'img/image.jpeg' ;

	img2.onload = function(){
		context2.drawImage(img,0,0,canvas2.width,canvas2.height);
		var pixelData = context2.getImageData(0,0,canvas2.width,canvas2.height);
		context2.putImageData(pixelData,0,0);	
	}
	img2.src = 'img/image.jpeg' ;
}

var originalButton  = document.getElementById("originalButton");
var negativeButton  = document.getElementById("negativeButton");
var lightnessbutton = document.getElementById("lightnessButton");
var contrastButton  = document.getElementById("contrastButton");
var thresholdButton = document.getElementById("thresholdButton"); 
var lowpassButton	= document.getElementById("lowpassButton");
var filter1Button	= document.getElementById("filter1Button");
var highpassButton	= document.getElementById("highpassButton");
var laplasaButton	= document.getElementById("laplasaButton");

originalButton.onclick = function(){
	var canvas  = document.getElementById("editImage") ;
	var context = canvas.getContext("2d") ;	
	var img = new Image() ;
	
	img.onload = function(){
		context.drawImage(img,0,0,canvas.width,canvas.height);
		var pixelData = context.getImageData(0,0,canvas.width,canvas.height);
	// нижний закоментиравыный код для того чтобы можно было маниполирывать с пиксилями	
		//for (var i = 0; i < pixelData.data.length; i += 4) {
				//pixelData.data[i+1] = 0;	//i = red | i+1 = green | i+2 = blue| i+3 = alpha.
				//pixelData.data[i+2] = 0;
		//}
			context.putImageData(pixelData,0,0);	
	}
	img.src = 'img/image.jpeg' ;
}

negativeButton.onclick = function(){
	var canvas  = document.getElementById("editImage") ;
	var context = canvas.getContext("2d") ;	
	var img = new Image() ;
	
	img.onload = function(){
		context.drawImage(img,0,0,canvas.width,canvas.height);
		var pixelData = context.getImageData(0,0,canvas.width,canvas.height);
		for (var i = 0; i < pixelData.data.length; i += 4) {
				pixelData.data[i]   =  255 - pixelData.data[i] ;
				pixelData.data[i+1] =  255 - pixelData.data[i+1];
				pixelData.data[i+2] =  255 - pixelData.data[i+2]; 
				
			}
			context.putImageData(pixelData,0,0);	
	}
	img.src = 'img/image.jpeg' ;
}

lightnessbutton.onclick = function(){
	var canvas  = document.getElementById("editImage") ;
	var context = canvas.getContext("2d") ;	
	var img = new Image() ;
	var value = 55;
	img.onload = function(){
		context.drawImage(img,0,0,canvas.width,canvas.height);
		var pixelData = context.getImageData(0,0,canvas.width,canvas.height);
		
		for (var i = 0; i < pixelData.data.length; i += 4) {
			pixelData.data[i]   += value;
			pixelData.data[i+1] += value;
			pixelData.data[i+2] += value; 


		}
			context.putImageData(pixelData,0,0);	
			console.log(pixelData.data);
	}
	img.src = 'img/image.jpeg' ;
}

contrastButton.onclick = function(){
	var canvas  = document.getElementById("editImage") ;
	var context = canvas.getContext("2d") ;	
	var img = new Image() ;
	
	img.onload = function(){
		context.drawImage(img,0,0,canvas.width,canvas.height);
		var contrast = 60;
		var factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
		var pixelData = context.getImageData(0,0,canvas.width,canvas.height);
		for (var i = 0; i < pixelData.data.length; i += 4) {
		   	pixelData.data[i]   = factor * (pixelData.data[i] - 128) + 128;
        	pixelData.data[i+1] = factor * (pixelData.data[i+1] - 128) + 128;
        	pixelData.data[i+2] = factor * (pixelData.data[i+2] - 128) + 128;	
		}
			context.putImageData(pixelData,0,0);	
	}
	img.src = 'img/image.jpeg' ;
}

thresholdButton.onclick = function(){
	var canvas  = document.getElementById("editImage") ;
	var context = canvas.getContext("2d") ;	
	var img = new Image() ;
	
	img.onload = function(){
		context.drawImage(img,0,0,canvas.width,canvas.height);
		var contrast = 65;
		var thresh = 100 ;
		var pixelData = context.getImageData(0,0,canvas.width,canvas.height);
		for (var i = 0; i < pixelData.data.length; i += 4) {
		   	 var v = (0.2126*pixelData.data[i] + 0.7152*pixelData.data[i+1] + 0.0722*pixelData.data[i+2] >= thresh) ? 255 : 0;
    			pixelData.data[i] = pixelData.data[i+1] = pixelData.data[i+2] = v
		}
			context.putImageData(pixelData,0,0);	
	}
	img.src = 'img/image.jpeg' ;
}

filter1Button.onclick = function(){
	var canvas  = document.getElementById("editImage") ;
	var context = canvas.getContext("2d") ;	
	var img = new Image() ;
	img.onload = function(){
		context.drawImage(img,0,0,canvas.width,canvas.height);
		var pixelData = context.getImageData(0,0,canvas.width,canvas.height);
		
		for (var i = 0; i < pixelData.data.length; i += 4) {
			pixelData.data[i]   =  127+pixelData.data[i]*2 -(pixelData.data[i+4] +pixelData.data[i+pixelData.width*4]);
			pixelData.data[i+1] = 127+pixelData.data[i+1]*2 -(pixelData.data[i+1+4] +pixelData.data[i+1+pixelData.width*4]);;
			pixelData.data[i+2] = 127+pixelData.data[i+2]*2 -(pixelData.data[i+2+4] +pixelData.data[i+2+pixelData.width*4]);; 


		}
			context.putImageData(pixelData,0,0);	
			console.log(pixelData.data);
	}
	img.src = 'img/image.jpeg' ;
}

// for all other filters we will gone use an object filter
Filters = {}; 	// its an empty object
// adding the main methods in it
// for get pixels  
Filters.getPixels = function(img) {
  var c = this.getCanvas(img.width, img.height);
  var ctx = c.getContext('2d');
  ctx.drawImage(img,1,1,c.width,c.height);
  return ctx.getImageData(0,0,c.width,c.height);
};

// for get canvas
Filters.getCanvas = function(w,h) {
  var c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
};

//method for get filtered img pixels
Filters.filterImage = function(filter, image, var_args) {
  var args = [this.getPixels(image)];
  for (var i=2; i<arguments.length; i++) {
    args.push(arguments[i]);
  }
  return filter.apply(null, args);
}

Filters.tmpCanvas = document.createElement('canvas');
Filters.tmpCtx = Filters.tmpCanvas.getContext('2d');

Filters.createImageData = function(w,h) {
  return this.tmpCtx.createImageData(w,h);
}

Filters.convolute = function(pixels, weights, opaque) {
  var side = Math.round(Math.sqrt(weights.length));
  var halfSide = Math.floor(side/2);
  var src = pixels.data;
  var sw = pixels.width;
  var sh = pixels.height;
  // output by the convolution matrix
  var w = sw;
  var h = sh;
  var output = Filters.createImageData(w, h);
  var outputArr = output.data;
  // go through the destination image pixels
  var alphaFac = opaque ? 1 : 0;
  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var sy = y;
      var sx = x;
      var index = (y*w+x)*4;
      // calculate the weighed sum of the source image pixels that
      // fall under the convolution matrix
      var r=0, g=0, b=0, a=0;
      for (var cy=0; cy<side; cy++) {
        for (var cx=0; cx<side; cx++) {
          var scy = sy + cy - halfSide;
          var scx = sx + cx - halfSide;
          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            var srcOff = (scy*sw+scx)*4;
            var wt = weights[cy*side+cx];
            r += src[srcOff] * wt;
            g += src[srcOff+1] * wt;
            b += src[srcOff+2] * wt;
            a += src[srcOff+3] * wt;
          }
        }
      }
      outputArr[index] = r;
      outputArr[index+1] = g;
      outputArr[index+2] = b;
      outputArr[index+3] = a + alphaFac*(255-a);
    }
  }
  return output;
}

// buttons actions that work with matrix
lowpassButton.onclick = function(){
	var canvas  = document.getElementById("editImage") ;
	var context = canvas.getContext("2d") ;	
	var img = new Image() ;
	
	img.onload = function(){
		context.drawImage(img,0,0,canvas.width,canvas.height);
		var pixelData = context.getImageData(0,0,canvas.width,canvas.height);
		var newImage = Filters.filterImage(Filters.convolute, img,
  [ 1/9, 1/9, 1/9,
    1/9, 1/9, 1/9,
    1/9, 1/9, 1/9 ]
 )	;
			context.putImageData(newImage,0,0);	
	}
	img.src = 'img/image.jpeg' ;
}

highpassButton.onclick = function(){
	var canvas  = document.getElementById("editImage") ;
	var context = canvas.getContext("2d") ;	
	var img = new Image() ;
	
	img.onload = function(){
		context.drawImage(img,0,0,canvas.width,canvas.height);
		var pixelData = context.getImageData(0,0,canvas.width,canvas.height);
		var newImage = Filters.filterImage(Filters.convolute, img,
  [  0, -1,  0,
    -1,  5, -1,
     0, -1,  0 ]
 );	
			context.putImageData(newImage,0,0);	
	}
	img.src = 'img/image.jpeg' ;
}

laplasaButton.onclick = function(){
	var canvas  = document.getElementById("editImage") ;
	var context = canvas.getContext("2d") ;	
	var img = new Image() ;
	
	img.onload = function(){
		context.drawImage(img,0,0,canvas.width,canvas.height);
		var pixelData = context.getImageData(0,0,canvas.width,canvas.height);
		var newImage = Filters.filterImage(Filters.convolute, img,
  [  0, -1, 0,
    -1,  4,-1,
     0, -1, 0 ]
 );			
		//context.clearRect(0,0,canvas.width, canvas.height);
		context.putImageData(newImage,0,0);	
	}
	img.src = 'img/image.jpeg' ;
}