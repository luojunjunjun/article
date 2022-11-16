;var encode_version = 'jsjiami.com.v5', duvdv = '',
    _0x2a05 = ['UDJ5w6V6', 'MRsDwpdz', 'wrUawqESHQ==', '6L+r5pil5LqL5LmL5Lm257O35YqUUMKx5pKX5L+R44Gq', '56uD6ZS85o6W6amq57qxwpjigb5lD+WJj+WsteKBvsKs5ZKKw4HigZwKwq/opLHlrIjigpR277+i5L+65Y+b5L6955uRJSU744Kb', 'w6rDhm0v', 'KcO+w73CihPDvg==', 'w7TDiXkuIHdv', 'cjrDlA==', 'N1nChMKQEDN7w7Ar', '54qE5p2e5Y+/7761C8KK5Lyp5a2j5p2L5b6H56u177+x6L6h6KyE5pe45o6C5omC5Liu55ug5beB5L6N', 'wrUMwqTDs8O3', 'cn3DiVgP', 'w5/DocKQwpoI'];
(function (_0x4943d7, _0x47c99b) {
    var _0x387117 = function (_0x216807) {
        while (--_0x216807) {
            _0x4943d7['push'](_0x4943d7['shift']());
        }
    };
    _0x387117(++_0x47c99b);
}(_0x2a05, 0xc7));
var _0x3de3 = function (_0x2839d6, _0x123d47) {
    _0x2839d6 = _0x2839d6 - 0x0;
    var _0x12457a = _0x2a05[_0x2839d6];
    if (_0x3de3['initialized'] === undefined) {
        (function () {
            var _0x3ef7ee = typeof window !== 'undefined' ? window : typeof process === 'object' && typeof require === 'function' && typeof global === 'object' ? global : this;
            var _0x5865fc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            _0x3ef7ee['atob'] || (_0x3ef7ee['atob'] = function (_0x56c5f2) {
                var _0x205802 = String(_0x56c5f2)['replace'](/=+$/, '');
                for (var _0x34be5a = 0x0, _0x16a13a, _0xf9d704, _0x138789 = 0x0, _0x2933d0 = ''; _0xf9d704 = _0x205802['charAt'](_0x138789++); ~_0xf9d704 && (_0x16a13a = _0x34be5a % 0x4 ? _0x16a13a * 0x40 + _0xf9d704 : _0xf9d704, _0x34be5a++ % 0x4) ? _0x2933d0 += String['fromCharCode'](0xff & _0x16a13a >> (-0x2 * _0x34be5a & 0x6)) : 0x0) {
                    _0xf9d704 = _0x5865fc['indexOf'](_0xf9d704);
                }
                return _0x2933d0;
            });
        }());
        var _0x1d0d67 = function (_0x2bfbb0, _0x39a5a3) {
            var _0x7d2982 = [], _0x2aebb6 = 0x0, _0x9d7113, _0x54d235 = '', _0x1ecd20 = '';
            _0x2bfbb0 = atob(_0x2bfbb0);
            for (var _0x4d4aaf = 0x0, _0x219802 = _0x2bfbb0['length']; _0x4d4aaf < _0x219802; _0x4d4aaf++) {
                _0x1ecd20 += '%' + ('00' + _0x2bfbb0['charCodeAt'](_0x4d4aaf)['toString'](0x10))['slice'](-0x2);
            }
            _0x2bfbb0 = decodeURIComponent(_0x1ecd20);
            for (var _0x54cdad = 0x0; _0x54cdad < 0x100; _0x54cdad++) {
                _0x7d2982[_0x54cdad] = _0x54cdad;
            }
            for (_0x54cdad = 0x0; _0x54cdad < 0x100; _0x54cdad++) {
                _0x2aebb6 = (_0x2aebb6 + _0x7d2982[_0x54cdad] + _0x39a5a3['charCodeAt'](_0x54cdad % _0x39a5a3['length'])) % 0x100;
                _0x9d7113 = _0x7d2982[_0x54cdad];
                _0x7d2982[_0x54cdad] = _0x7d2982[_0x2aebb6];
                _0x7d2982[_0x2aebb6] = _0x9d7113;
            }
            _0x54cdad = 0x0;
            _0x2aebb6 = 0x0;
            for (var _0x3f53ff = 0x0; _0x3f53ff < _0x2bfbb0['length']; _0x3f53ff++) {
                _0x54cdad = (_0x54cdad + 0x1) % 0x100;
                _0x2aebb6 = (_0x2aebb6 + _0x7d2982[_0x54cdad]) % 0x100;
                _0x9d7113 = _0x7d2982[_0x54cdad];
                _0x7d2982[_0x54cdad] = _0x7d2982[_0x2aebb6];
                _0x7d2982[_0x2aebb6] = _0x9d7113;
                _0x54d235 += String['fromCharCode'](_0x2bfbb0['charCodeAt'](_0x3f53ff) ^ _0x7d2982[(_0x7d2982[_0x54cdad] + _0x7d2982[_0x2aebb6]) % 0x100]);
            }
            return _0x54d235;
        };
        _0x3de3['rc4'] = _0x1d0d67;
        _0x3de3['data'] = {};
        _0x3de3['initialized'] = !![];
    }
    var _0x5d7101 = _0x3de3['data'][_0x2839d6];
    if (_0x5d7101 === undefined) {
        if (_0x3de3['once'] === undefined) {
            _0x3de3['once'] = !![];
        }
        _0x12457a = _0x3de3['rc4'](_0x12457a, _0x123d47);
        _0x3de3['data'][_0x2839d6] = _0x12457a;
    } else {
        _0x12457a = _0x5d7101;
    }
    return _0x12457a;
};

exports.decryptStr = _0x3de3;
exports.decryptStrFnName = '_0x3de3';


