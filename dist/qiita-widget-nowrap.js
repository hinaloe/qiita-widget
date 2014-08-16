var ViewQiitaWidget,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ViewQiitaWidget = (function() {
  var parsepush;

  function ViewQiitaWidget(selector) {
    var xhr;
    this.selector = selector != null ? selector : "[data-qiita-widget]";
    this.get = __bind(this.get, this);
    if (typeof window.XMLHttpRequest !== "undefined") {
      xhr = XMLHttpRequest;
    } else if (typeof window.XDomainRequest !== "undefined") {
      xhr = XDomainRequest;
    } else {
      return;
    }
    this.xhr = xhr;
  }

  parsepush = function(data, target) {
    var d, li, link, s, title, u, _i, _len;
    s = document.createElement("div");
    u = document.createElement("ul");
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      link = document.createElement("a");
      link.href = d.url;
      link.textContent = d.title;
      link.target = "_blank";
      li = document.createElement("li");
      li.appendChild(link);
      u.appendChild(li);
    }
    title = document.createElement("h2");
    title.textContent = "" + data[0].user.url_name + "さんの投稿";
    s.appendChild(title);
    s.appendChild(u);
    s.className = "qiita-widget";
    while (target.firstChild) {
      target.removeChild(target.firstChild);
    }
    target.appendChild(s);
  };

  ViewQiitaWidget.prototype.get = function() {
    var area, n, _fn, _i, _len;
    area = document.querySelectorAll(this.selector);
    _fn = (function(_this) {
      return function(n) {
        var count, i, req, screen_name, uri, urlbase;
        i = n;
        screen_name = i.getAttribute("data-name");
        urlbase = "https://qiita.com";
        uri = "/api/v1/users/" + screen_name + "/items";
        count = i.getAttribute("data-count") || "10";
        i.removeAttribute("data-qiita-widget");
        req = new _this.xhr();
        req.onload = function() {
          var res;
          res = JSON.parse(this.responseText);
          parsepush(res, i);
        };
        req.onerror = function(e) {
          console.log(i);
          i.textContent = "Error";
          console.error(e);
        };
        req.open("GET", "" + urlbase + uri + "?per_page=" + count, true);
        req.send();
      };
    })(this);
    for (_i = 0, _len = area.length; _i < _len; _i++) {
      n = area[_i];
      _fn(n);
    }
  };

  ViewQiitaWidget.get = function(s) {
    var i;
    i = new this(s);
    i.get();
    return i;
  };

  return ViewQiitaWidget;

})();

//# sourceMappingURL=qiita-widget-nowrap.js.map
