var navBar = {
  $navJQ1: $(),
  $navJQ2: $(),
  lastNavClicked: "about",
  mousedOver: false,
  mousedOverName: "",
  timeoutID: null,
  dotCount: 0,
  navClasses: ["about","projects","experience","education","math","contact"],

  addTempEllipsisDot: function() {
    this.$navJQ1.append('<span class="temp-ellipsis-dot">.</span>');
  },

  removeTempEllipsisDots: function() {
    $('.nav .temp-ellipsis-dot').remove();
  },

  resetDotCount: function() {
    this.dotCount=0;
  },

  addEllipsis: function() {
    this.$navJQ2.append('<span class="ellipsis">...</span>');
  },

  removeEllipsis: function() {
    $('.nav .ellipsis').remove();
  },

  animateTempEllipsisDots: function() {
    this.dotCount=(this.dotCount+1)%4;
    if (this.dotCount!==0){
      this.addTempEllipsisDot();
    } else {
      this.removeTempEllipsisDots();
    }
    this.timeoutID=setTimeout(function() {
      navBar.animateTempEllipsisDots();
    }.bind(this),1000);
  }
};

Object.defineProperty(navBar,"navClasses", {
  configurable: false,
  writable: false
})

var helloWorldAnimation = {
  txt:'var helloWorld = () => console.log("hello world!");helloWorld();Hey. You! Could you check the console to see if this ran correctly?Thanks!',
  i:0,
  totPrinted:0,
  txtLengths:[51,13,67,7],
  txtBreaks:[51,64,131],
  totLength:[138],
  timeoutID:null,
  timeoutID2:null,
  consoleNotRan: true,

  resetAnimation: function(){
    this.i=0;
    this.totPrinted=0;
    this.consoleNotRan=true;
    $('.animated-text').empty();
  },

  printCharToWindow: function(str, index) {
    $('.animated-text').append(str.charAt(this.i));
  },

  printBreakToWindow: function() {
    $('.animated-text').append('<br />');
  },

  helloWorldAnimate: function() {
    if (this.totPrinted<this.totLength) {
      if (this.txtBreaks.includes(this.totPrinted)) {
        this.printBreakToWindow();
        this.printBreakToWindow();
        this.timeoutID2=setTimeout(function(){
          helloWorldAnimation.printCharToWindow(helloWorldAnimation.txt,helloWorldAnimation.i)
          helloWorldAnimation.i=helloWorldAnimation.i+1;
          helloWorldAnimation.totPrinted=helloWorldAnimation.totPrinted+1;
          helloWorldAnimation.timeoutID=setTimeout(function(){
            helloWorldAnimation.helloWorldAnimate();
          }.bind(this),Math.floor(90+(Math.random()*700)));
        },300);
      } else {
        this.printCharToWindow(this.txt,this.i);
        this.i=this.i+1;
        this.totPrinted=this.totPrinted+1;
        this.timeoutID=setTimeout(function(){
          helloWorldAnimation.helloWorldAnimate();
        }.bind(this),Math.floor(90+(Math.random()*400)));
      }
    }
    if (this.i===64 && this.consoleNotRan){
      console.log("hello world!");
      this.consoleNotRan=false;
    }
  }
};


var contentSection = {
  setContentDisplay: function(navClass) {
    if (navClass===navBar.lastNavClicked) {
      $('.content .'+navClass).css('display','inline-block');
    } else {
      $('.content .'+navClass).css('display','none');
    }
  },

  setContentPane: function() {
    navBar.navClasses.forEach(contentSection.setContentDisplay);
  }
}

var infoSection = {
  setInfoDisplay: function(navClass) {
    if (navClass===navBar.lastNavClicked) {
      $('.media .'+navClass).css('display','inline-block');
    } else {
      $('.media .'+navClass).css('display','none');
    }
  },

  setInfoPane: function() {
    navBar.navClasses.forEach(infoSection.setInfoDisplay);
  }
}

$('.nav p').on('mouseover', function() {
  navBar.mousedOver=true;
  navBar.$navJQ1=$(this);
  navBar.mousedOverName=navBar.$navJQ1.prop("classList")[0];
  navBar.resetDotCount();
  if (navBar.lastNavClicked!==navBar.mousedOverName) {
    navBar.animateTempEllipsisDots();
  }
})

$('.nav p').on('mouseout', function() {
  navBar.mousedOver=false;
  clearTimeout(navBar.timeoutID);
  navBar.removeTempEllipsisDots();
  navBar.$navJQ1=$();
  navBar.mousedOverName="";
  navBar.resetDotCount();
})

$('.nav p').on('click', function() {
  navBar.mousedOver=false;
  clearTimeout(navBar.timeoutID);
  navBar.removeTempEllipsisDots();
  navBar.$navJQ1=$();
  navBar.mousedOverName="";
  navBar.resetDotCount();
  navBar.removeEllipsis();
  navBar.$navJQ2=$(this);
  navBar.addEllipsis();
  navBar.lastNavClicked=$(this).prop("classList")[0];
  if (navBar.lastNavClick!=="projects") {
      clearTimeout(helloWorldAnimation.timeoutID);
      clearTimeout(helloWorldAnimation.timeoutID);
      helloWorldAnimation.resetAnimation();
  }
  contentSection.setContentPane();
  infoSection.setInfoPane();
    if (navBar.lastNavClicked==="projects"){
        helloWorldAnimation.helloWorldAnimate();
    }
})