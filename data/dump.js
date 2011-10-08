//
// @brief Dump#p (Ruby Object#p)
// @author ongaeshi
// @date   2011/10/09

var Dump = {
  p: function(v) {
    if (this.isArray(v))
      this.arrayObj(v);
    else
      this.obj(v);
  },

  // --------------------------------------
  v: function(v) {
    if (typeof v == "string")
      v = '"' + v + '"';

    return v;
  },

  obj_s: function(o) {
    var a = [];
    for(var i in o)
      a.push(i + ": "+ this.v(o[i]));
    return "{ " + a.join(", ") + " }";
  },

  obj: function(v) {
    console.log(this.obj_s(v));
  },

  arrayObj: function(v) {
    var a = [];
    for (var i = 0; i < v.length; i++)
      a.push(this.obj_s(v[i]));
    console.log("[" + a.join(", ") + "]");
  },

  // --------------------------------------
  isArray: function(v) { return Object.prototype.toString.call(v)=="[object Array]"; }

};

