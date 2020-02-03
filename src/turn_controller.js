import TurnPage from "./turn_page.vue";

const PI = Math.PI;
const A90 = PI / 2;

function bezier(p1, p2, p3, p4, t) {
  const a = 1 - t;
  const b = a * a * a;
  const c = t * t * t;
  return point2D(Math.round(b * p1.x + 3 * t * a * a * p2.x + 3 * t * t * a * p3.x + c * p4.x), Math.round(b * p1.y + 3 * t * a * a * p2.y + 3 * t * t * a * p3.y + c * p4.y));
}

function point2D(x, y) {
  return { x, y };
}

function peelingPoint(a, b, c) {
  return {
    corner: a,
    x: b,
    y: c
  };
}

function _startPoint(corner, width, height, opts) {
  opts = opts || 0;

  switch (corner) {
    case "tl":
      return point2D(opts, opts);
    case "tr":
      return point2D(width - opts, opts);
    case "bl":
      return point2D(opts, height - opts);
    case "br":
      return point2D(width - opts, height - opts);
    case "l":
      return point2D(opts, 0);
    case "r":
      return point2D(width - opts, 0);
  }
}

function _endPoint(corner, width, height) {
  switch (corner) {
    case "tl":
      return point2D(width * 2, 0);
    case "tr":
      return point2D(-width, 0);
    case "bl":
      return point2D(width * 2, height);
    case "br":
      return point2D(-width, height);
    case "l":
      return point2D(width * 2, 0);
    case "r":
      return point2D(-width, 0);
  }
}

function _translate(x, y) {
  return " translate3d(" + x + "px," + y + "px, 0px) ";
}

function _rotate(degrees) {
  return " rotate(" + degrees + "deg) ";
}

function _scale(a, b) {
  return " scale3d(" + a + "," + b + ", 1) ";
}

function _deg(radians) {
  return radians / PI * 180;
}

function _transform(transform, origin) {
  const properties = {};

  if (origin) properties["transform-origin"] = origin;

  properties["transform"] = transform;

  return properties;
}

function fold(point, width, height, startPoint) {
  let c, d, e, px, gradientSize, h, far, j, k, l, m, n, q;
  let w = 0;
  let mv = point2D(0, 0);
  let df = point2D(0, 0);
  let tr = point2D(0, 0);
  const B = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2), 2);
  const compute = function() {
    c = _startPoint(point.corner, width, height);
    const k = width - c.x - point.x;
    const l = c.y - point.y;
    let alpha = Math.atan2(l, k);
    let distance = Math.sqrt(k * k + l * l);
    const q = point2D(width - c.x - Math.cos(alpha) * width, c.y - Math.sin(alpha) * width);
    if (distance > width) {
      point.x = q.x;
      point.y = q.y;
    }

    const rel = point2D(0, 0);
    const middle = point2D(0, 0);

    rel.x = c.x ? c.x - point.x : point.x;
    rel.y = c.y ? c.y - point.y : point.y;

    middle.x = e ? width - rel.x / 2 : point.x + rel.x / 2;
    middle.y = rel.y / 2;

    alpha = A90 - Math.atan2(rel.y, rel.x);
    const gamma = alpha - Math.atan2(middle.y, middle.x);
    distance = Math.sin(gamma) * Math.sqrt(middle.x * middle.x + middle.y * middle.y);

    tr = point2D(distance * Math.sin(alpha), distance * Math.cos(alpha));

    if (alpha > A90) {
      tr.x = tr.x + Math.abs(tr.y * rel.y / rel.x);
      tr.y = 0;
      if (Math.round(tr.x * Math.tan(PI - alpha)) < height) {
        point.y = Math.sqrt(Math.pow(height, 2) + 2 * middle.x * rel.x);
        if (d) point.y = height - point.y;
        return compute();
      }
      const D = PI - alpha;
      const E = B - height / Math.sin(D);
      mv = point2D(Math.round(E * Math.cos(D)), Math.round(E * Math.sin(D)));
      if (e) mv.x = -mv.x;
      if (d) mv.y = -mv.y;
    }
    w = Math.round(100 * _deg(alpha)) / 100;
    px = Math.round(tr.y / Math.tan(alpha) + tr.x);
    const side = width - px;
    let G = Math.min(height, side * Math.tan(alpha));
    if (G < 0) G = height;
    const sideX = side * Math.cos(2 * alpha);
    const sideY = side * Math.sin(2 * alpha);
    df = point2D(Math.round(e ? side - sideX : px + sideX), Math.round(d ? sideY : height - sideY));
    const endingPoint = _endPoint(point.corner, width, height);
    far = Math.sqrt(Math.pow(endingPoint.x - point.x, 2) + Math.pow(endingPoint.y - point.y, 2)) / width;
    gradientSize = Math.min(100, side * Math.sin(alpha));
    h = 1.3 * Math.min(side, G);
    tr.x = Math.round(tr.x);
    tr.y = Math.round(tr.y);
    return true;
  };
  const transform = function(tr, c, x, a) {
    const l = ["0", "auto"];
    const mvW = (width - B) * x[0] / 100;
    const mvH = (height - B) * x[1] / 100;
    const cssA = {
      left: l[c[0]],
      top: l[c[1]],
      right: l[c[2]],
      bottom: l[c[3]]
    };
    const aliasingFk = a !== 90 && a !== -90 ? e ? -1 : 1 : 0;
    const origin = x[0] + "% " + x[1] + "%";
    const styles = [];

    styles.push({ ...cssA, ..._transform(_rotate(a) + _translate(tr.x + aliasingFk, tr.y), origin) });
    styles.push({ ...cssA, ..._transform(_rotate(a) + _translate(tr.x + df.x - mv.x - width * x[0] / 100, tr.y + df.y - mv.y - height * x[1] / 100) + _rotate(Math.round(100 * (180 / a - 2) * a) / 100), origin) });
    styles.push(_transform(_translate(-tr.x + mvW - aliasingFk, -tr.y + mvH) + _rotate(-a), origin));
    styles.push(_transform(_translate(width - tr.x + mv.x + mvW, -tr.y + mv.y + mvH) + _rotate(-a), origin));

    let z, C, D;
    if (d) {
      if (e) {
        C = a - 90;
        D = px - 50;
        gradientSize = -gradientSize;
        z = "50% 25%";
      } else {
        C = a - 270;
        D = width - px - 50;
        z = "50% 25%";
      }
    } else {
      if (e) {
        D = px - 50;
        C = a - 270;
        gradientSize = -gradientSize;
        z = "50% 75%";
      } else {
        D = width - px - 50;
        C = a - 90;
        z = "50% 75%";
      }
    }
    let E = Math.max(0.5, 2 - far);
    if (E > 1) E = E >= 1.7 ? (2 - E) / 0.3 : 1;
    styles.push({ opacity: Math.round(100 * E) / 100, ..._transform(_translate(D, 0) + _rotate(C) + _scale(gradientSize / 100, 1), z) });
    if (d) {
      if (e) {
        C = -270 - a;
        h = -h;
        D = width - px - 20;
        z = "20% 25%";
      } else {
        C = -90 - a;
        D = px - 20;
        z = "20% 25%";
      }
    } else {
      if (e) {
        C = -90 - a;
        D = width - px - 20;
        h = -h;
        z = "20% 75%";
      } else {
        C = 90 - a;
        D = px - 20;
        z = "20% 75%";
      }
    }
    E = far < 0.3 ? far / 0.3 : 1;
    styles.push({ opacity: Math.round(100 * E) / 100, ..._transform(_translate(D, 0) + _rotate(C) + _scale(-h / 100, 1), z) });
    return styles;
  };

  switch (point.corner) {
    case "l":
      m = point.y - startPoint.y;
      n = point.x;
      q = Math.atan2(m, n);
      if (q > 0) {
        j = startPoint.y;
        k = Math.sqrt(n * n + m * m);
        l = 2 * j * Math.sin(q) + k;
        point.x = l * Math.cos(q);
        point.y = l * Math.sin(q);
        point.corner = "tl";
        e = true;
        d = true;
        compute();
        return transform(tr, [1, 0, 0, 1], [100, 0], w);
      } else {
        q = -q;
        j = height - startPoint.y;
        k = Math.sqrt(n * n + m * m);
        l = 2 * j * Math.cos(A90 - q) + k;
        point.x = l * Math.cos(q);
        point.y = height - l * Math.sin(q);
        point.corner = "bl";
        e = true;
        compute();
        return transform(point2D(tr.x, -tr.y), [1, 1, 0, 0], [100, 100], -w);
      }
    case "r":
      m = startPoint.y - point.y;
      n = width - point.x;
      q = Math.atan2(m, n);
      if (q < 0) {
        j = startPoint.y;
        q = -q;
        k = Math.sqrt(n * n + m * m);
        l = 2 * j * Math.sin(q) + k;
        point.x = width - l * Math.cos(q);
        point.y = l * Math.sin(q);
        point.corner = "tr";
        d = true;
        compute();
        return transform(point2D(-tr.x, tr.y), [0, 0, 0, 1], [0, 0], -w);
      } else {
        j = height - startPoint.y;
        k = Math.sqrt(n * n + m * m);
        l = 2 * j * Math.cos(A90 - q) + k;
        point.x = width - l * Math.cos(q);
        point.y = height - l * Math.sin(q);
        point.corner = "br";
        compute();
        return transform(point2D(-tr.x, -tr.y), [0, 1, 1, 0], [0, 100], w);
      }
    case "tl":
      d = true;
      e = true;
      point.x = Math.max(point.x, 1);
      c = _startPoint("tl", width, height);
      compute();
      return transform(tr, [1, 0, 0, 1], [100, 0], w);
    case "tr":
      d = true;
      point.x = Math.min(point.x, width - 1);
      compute();
      return transform(point2D(-tr.x, tr.y), [0, 0, 0, 1], [0, 0], -w);
    case "bl":
      e = true;
      point.x = Math.max(point.x, 1);
      compute();
      return transform(point2D(tr.x, -tr.y), [1, 1, 0, 0], [100, 100], -w);
    case "br":
      point.x = Math.min(point.x, width - 1);
      compute();
      return transform(point2D(-tr.x, -tr.y), [0, 1, 1, 0], [0, 100], w);
  }
}

function animatef(point) {
  if (!point.to.length) point.to = [point.to];
  if (!point.from.length) point.from = [point.from];

  const diff = [];
  const len = point.to.length;
  const time = Date.now();

  const frame = function() {
    const v = [];
    const timeDiff = Math.min(point.duration, Date.now() - time);

    for (let i = 0; i < len; i++) v.push(easing(1, timeDiff, point.from[i], diff[i], point.duration));

    point.frame(len === 1 ? v[0] : v);

    if (timeDiff === point.duration) {
      if (point.complete) point.complete();
    } else {
      requestAnimationFrameId = requestAnimationFrame(frame);
    }
  };

  for (let i = 0; i < len; i++) diff.push(point.to[i] - point.from[i]);

  const easing = function(x, t, b, c, data) {
    return c * Math.sqrt(1 - (t = t / data - 1) * t) + b;
  };

  let requestAnimationFrameId;

  frame();

  return {
    stop() {
      if (point.complete) point.complete();
      cancelAnimationFrame(requestAnimationFrameId);
    }
  };
}

function turnPage(p1, duration, width, height, frame, complete) {
  const p4 = _endPoint(p1.corner, width, height);
  return animatef({
    from: 0,
    to: 1,
    frame: function(v) {
      const np = bezier(p1, p1, p4, p4, v);
      frame({ x: np.x, y: np.y, corner: p1.corner });
    },
    complete: function() {
      complete();
    },
    duration: duration
  });
}

function hideFoldedPage(p1, width, height, frame, complete) {
  const p4 = _startPoint(p1.corner, width, height);
  const top = p1.corner.substr(0, 1) === "t";
  const delta = top ? Math.min(0, p1.y - p4.y) / 2 : Math.max(0, p1.y - p4.y) / 2;
  const p2 = point2D(p1.x, p1.y + delta);
  const p3 = point2D(p4.x, p4.y - delta);
  return animatef({
    from: 0,
    to: 1,
    frame: function(v) {
      const np = bezier(p1, p2, p3, p4, v);
      frame({ x: np.x, y: np.y, corner: p1.corner });
    },
    complete: function() {
      complete();
    },
    duration: 600
  });
}

function showFoldedPage(to, width, height, frame, complete) {
  const point = _startPoint(to.corner, width, height, 1);

  return animatef({
    from: [point.x, point.y],
    to: [to.x, to.y],
    duration: 300,
    frame: function(v) {
      const x = Math.round(v[0]);
      const y = Math.round(v[1]);
      frame({ x, y, corner: to.corner });
    },
    complete: function() {
      complete();
    }
  });
}

export default {
  components: { TurnPage },
  props: {
    data: Array,
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      defaultStyles: [{}, {}, {}, {}, {}, {}],
      startPoint: null,
      relPoint: null,
      invalidTouch: false,
      action: null,
      runAnimation: null,
      viewIndex: 0,
      turnPage: null,
      backPage: 0,
      turnActive: false,
      showLastCoverPage: false,
      touchTimeline: [],
      styles: [{}, {}, {}, {}, {}, {}],
      isStart: false
    };
  },
  mounted() {
  },
  activated() {
    this.$nextTick(() => {
      this.TouchMove();
    });
  },
  deactivated() {
    this.$nextTick(() => {
      this.TouchMoveOut();
    });
  },
  methods: {
    TouchMove() {
      if (this.fun.getPhoneEnv() == 3) {
        this.$refs.turn.addEventListener("mousemove", this.handleManualTouchMove, false);
        this.$refs.turn.addEventListener("mousedown", this.handleManualTouchStart, false);
        this.$refs.turn.addEventListener("mouseup", this.handleManualTouchEnd, false);
      } else {
        this.$refs.turn.addEventListener("touchmove", this.handleManualTouchMove, false);
        this.$refs.turn.addEventListener("touchstart", this.handleManualTouchStart, false);
        this.$refs.turn.addEventListener("touchend", this.handleManualTouchEnd, false);
      }
    },
    TouchMoveOut() {
      if (this.fun.getPhoneEnv() == 3) {
        this.$refs.turn.removeEventListener("mousemove", this.handleManualTouchMove, false);
        this.$refs.turn.removeEventListener("mousedown", this.handleManualTouchStart, false);
        this.$refs.turn.removeEventListener("mouseup", this.handleManualTouchEnd, false);
      } else {
        this.$refs.turn.removeEventListener("touchmove", this.handleManualTouchMove, false);
        this.$refs.turn.removeEventListener("touchstart", this.handleManualTouchStart, false);
        this.$refs.turn.removeEventListener("touchend", this.handleManualTouchEnd, false);
      }
    },
    handleManualTouchStart(e) {
      this.isStart = true;
      let x = "";
      let y = "";
      if (this.runAnimation) {
        this.runAnimation.stop();
        this.updateTurn();
      }

      const { width, height, viewIndex } = this;
      if (this.fun.getPhoneEnv() == 3) {
        x = e.clientX - (window.innerWidth - width) / 2;
        y = e.clientY - (window.innerHeight - height) / 2;
      } else {
        x = e.touches[0].clientX - (window.innerWidth - width) / 2;
        y = e.touches[0].clientY - (window.innerHeight - height) / 2;
      }

      this.startPoint = peelingPoint("r", x, y);
      this.touchTimeline = [{ t: Date.now(), x }];

      if (x < width / 2) {
        this.action = "backward";
        if (viewIndex <= 0) {
          this.invalidTouch = true;
          return;
        }
        this.turnPage = viewIndex - 1;
        this.backPage = viewIndex;
      } else {
        this.action = "forward";
        if (viewIndex >= this.data.length - 1) {
          this.invalidTouch = true;
          return;
        }
        this.turnPage = viewIndex;
        this.backPage = viewIndex + 1;
      }
      // console.log(x,this.touchTimeline)
      this.readyTurn();
    },
    handleManualTouchMove(e) {
      let x = "";
      let y = "";
      if (this.isStart) {
        const { width, height } = this;
        if (this.fun.getPhoneEnv() == 3) {
          x = e.clientX - (window.innerWidth - width) / 2;
          y = e.clientY - (window.innerHeight - height) / 2;
        } else {
          x = e.touches[0].clientX - (window.innerWidth - width) / 2;
          y = e.touches[0].clientY - (window.innerHeight - height) / 2;
        }

        const corner = this.startPoint.corner;
        if (this.action === "forward" && this.startPoint.x < x) return;
        if (this.action === "backward" && this.startPoint.x > x) return;

        this.touchTimeline.push({ t: Date.now(), x });
        const point = peelingPoint(corner, x, y);

        if (this.invalidTouch) return;

        this.updateTurn(fold(point, width, height, this.startPoint));
        this.relPoint = point;
        this.turnActive = true;
      }

    },
    handleManualTouchEnd() {
      this.isStart = false;
      const action = this.action;

      if (this.touchTimeline.length < 2) {
        if (this.touchTimeline.length) {
          this.handleManualTaped();
        } else {
          this.turnPage = null;
          this.backPage = this.viewIndex;
        }

        this.invalidTouch = false;
        this.touchTimeline = [];
        return;
      }

      if (this.invalidTouch) {
        if (action === "forward" && this.isSwipe(action)) {
          // this.showLastCoverPage = true
          this.$emit("next", { to: this.viewIndex + 1, from: this.viewIndex });
        }

        if (action === "backward" && this.isSwipe(action)) {
          this.$emit("prev", { to: this.viewIndex - 1, from: this.viewIndex });
        }
      } else {
        if (action === "forward") {
          if (this.isSwipe(action)) {
            this.toPage(this.viewIndex + 1, this.relPoint);
          } else {
            this.hideFolded(this.relPoint, () => {
            });
          }
        }

        if (action === "backward") {
          if (this.isSwipe(action)) {
            this.toPage(this.viewIndex - 1, this.relPoint);
          } else {
            this.turn(this.relPoint, () => {
            });
          }
        }
      }

      this.invalidTouch = false;
      this.touchTimeline = [];
    },
    handleManualTaped() {
      const { width } = this;
      const x = this.touchTimeline[0].x;

      this.action = null;
      if (x < width / 4) return this.toPage(this.viewIndex - 1);
      if (x > width / 4 * 3) return this.toPage(this.viewIndex + 1);

      this.$emit("tap");
    },
    readyTurn() {
      const { width, height } = this;
      const point = this.action === "forward" ? { x: width, y: 0 } : { x: -width, y: 0 };
      const fromPoint = peelingPoint("tr", point.x, point.y);
      // console.log(fromPoint,"fromPoint");
      this.updateTurn(fold(fromPoint, width, height));
    },
    updateTurn(style = [{}, {}, {}, {}, {}, {}]) {
      this.styles = style;
    },
    isSwipe(action) {
      const first = this.touchTimeline[0];
      const last = this.touchTimeline[this.touchTimeline.length - 1];
      const swipeTime = Date.now() - first.t;
      const minTime = 200;
      const minDistance = 20;

      if (action === "forward") return first.x - last.x > 50 || (first.x - last.x > minDistance && swipeTime < minTime);
      if (action === "backward") return last.x - first.x > 50 || (last.x - first.x > minDistance && swipeTime < minTime);
      return false;
    },
    toPage(toPage, startPoint) {
      const fromPage = this.viewIndex;

      if (toPage > fromPage) this.$emit("next", { to: toPage, from: fromPage });
      if (toPage < fromPage) this.$emit("prev", { to: toPage, from: fromPage });

      if (toPage === fromPage || toPage < 0 || toPage > this.data.length - 1) return;

      if (this.runAnimation) {
        this.runAnimation.stop();
      }

      const { width, height } = this;
      const point = toPage > fromPage ? { x: width, y: height - 45 } : { x: -width, y: 45 };
      const fromPoint = peelingPoint("br", point.x, point.y);

      if (toPage > fromPage) {
        if (!this.action) {
          this.action = "forward";
          this.turnPage = fromPage;
          this.backPage = toPage;
          this.turnActive = true;
        }

        this.turn(startPoint || fromPoint, () => {
          this.viewIndex = toPage;
          this.turnPage = null;
          this.backPage = toPage;
          // console.log('完成翻页，当前页', this.backPage)
          this.updateTurn();
          this.turnActive = false;
          this.$emit("change", this.backPage);
        });
      } else {
        if (!this.action) {
          this.action = "backward";
          this.turnPage = toPage;
          this.backPage = fromPage;
        }

        this.hideFolded(startPoint || fromPoint, () => {
          this.viewIndex = toPage;
          this.turnPage = null;
          this.backPage = toPage;
          // console.log('完成翻页，当前页', this.backPage)
          this.updateTurn();
          this.turnActive = false;
          this.$emit("change", this.backPage);
        });
      }
      // console.log('this.turnActive', this.turnPage, this.turnActive)
      this.$emit("turning", this.backPage);
    },
    turn(fromPoint, complete) {
      const { width, height } = this;
      this.runAnimation = turnPage(fromPoint, 600, width, height, point => {
        this.updateTurn(fold(point, width, height));
      }, () => {
        complete();
        this.action = null;
        this.turnPage = null;
        this.backPage = this.viewIndex;
        this.updateTurn();
        this.runAnimation = null;
      });
    },
    hideFolded(fromPoint, complete) {
      const { width, height } = this;
      this.runAnimation = hideFoldedPage(fromPoint, width, height, point => {
        this.updateTurn(fold(point, width, height));
      }, () => {
        complete();
        this.action = null;
        this.turnPage = null;
        this.backPage = this.viewIndex;
        this.updateTurn();
        this.turnActive = false;
        this.runAnimation = null;
      });
    },
    handleCoverTouchStart(e) {
      const x = e.touches[0].clientX;
      this.touchTimeline = [{ t: Date.now(), x }];
    },
    handleCoverTouchMove(e) {
      const x = e.touches[0].clientX;
      this.touchTimeline.push({ t: Date.now(), x });
    },
    handleCoverTouchEnd(e) {
      const first = this.touchTimeline[0];
      const last = this.touchTimeline[this.touchTimeline.length - 1];
      if (last.x - first.x > 20 && last.t - first.t < 200) {
        this.showLastCoverPage = false;
      }
    }
  }
};
