/* eslint-disable */
!(function (e, t) {
  if(!global.document) return
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (e.LotteryTiger = t())
})(this, function () {
  "use strict"
  Object.assign =
    Object.assign ||
    function (e) {
      if (void 0 === e || null === e)
        throw new TypeError("Cannot convert undefined or null to object")
      for (var t = Object(e), i = 1; i < arguments.length; i++) {
        var n = arguments[i]
        if (void 0 !== n && null !== n)
          for (var o in n) n.hasOwnProperty(o) && (t[o] = n[o])
      }
      return t
    }
  var e = function (e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
    },
    t = function (e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        )
      ;(e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t))
    },
    i = function (e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        )
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t
    },
    n = (function () {
      function t() {
        e(this, t), (this._queue = [])
      }
      return (
        (t.prototype.on = function (e, t) {
          return (
            (this._queue[e] = this._queue[e] || []),
            this._queue[e].push(t),
            this
          )
        }),
        (t.prototype.off = function (e, t) {
          if (this._queue[e]) {
            var i = void 0 === t ? -2 : this._queue[e].indexOf(t)
            ;-2 === i
              ? delete this._queue[e]
              : -1 !== i && this._queue[e].splice(i, 1),
              this._queue[e] &&
                0 === this._queue[e].length &&
                delete this._queue[e]
          }
          return this
        }),
        (t.prototype.has = function (e) {
          return !!this._queue[e]
        }),
        (t.prototype.trigger = function (e) {
          for (
            var t = this,
              i = arguments.length,
              n = Array(i > 1 ? i - 1 : 0),
              o = 1;
            o < i;
            o++
          )
            n[o - 1] = arguments[o]
          return (
            this._queue[e] &&
              this._queue[e].forEach(function (e) {
                return e.apply(t, n)
              }),
            this
          )
        }),
        t
      )
    })(),
    o = (function () {
      var e = document.createElement("div"),
        t = {
          animation: "animationend",
          webkitAnimation: "webkitAnimationEnd",
          msAnimation: "MSAnimationEnd",
          oAnimation: "oanimationend",
        }
      for (var i in t) if (void 0 !== e.style[i]) return t[i]
      return null
    })(),
    r = function (e, t) {
      function i() {
        t(), e.removeEventListener(o, i)
      }
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
      o
        ? e.addEventListener(o, i)
        : setTimeout(function () {
            return t()
          }, n)
    },
    s = (function () {
      function t(i) {
        e(this, t),
          (this.elem = i),
          (this.items = i.children),
          this.elem.appendChild(this.items[0].cloneNode(!0))
      }
      return (
        (t.prototype.resize = function () {
          ;(this.height = this.items[0].clientHeight),
            !this.elem.classList.contains("fx-roll") &&
              this.index > 0 &&
              (this.elem.style.marginTop = -this.index * this.height + "px")
        }),
        (t.prototype.reset = function () {
          this.elem.classList.remove("fx-roll"),
            this.elem.classList.remove("fx-bounce"),
            (this.elem.style.marginTop = 0),
            (this.state = 0)
        }),
        (t.prototype.start = function () {
          var e = this,
            t =
              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
          1 !== this.state &&
            ((this.state = 1),
            setTimeout(function () {
              1 === e.state &&
                (e.elem.classList.add("fx-roll"), (e.elem.style.marginTop = 0))
            }, t))
        }),
        (t.prototype.stop = function (e, t) {
          var i = this,
            n =
              arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
          this.height || (this.height = this.items[0].clientHeight),
            setTimeout(function () {
              1 === i.state &&
                (i.elem.classList.remove("fx-roll"),
                i.elem.classList.add("fx-bounce"),
                (i.elem.style.marginTop = -e * i.height + "px"),
                r(i.elem, function () {
                  ;(i.state = 0),
                    i.elem.classList.remove("fx-bounce"),
                    t && t.call(i, e)
                }))
            }, n)
        }),
        t
      )
    })()
  return (function (n) {
    function o(t, r, u) {
      e(this, o)
      var l = i(this, n.call(this))
      ;(l.options = Object.assign(
        { interval: 300, aniMinTime: 6e3, resize: !0 },
        u
      )),
        (l.toggle = t),
        (l.rollerQueue = [])
      for (var a = 0; a < r.length; a++) l.rollerQueue.push(new s(r[a]))
      return (
        l.options.resize &&
          window.addEventListener(
            "onorientationchange" in document ? "orientationchange" : "resize",
            function () {
              l.rollerQueue.forEach(function (e) {
                return e.resize()
              })
            }
          ),
        l
      )
    }
    return (
      t(o, n),
      (o.prototype.reset = function () {
        this.toggle.classList.remove("z-active")
        for (var e = 0, t = this.rollerQueue.length; e < t; e++)
          this.rollerQueue[e].reset()
        this.trigger("reset")
      }),
      (o.prototype.setResult = function (e) {
        var t = this,
          i = new Date().getTime()
        setTimeout(
          function () {
            for (var i = 0, n = t.rollerQueue.length; i < n; i++)
              t.rollerQueue[i].stop(
                e[i],
                i === n - 1
                  ? function () {
                      t.toggle.classList.remove("z-active"), t.trigger("end")
                    }
                  : null,
                i * t.options.interval
              )
          },
          i - this._startTime > this.options.aniMinTime
            ? 0
            : this.options.aniMinTime - (i - this._startTime)
        )
      }),
      (o.prototype.draw = function () {
        if (!this.toggle.classList.contains("z-active")) {
          this.has("start") && this.trigger("start"),
            (this._startTime = new Date().getTime()),
            this.toggle.classList.add("z-active")
          for (var e = 0, t = this.rollerQueue.length; e < t; e++)
            this.rollerQueue[e].start(e * this.options.interval)
        }
      }),
      o
    )
  })(n)
})
