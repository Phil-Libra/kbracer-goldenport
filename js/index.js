$(function () {

  var jsonData1
  var jsonData2
  function setTable1(arr) {
    var htmlStr = template('tb', {
      data: arr
    })
    $("#tb_results > tbody").html(htmlStr)
  }
  function setTable2(arr) {
    var htmlStr = template('tb', {
      data: arr
    })
    $("#tb_results_mod > tbody").html(htmlStr)
  }

  template.defaults.imports.timeFormat = function (date) {
    var timeArr = date.split('.'),
      sec = timeArr[0] % 60,
      min
    timeArr[0] >= 60 ? min = 1 : min = 0
    sec < 10 ? sec = '0' + sec : null
    return `${min}:${sec}.${timeArr[1]}`
  }
  //获取json数据
  $.ajax({
    url: './speed.json',
    async: false,
    success: function (res) {
      // console.log(res);
      jsonData1 = res
    }
  })
  setTable1(jsonData1)
  $.ajax({
    url: './speed_mod.json',
    async: false,
    success: function (res) {
      // console.log(res);
      jsonData2 = res
    }
  })
  setTable2(jsonData2)

  $('.mods,.lv').on('change', function () {
    // screen($(this).val())
    screen()
  })
  // 筛选
  // function screen() {
  //   var lv = $('.lv').val(),
  //     mods = $('.mods').val(),
  //     arr = jsonData

  //   if (lv !== 'all') {
  //     arr = jsonData.filter(function (v) {
  //       return v.lv == lv
  //     })
  //   }

  //   if (mods == 'all') {
  //     // setTable(jsonData)
  //   } else if (mods == 0) {
  //     arr = arr.filter(function (v) {
  //       return v.mods <= 0
  //     })
  //   } else {
  //     arr = arr.filter(function (v) {
  //       return v.mods > 0
  //     })
  //   }

  //   setTable(arr)
  // }

  //搜索车型
  $('.search').on('input', function () {
    var val = $(this).val().toLowerCase()
    var arr1 = jsonData1.filter(v => {
      return v.car.toLowerCase().indexOf(val) != -1
    })
    var arr2 = jsonData2.filter(v => {
      return v.car.toLowerCase().indexOf(val) != -1
    })
    setTable1(arr1)
    setTable2(arr2)
  })

  // button动效
  document.querySelector('.button').onmousemove = (e) => {
    const x = e.pageX - e.target.offsetLeft
    const y = e.pageY - e.target.offsetTop
    e.target.style.setProperty('--x', `${x}px`)
    e.target.style.setProperty('--y', `${y}px`)
  }

  // // 榜单说明

  $('.button').on('click', function () {

    layer.open({
      type: 1,
      area: ['820px', '640px'],
      title: null,
      shade: false,
      content: $('.tips')
    });
  })



    // // 改装程度
    // $('.mods .icon').click(function () {
    //   layer.open({
    //     type: 1,
    //     shade: false,
    //     title: false, 
    //     content: $('.tips-content-mods'),
    //   });
    // })
    // // 气温
    // $('.temperature .icon').click(function () {
    //   layer.open({
    //     type: 1,
    //     shade: false,
    //     title: false, 
    //     content: $('.tips-content-temperature'),
    //   });
    // })
    // // 轮胎
    // $('.tyre .icon').click(function () {
    //   layer.open({
    //     type: 1,
    //     shade: false,
    //     title: false, 
    //     content: $('.tips-content-tyre'),
    //   });
    // })
    // // 尾速
    // $('.limit .icon').click(function () {
    //   layer.open({
    //     type: 1,
    //     shade: false,
    //     title: false, 
    //     content: $('.tips-content-limit'),
    //   });
    // })
    // // 排名 飞行圈说明
    // $('.ranking .icon').click(function () {
    //   layer.open({
    //     type: 1,
    //     shade: false,
    //     title: false, 
    //     content: $('.tips-content-ranking'),
    //   });
    // })
    // // 圈速
    // $('.speed .icon').click(function () {
    //   layer.open({
    //     type: 1,
    //     shade: false,
    //     title: false, 
    //     content: $('.tips-content-speed'),
    //   });
    // })

    ; (function () {
      var width,
        height,
        largeHeader,
        canvas,
        ctx,
        points,
        target,
        animateHeader = true;

      // Main
      initHeader();
      initAnimation();
      addListeners();

      function initHeader() {
        // width = window.innerWidth;
        // height = window.innerHeight;
        target = { x: width / 2, y: height / 2 };

        largeHeader = document.querySelector('body');
        // largeHeader = document.getElementById("canvas_bg");
        // largeHeader.style.height = height + "px";
        width = largeHeader.offsetWidth;
        height = largeHeader.offsetHeight;

        canvas = document.getElementById("canvas1");
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");

        // create points
        points = [];
        for (var x = 0; x < width; x = x + width / 20) {
          for (var y = 0; y < height; y = y + height / 20) {
            var px = x + (Math.random() * width) / 20;
            var py = y + (Math.random() * height) / 20;
            var p = { x: px, originX: px, y: py, originY: py };
            points.push(p);
          }
        }

        // for each point find the 5 closest points
        for (var i = 0; i < points.length; i++) {
          var closest = [];
          var p1 = points[i];
          for (var j = 0; j < points.length; j++) {
            var p2 = points[j];
            if (!(p1 == p2)) {
              var placed = false;
              for (var k = 0; k < 5; k++) {
                if (!placed) {
                  if (closest[k] == undefined) {
                    closest[k] = p2;
                    placed = true;
                  }
                }
              }

              for (var k = 0; k < 5; k++) {
                if (!placed) {
                  if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                    closest[k] = p2;
                    placed = true;
                  }
                }
              }
            }
          }
          p1.closest = closest;
        }

        // assign a circle to each point
        for (var i in points) {
          var c = new Circle(
            points[i],
            2 + Math.random() * 2,
            "rgba(255,255,255,0.3)"
          );
          points[i].circle = c;
        }
      }

      // Event handling
      function addListeners() {
        if (!("ontouchstart" in window)) {
          window.addEventListener("mousemove", mouseMove);
        }
        window.addEventListener("scroll", scrollCheck);
        // window.addEventListener("resize", resize);
      }

      function mouseMove(e) {
        // var posx = (posy = 0);
        // if (e.pageX || e.pageY) {
        //   posx = e.pageX;
        //   posy = e.pageY;
        // } else if (e.clientX || e.clientY) {
        //   posx =
        //     e.clientX +
        //     document.body.scrollLeft +
        //     document.documentElement.scrollLeft;
        //   posy =
        //     e.clientY +
        //     document.body.scrollTop +
        //     document.documentElement.scrollTop;
        // }
        var scrTop = largeHeader.parentNode.offsetTop,
          l = largeHeader.parentNode.offsetLeft,
          h = largeHeader.parentNode.offsetHeight;

        if (e.pageY >= scrTop && e.pageY <= scrTop + h) {
          target.x = e.pageX - l;
          // target.y = e.offsetY;
          target.y = e.pageY - scrTop;
        } else {
          target.x = -500;
          target.y = -500;
        }
      }

      function scrollCheck() {
        if (document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
      }

      function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + "px";
        canvas.width = width;
        canvas.height = height;
      }

      // animation
      function initAnimation() {
        animate();
        for (var i in points) {
          shiftPoint(points[i]);
        }
      }

      function animate() {
        if (animateHeader) {
          ctx.clearRect(0, 0, width, height);
          for (var i in points) {
            // detect points in range
            if (Math.abs(getDistance(target, points[i])) < 4000) {
              points[i].active = 0.3;
              points[i].circle.active = 0.6;
            } else if (Math.abs(getDistance(target, points[i])) < 20000) {
              points[i].active = 0.1;
              points[i].circle.active = 0.3;
            } else if (Math.abs(getDistance(target, points[i])) < 40000) {
              points[i].active = 0.02;
              points[i].circle.active = 0.1;
            } else {
              points[i].active = 0;
              points[i].circle.active = 0;
            }

            drawLines(points[i]);
            points[i].circle.draw();
          }
        }
        requestAnimationFrame(animate);
      }

      function shiftPoint(p) {
        TweenLite.to(p, 1 + 1 * Math.random(), {
          x: p.originX - 50 + Math.random() * 100,
          y: p.originY - 50 + Math.random() * 100,
          ease: Circ.easeInOut,
          onComplete: function () {
            shiftPoint(p);
          }
        });
      }

      // Canvas manipulation
      function drawLines(p) {
        if (!p.active) return;
        for (var i in p.closest) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.closest[i].x, p.closest[i].y);
          ctx.strokeStyle = "rgba(156,217,249," + p.active + ")";
          ctx.stroke();
        }
      }

      function Circle(pos, rad, color) {
        var _this = this;

        // constructor
        (function () {
          _this.pos = pos || null;
          _this.radius = rad || null;
          _this.color = color || null;
        })();

        this.draw = function () {
          if (!_this.active) return;
          ctx.beginPath();
          ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = "rgba(156,217,249," + _this.active + ")";
          ctx.fill();
        };
      }

      // Util
      function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
      }
    })();
  console.log('%c键盘车神教', "text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb, 0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,0.1),0 0 5px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.2),0 20px 20px rgba(0,0,0,0.15);font-size:100px");
})
