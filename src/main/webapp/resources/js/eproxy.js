document.getElementById("submit").onclick=function(){var c=document.getElementById("url").value.replace(/^\s\s*/,"").replace(/\s\s*$/,"");if(c){var c=parseUri(c),r=punycode.ToASCII(c.host);c.authority=c.authority.replace(c.host,r);c.host=r;try{ga("send","pageview","/proxy")}catch(t){}c=(c.protocol||"http")+"/"+c.authority+(c.relative?c.relative:"/");location.href=parseUri(location.href).directory+"rwn-"+c}return!1};
document.getElementById("url").onkeydown=function(){try{ga("send","event","URL","keydown")}catch(c){}this.onkeydown=function(){}};
var punycode=new function(){function c(a,h){return a+22+75*(26>a)-((0!=h)<<5)}function r(a,h,d){a=d?Math.floor(a/700):a>>1;a+=Math.floor(a/h);for(h=0;455<a;h+=36)a=Math.floor(a/35);return Math.floor(h+36*a/(a+38))}function t(a,h){a-=(26>a-97)<<5;return a+((!h&&26>a-65)<<5)}this.utf16={decode:function(a){for(var h=[],d=0,f=a.length,e,c;d<f;){e=a.charCodeAt(d++);if(55296===(e&63488)){c=a.charCodeAt(d++);if(55296!==(e&64512)||56320!==(c&64512))throw new RangeError("UTF-16(decode): Illegal UTF-16 sequence");
e=((e&1023)<<10)+(c&1023)+65536}h.push(e)}return h},encode:function(a){for(var h=[],d=0,f=a.length,e;d<f;){e=a[d++];if(55296===(e&63488))throw new RangeError("UTF-16(encode): Illegal UTF-16 value");65535<e&&(e-=65536,h.push(String.fromCharCode(e>>>10&1023|55296)),e=56320|e&1023);h.push(String.fromCharCode(e))}return h.join("")}};this.decode=function(a,h){var d=[],f=[],e=a.length,c,m,b,k,g,n,p,l,q;c=128;b=0;k=72;g=a.lastIndexOf("-");0>g&&(g=0);for(n=0;n<g;++n){h&&(f[d.length]=26>a.charCodeAt(n)-65);
if(128<=a.charCodeAt(n))throw new RangeError("Illegal input \x3e\x3d 0x80");d.push(a.charCodeAt(n))}for(g=0<g?g+1:0;g<e;){n=b;m=1;for(p=36;;p+=36){if(g>=e)throw RangeError("punycode_bad_input(1)");l=a.charCodeAt(g++);l=10>l-48?l-22:26>l-65?l-65:26>l-97?l-97:36;if(36<=l)throw RangeError("punycode_bad_input(2)");if(l>Math.floor((2147483647-b)/m))throw RangeError("punycode_overflow(1)");b+=l*m;q=p<=k?1:p>=k+26?26:p-k;if(l<q)break;if(m>Math.floor(2147483647/(36-q)))throw RangeError("punycode_overflow(2)");
m*=36-q}m=d.length+1;k=r(b-n,m,0===n);if(Math.floor(b/m)>2147483647-c)throw RangeError("punycode_overflow(3)");c+=Math.floor(b/m);b%=m;h&&f.splice(b,0,26>a.charCodeAt(g-1)-65);d.splice(b,0,c);b++}if(h)for(b=0,e=d.length;b<e;b++)f[b]&&(d[b]=String.fromCharCode(d[b]).toUpperCase().charCodeAt(0));return this.utf16.encode(d)};this.encode=function(a,h){var d,f,e,u,m,b,k,g,n,p;h&&(p=this.utf16.decode(a));a=this.utf16.decode(a.toLowerCase());var l=a.length;if(h)for(b=0;b<l;b++)p[b]=a[b]!=p[b];var q=[];d=
128;f=0;m=72;for(b=0;b<l;++b)128>a[b]&&q.push(String.fromCharCode(p?t(a[b],p[b]):a[b]));e=u=q.length;for(0<u&&q.push("-");e<l;){k=2147483647;for(b=0;b<l;++b)g=a[b],g>=d&&g<k&&(k=g);if(k-d>Math.floor((2147483647-f)/(e+1)))throw RangeError("punycode_overflow (1)");f+=(k-d)*(e+1);d=k;for(b=0;b<l;++b){g=a[b];if(g<d&&2147483647<++f)return Error("punycode_overflow(2)");if(g==d){k=f;for(g=36;;g+=36){n=g<=m?1:g>=m+26?26:g-m;if(k<n)break;q.push(String.fromCharCode(c(n+(k-n)%(36-n),0)));k=Math.floor((k-n)/
(36-n))}q.push(String.fromCharCode(c(k,h&&p[b]?1:0)));m=r(f,e+1,e==u);f=0;++e}}++f;++d}return q.join("")};this.ToASCII=function(a){a=a.split(".");for(var c=[],d=0;d<a.length;++d){var f=a[d];c.push(f.match(/[^A-Za-z0-9-]/)?"xn--"+punycode.encode(f):f)}return c.join(".")};this.ToUnicode=function(a){a=a.split(".");for(var c=[],d=0;d<a.length;++d){var f=a[d];c.push(f.match(/^xn--/)?punycode.decode(f.slice(4)):f)}return c.join(".")}};
function parseUri(c){var r="source protocol authority userInfo user password host port relative path directory file query anchor".split(" ");c=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(c);for(var t={},a=14;a--;)t[r[a]]=c[a]||"";t.queryKey={};t[r[12]].replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(a,c,f){c&&(t.queryKey[c]=f)});return t};