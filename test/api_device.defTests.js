/*
 Copyright (c) 2014, Intel Corporation

 Redistribution and use in source and binary forms, with or without modification,
 are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var assert =  require('chai').assert;
var url = require('url');

var fileToTest = "../api/rest/devices.def.js";

describe(fileToTest, function() {
    var logger  = {
        info : function() {},
        error : function() {},
        debug : function() {}
    };
    console.debug = function() {
        console.log(arguments);
    };
    function makeTokenBearer (token) {
        return "Bearer " + token;
    }
    it('Shall Return the DeviceActivateOption for Request  >', function(done) {
        var config = {
            connector: {
                rest: {
                    protocol: "http",
                    host: "myapi",
                    port: 1000
                }
            },

        };
        var data = {
            deviceId: 20000,
            body: {
                a: 1,
                b: 2,
                c: [1,2,3]
            }
        };

        var toTest = require(fileToTest)(config);
        var deTest = new toTest.DeviceActivateOption(data);
        var urD = url.parse(deTest.url);
        assert.equal(urD.hostname, config.connector.rest.host, "the host data is missing");
        assert.equal(urD.port,  config.connector.rest.port, "the port were missing");
        assert.equal(urD.pathname, "/v1/api/devices/register", "path improper formed");
        assert.equal(deTest.body, JSON.stringify(data.body));
        assert.equal(deTest.method, "POST", "The verb is incorrect");
        done();
    });
    it('Shall Return the DeviceMetadataOption for Request  >', function(done) {
        var config = {
            connector: {
                rest: {
                    proxy: {
                        host: "myprox",
                        port: 2222
                    },
                    protocol: "http",
                    host: "myapi",
                    port: 1000
                }
            }
        };
        var data = {
            deviceId: 20000,
            body: {
                a: 1,
                b: 2,
                c: [1,2,3]
            }
        };

        var toTest = require(fileToTest)(config);
        var deTest = new toTest.DeviceMetadataOption(data);
        var urlD = url.parse(deTest.url);
        assert.equal(urlD.hostname, config.connector.rest.host, "the host data is missing");
        assert.equal(urlD.port, config.connector.rest.port, "the port were missing");
        assert.equal(urlD.pathname, "/v1/api/devices/20000", "path improper formed");
        assert.equal(deTest.body, JSON.stringify(data.body));
        assert.equal(deTest.method, "PUT", "The verb is incorrect");
        done();
    });
    it('Shall Return the DeviceComponentOption for Request  >', function(done) {
        var config = {
            connector: {
                rest: {
                    proxy: {
                        host: "myprox",
                        port: 2222
                    },
                    protocol: "http",
                    host: "myapi",
                    port: 1000
                }
            }
        };
        var data = {
            deviceId: 20000,
            deviceToken: "Thisis Mytoken",
            body: {
                a: 1,
                b: 2,
                c: [1,2,3]
            }
        };

        var toTest = require(fileToTest)(config);
        var deTest = new toTest.DeviceComponentOption(data);
        var urlD = url.parse(deTest.url);
        assert.equal(urlD.hostname, config.connector.rest.host, "the host data is missing");
        assert.equal(urlD.port, config.connector.rest.port, "the port were missing");
        assert.equal(urlD.pathname, "/v1/api/devices/20000/components", "path improper formed");
        assert.equal(deTest.body, JSON.stringify(data.body));
        assert.equal(deTest.method, "POST", "The verb is incorrect");
        assert.isObject(deTest.headers, "Shall be an Object with a Key-Value for HTTP Header");
        assert.property(deTest.headers, "Content-type", "The content Type has not Set");
        assert.property(deTest.headers, "Authorization", "The Authorization Header has not set");
        assert.equal(deTest.headers["Authorization"], makeTokenBearer(data.deviceToken),
            "The Authorization Header has not set");
        done();
    });
    it('Shall Return the DeviceComponentOption for Request  >', function(done) {
        var config = {
            connector: {
                rest: {
                    proxy: {
                        host: "myprox",
                        port: 2222
                    },
                    protocol: "http",
                    host: "myapi3",
                    port: 1000
                }
            }
        };
        var data = {
            deviceId: 20022,
            deviceToken: "Thisis Mytoken",
            body: {
                a: 1,
                d: 2,
                n: [2,3]
            }
        };

        var toTest = require(fileToTest)(config);
        var deTest = new toTest.DeviceSubmitDataOption(data);
        var urlD = url.parse(deTest.url);
        assert.equal(urlD.hostname, config.connector.rest.host, "the host data is missing");
        assert.equal(urlD.port, config.connector.rest.port, "the port were missing");
        assert.equal(urlD.pathname, "/v1/api/data/20022", "path improper formed");
        assert.equal(deTest.body, JSON.stringify(data.body));
        assert.equal(deTest.method, "POST", "The verb is incorrect");
        assert.isObject(deTest.headers, "Shall be an Object with a Key-Value for HTTP Header");
        assert.property(deTest.headers, "Content-type", "The content Type has not Set");
        assert.property(deTest.headers, "Authorization", "The Authorization Header has not set");
        assert.equal(deTest.headers["Authorization"], makeTokenBearer(data.deviceToken),
            "The Authorization Header has not set");
        done();
    });

    it('Shall Return the DevicesTagsOption for Request  >', function(done) {
        var config = {
            connector: {
                rest: {
                    proxy: {
                        host: "myprox",
                        port: 2222
                    },
                    protocol: "http",
                    host: "myapi3",
                    port: 1000
                }
            }
        };
        var data = {
            accountId: 20022,
            deviceToken: "Thisis Mytoken",
            body: {
                a: 1,
                d: 2,
                n: [2,3]
            }
        };

        var toTest = require(fileToTest)(config);
        var deTest = new toTest.GetDevicesTagsOption(data);
        var urlD = url.parse(deTest.url);
        assert.equal(urlD.hostname, config.connector.rest.host, "the host data is missing");
        assert.equal(urlD.port, config.connector.rest.port, "the port were missing");
        assert.equal(urlD.pathname, "/v1/api/accounts/20022/devices/tags", "path improper formed");
        assert.equal(deTest.body, null);
        assert.equal(deTest.method, "GET", "The verb is incorrect");
        done();
    });

    it('Shall Return the DevicesAttrOption for Request  >', function(done) {
        var config = {
            connector: {
                rest: {
                    proxy: {
                        host: "myprox",
                        port: 2222
                    },
                    protocol: "http",
                    host: "myapi3",
                    port: 1000
                }
            }
        };
        var data = {
            accountId: 20022,
            deviceToken: "Thisis Mytoken",
            body: {
                a: 1,
                d: 2,
                n: [2,3]
            }
        };

        var toTest = require(fileToTest)(config);
        var deTest = new toTest.GetDevicesAttrOption(data);
        var urlD = url.parse(deTest.url);
        assert.equal(urlD.hostname, config.connector.rest.host, "the host data is missing");
        assert.equal(urlD.port, config.connector.rest.port, "the port were missing");
        assert.equal(urlD.pathname, "/v1/api/accounts/20022/devices/attributes", "path improper formed");
        assert.equal(deTest.body, null);
        assert.equal(deTest.method, "GET", "The verb is incorrect");
        done();
    });

    it('Shall Return the CountsDevicesOption for Request  >', function(done) {
        var config = {
            connector: {
                rest: {
                    proxy: {
                        host: "myprox",
                        port: 2222
                    },
                    protocol: "http",
                    host: "myapi3",
                    port: 1000
                }
            }
        };
        var data = {
            accountId: 20022,
            deviceToken: "Thisis Mytoken",
            body: {
                a: 1,
                d: 2,
                n: [2,3]
            }
        };

        var toTest = require(fileToTest)(config);
        var deTest = new toTest.CountsDevicesOption(data);
        var urlD = url.parse(deTest.url);
        assert.equal(urlD.hostname, config.connector.rest.host, "the host data is missing");
        assert.equal(urlD.port, config.connector.rest.port, "the port were missing");
        assert.equal(urlD.pathname, "/v1/api/accounts/20022/devices/count", "path improper formed");
        assert.equal(deTest.body, JSON.stringify(data.body));
        assert.equal(deTest.method, "POST", "The verb is incorrect");
        done();
    });

    it('Shall Return the SearchDevicesOption for Request  >', function(done) {
        var config = {
            connector: {
                rest: {
                    proxy: {
                        host: "myprox",
                        port: 2222
                    },
                    protocol: "http",
                    host: "myapi3",
                    port: 1000
                }
            }
        };
        var data = {
            accountId: 20022,
            deviceToken: "Thisis Mytoken",
            body: {
                a: 1,
                d: 2,
                n: [2,3]
            }
        };

        var toTest = require(fileToTest)(config);
        var deTest = new toTest.SearchDevicesOption(data);
        var urlD = url.parse(deTest.url);
        assert.equal(urlD.hostname, config.connector.rest.host, "the host data is missing");
        assert.equal(urlD.port, config.connector.rest.port, "the port were missing");
        assert.equal(urlD.pathname, "/v1/api/accounts/20022/devices/search", "path improper formed");
        assert.equal(deTest.body, JSON.stringify(data.body));
        assert.equal(deTest.method, "POST", "The verb is incorrect");
        done();
    });

    it('Shall Return the GetTotalsOption for Request >', function(done) {
        var config = {
            connector: {
                rest: {
                    proxy: {
                        host: "myprox",
                        port: 2222
                    },
                    protocol: "http",
                    host: "myapi3",
                    port: 1000
                }
            }
        };
        var data = {
            accountId: 20022,
            userToken: "Thisis Mytoken",
            body: {
                a: 1,
                d: 2,
                n: [2,3]
            }
        };
        var toTest = require(fileToTest)(config);
        var deTest = new toTest.GetTotalsOption(data);
        var urlD = url.parse(deTest.url);
        assert.equal(urlD.hostname, config.connector.rest.host, "the host data is missing");
        assert.equal(urlD.port, config.connector.rest.port, "the port were missing");
        assert.equal(urlD.pathname, "/v1/api/accounts/20022/devices/totals", "path improper formed");
        assert.equal(deTest.body, null);
        assert.equal(deTest.method, "GET", "The verb is incorrect");
        assert.equal(deTest.headers["Authorization"], makeTokenBearer(data.userToken),
            "The Authorization Header has not set");
        done();
    });
});
