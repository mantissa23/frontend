var retailrocket = window["retailrocket"] || {};

retailrocket.segmentator = (function () {
    var visitorSegmenRecordCookieName = "rr-VisitorSegment";
    
    /*! https://mths.be/punycode v1.4.0 by @mathias */
    var punycode = (function (a) {
        function b(a) { throw new RangeError(E[a]) } function c(a, b) { for (var c = a.length, d = []; c--;) d[c] = b(a[c]); return d } function d(a, b) { var d = a.split("@"), e = ""; d.length > 1 && (e = d[0] + "@", a = d[1]), a = a.replace(D, "."); var f = a.split("."), g = c(f, b).join("."); return e + g } function e(a) { for (var b, c, d = [], e = 0, f = a.length; f > e;) b = a.charCodeAt(e++), b >= 55296 && 56319 >= b && f > e ? (c = a.charCodeAt(e++), 56320 == (64512 & c) ? d.push(((1023 & b) << 10) + (1023 & c) + 65536) : (d.push(b), e--)) : d.push(b); return d } function f(a) { return c(a, function (a) { var b = ""; return a > 65535 && (a -= 65536, b += H(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), b += H(a) }).join("") } function g(a) { return 10 > a - 48 ? a - 22 : 26 > a - 65 ? a - 65 : 26 > a - 97 ? a - 97 : t } function h(a, b) { return a + 22 + 75 * (26 > a) - ((0 != b) << 5) } function i(a, b, c) { var d = 0; for (a = c ? G(a / x) : a >> 1, a += G(a / b) ; a > F * v >> 1; d += t) a = G(a / F); return G(d + (F + 1) * a / (a + w)) } function j(a) { var c, d, e, h, j, k, l, m, n, o, p = [], q = a.length, r = 0, w = z, x = y; for (d = a.lastIndexOf(A), 0 > d && (d = 0), e = 0; d > e; ++e) a.charCodeAt(e) >= 128 && b("not-basic"), p.push(a.charCodeAt(e)); for (h = d > 0 ? d + 1 : 0; q > h;) { for (j = r, k = 1, l = t; h >= q && b("invalid-input"), m = g(a.charCodeAt(h++)), (m >= t || m > G((s - r) / k)) && b("overflow"), r += m * k, n = x >= l ? u : l >= x + v ? v : l - x, !(n > m) ; l += t) o = t - n, k > G(s / o) && b("overflow"), k *= o; c = p.length + 1, x = i(r - j, c, 0 == j), G(r / c) > s - w && b("overflow"), w += G(r / c), r %= c, p.splice(r++, 0, w) } return f(p) } function k(a) { var c, d, f, g, j, k, l, m, n, o, p, q, r, w, x, B = []; for (a = e(a), q = a.length, c = z, d = 0, j = y, k = 0; q > k; ++k) p = a[k], 128 > p && B.push(H(p)); for (f = g = B.length, g && B.push(A) ; q > f;) { for (l = s, k = 0; q > k; ++k) p = a[k], p >= c && l > p && (l = p); for (r = f + 1, l - c > G((s - d) / r) && b("overflow"), d += (l - c) * r, c = l, k = 0; q > k; ++k) if (p = a[k], c > p && ++d > s && b("overflow"), p == c) { for (m = d, n = t; o = j >= n ? u : n >= j + v ? v : n - j, !(o > m) ; n += t) x = m - o, w = t - o, B.push(H(h(o + x % w, 0))), m = G(x / w); B.push(H(h(m, 0))), j = i(d, r, f == g), d = 0, ++f } ++d, ++c } return B.join("") } function l(a) { return d(a, function (a) { return B.test(a) ? j(a.slice(4).toLowerCase()) : a }) } function m(a) { return d(a, function (a) { return C.test(a) ? "xn--" + k(a) : a }) } var n = "object" == typeof exports && exports && !exports.nodeType && exports, o = "object" == typeof module && module && !module.nodeType && module, p = "object" == typeof global && global; (p.global === p || p.window === p || p.self === p) && (a = p); var q, r, s = 2147483647, t = 36, u = 1, v = 26, w = 38, x = 700, y = 72, z = 128, A = "-", B = /^xn--/, C = /[^\x20-\x7E]/, D = /[\x2E\u3002\uFF0E\uFF61]/g, E = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" }, F = t - u, G = Math.floor, H = String.fromCharCode; return { version: "1.3.2", ucs2: { decode: e, encode: f }, decode: j, encode: k, toASCII: m, toUnicode: l };
    })();
    
    function getCookie(cName) {
        var i, x, y, arRcookies = document.cookie.split(";");
        for (i = 0; i < arRcookies.length; i++) {
            x = arRcookies[i].substr(0, arRcookies[i].indexOf("="));
            y = arRcookies[i].substr(arRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == cName) {
                return unescape(y);
            }
        }
        return null;
    }

    function setCookie(cName, value, expireInSecond, path, domain) {
        var exdate = new Date();
        exdate.setSeconds(exdate.getSeconds() + expireInSecond);

        var cValue = escape(value || "") + ((expireInSecond == null) ? "" : "; expires=" + exdate.toUTCString()) + (";path=" + (path || "/")) + (domain ? ";domain=" + punycode.toASCII(domain) : "");
        document.cookie = cName + "=" + cValue;
    }

    function setRootCookie(cName, value, expireInSecond) {
        var hostname = location.hostname;
        var subDomains = hostname.split('.');

        for (var i = 1; i <= subDomains.length; i++) {
            var domain = subDomains.slice(subDomains.length - i).join(".");
            setCookie(cName, value, expireInSecond, "/", domain);
            if (getCookie(cName) == value)
                break;
        }
    }

    var rrLibrary = {
        getCookie: getCookie,
        daysToSecond: function (days) {
            return days * 24 * 60 * 60;
        },
        setRootCookie: setRootCookie
    };

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return {
        getVisitorSegment: function (nSegment, option) {
            option = option || {};
            var visitorSegmentRecord = rrLibrary.getCookie(visitorSegmenRecordCookieName);

            if (!visitorSegmentRecord || visitorSegmentRecord.split(":")[0] != nSegment) {
                visitorSegmentRecord = nSegment + ":" + randomInt(1, nSegment);
            }

            rrLibrary.setRootCookie(visitorSegmenRecordCookieName, visitorSegmentRecord, rrLibrary.daysToSecond(option.expireInDay || 60), "/");
            return visitorSegmentRecord.split(":")[1];
        }
    };
}());
