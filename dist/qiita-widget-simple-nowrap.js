var ViewQiitaWidget,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ViewQiitaWidget = (function() {
  var onerror, parsepush;

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
    target.appendChild(s);
  };

  onerror = function(e) {
    console.error(e);
  };

  ViewQiitaWidget.prototype.get = function() {
    var area, count, i, req, screen_name, uri, urlbase, _i, _len;
    area = document.querySelectorAll(this.selector);
    for (_i = 0, _len = area.length; _i < _len; _i++) {
      i = area[_i];
      screen_name = i.getAttribute("data-name");
      urlbase = "https://qiita.com";
      uri = "/api/v1/users/" + screen_name + "/items";
      count = i.getAttribute("data-count") || "10";
      i.removeAttribute("data-qiita-widget");
      req = new this.xhr();
      req.onload = function() {
        var res;
        res = JSON.parse(this.responseText);
        parsepush(res, i);
      };
      req.onerror = onerror;
      req.open("GET", "" + urlbase + uri + "?per_page=" + count, true);
      req.send();
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

ViewQiitaWidget.get();

//# sourceMappingURL=qiita-widget-simple-nowrap.js.map
