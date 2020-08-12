/**
 * Created by Il Yeup, Ahn in KETI on 2017-02-25.
 */

/**
 * Copyright (c) 2018, OCEAN
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * 3. The name of the author may not be used to endorse or promote products derived from this software without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// for TAS
var fs = require('fs');

const { exec } = require('child_process');

var socket_arr = {};
exports.socket_arr = socket_arr;

var tas_buffer = {};
exports.buffer = tas_buffer;

var img_ready = 0;
var img_send_interval = 16000;
function test_timer_upload_action() {
    if (sh_state == 'crtci') {
        if(img_ready == 1) {
            img_ready = 0;
//            var parent = '/Mobius/iot_algae/pontoon_mimas/camera/red/202007-red/20200707-red';
//            var gap = parseInt(10 + Math.random() * 30);
//            setTimeout(send_data_pontoon, gap, parent, pontoon_con);

            // var pontoon_name = 'pontoon_mimas';
            //
            // var gap = parseInt((img_send_interval * 0) + 10 + Math.random() * 30);
            // setTimeout(send_im_pontoon, gap, pontoon_name, 'red', pontoon_con_im['rr']);
            //
            // gap = parseInt((img_send_interval * 1) + 10 + Math.random() * 30);
            // setTimeout(send_im_pontoon, gap, pontoon_name, 'near-ir', pontoon_con_im['ni']);
            //
            // gap = parseInt((img_send_interval * 2) + 10 + Math.random() * 30);
            // setTimeout(send_im_pontoon, gap, pontoon_name, 'red-edge', pontoon_con_im['re']);
            //
            // gap = parseInt((img_send_interval * 3) + 10 + Math.random() * 30);
            // setTimeout(send_im_pontoon, gap, pontoon_name, 'green', pontoon_con_im['gg']);
            //
            // gap = parseInt((img_send_interval * 4) + 10 + Math.random() * 30);
            // setTimeout(send_im_pontoon, gap, pontoon_name, 'blue', pontoon_con_im['bb']);
        }
    }

    // setTimeout(function () {
    //     build_data_pontoon();
    // }, 60000);

    //build_data_pontoon();
}

function send_data_pontoon(parent, con) {
    sh_adn.crtci(parent, 0, con, function (status) {
        console.log('x-m2m-rsc : ' + status + ' <----');
    });
}

function send_im_pontoon(pontoon_name, color, icon) {
    var parent = '/Mobius/iot_algae/' + pontoon_name + '/camera/' + color + '/202007-' + color + '/20200708-' + color;

    sh_adn.crtci(parent, 0, icon, function (status) {
        console.log('x-m2m-rsc : ' + status + ' <----');
    });
}

var pontoon_con = {};
var pontoon_icon = {};
const moment = require('moment');

var pontoon_con_im = {};
pontoon_con_im.rr = {};
pontoon_con_im.gg = {};
pontoon_con_im.bb = {};
pontoon_con_im.ni = {};
pontoon_con_im.re = {};

function build_data_pontoon() {
//     function makeRandom(min, max){
//         var RandVal = Math.floor(Math.random()*(max-min+1)) + min;
//         return RandVal;
//     }
//
//     // var a = makeRandom(1, 1000);
//
//     function padLeft(nr, n, str){
//         return Array(n-String(nr).length+1).join(str||'0')+nr;
//     }
//
// //or as a Number prototype method:
//
//     Number.prototype.padLeft = function(n,str){
//         return Array(n-String(this).length+1).join(str||'0')+this;
//     };
//
//     var type1 = padLeft(Math.floor(Math.random() * 1000) + 1,14);       //=> (1)
//     var type2 = padLeft(Math.floor(Math.random() * 1000) + 1,10) + '.' + padLeft(makeRandom(0, 9999), 4);    //=> (2)
//     var type3 = padLeft(Math.floor(Math.random() * 1000) + 1,10);       //=> (3)
//     var type4 = padLeft(Math.floor(Math.random() * 1000) + 1,11);       //=> (4)
//     var ct = moment().format("YYYYMMDDhhmmss");
//
//
//     //컨테이너명 추가 및 바꾸기
//     //data > YYYYMM-data > YYYYMMDD-data
//     //camera > green > YYYYMM-green > YYYYMMDD-green
//     var ctcon = moment().format("YYYYMMDD");
//     console.log('ctcon :::::::: ' + ctcon);
//
//
//     var con = {
//         dat00: ct,
//
//         dat01: type2,
//         dat02: type2,
//         dat03: type2,
//         dat04: type2,
//         dat05: type2,
//         dat06: type2,
//         dat07: type2,
//         dat08: type2,
//         dat09: type2,
//         dat10: type2,
//
//         dat11: type2,
//         dat12: type2,
//         dat13: type2,
//         dat14: type2,
//         dat15: type3,
//         dat16: type4,
//         dat17: type2,
//         dat18: type2,
//         dat19: type2,
//         dat20: type2,
//
//         dat21: type2,
//         dat22: type3,
//         dat23: type3,
//         dat24: type3,
//         dat25: type3,
//         dat26: type3,
//         dat27: type2,
//         dat28: type2,
//         dat29: type2,
//         dat30: type2,
//
//         dat31: type3,
//         dat32: type3,
//         dat33: type3,
//         dat34: type3,
//         dat35: type3,
//         dat36: type3,
//         dat37: type3,
//         dat38: type3,
//         dat39: type3,
//         dat40: type3,
//
//         dat41: type3,
//         //dat42: type3,
//         //dat43: type3,
//         //dat44: type2
//     };
//
//     pontoon_con = JSON.parse(JSON.stringify(con));

    var im_ct = moment().format('YYYY-MM-DD HH:mm:ss');
    for (var idx in camera_abbr) {
        if (camera_abbr.hasOwnProperty(idx)) {
            var file_name = 'pontoon_titania_2020-07-08 12-30-00_'+ camera_abbr[idx] + '.tiff';
            var im = fs.readFileSync(file_name, 'base64');

            pontoon_con_im[camera_abbr[idx]].ct = im_ct;
            pontoon_con_im[camera_abbr[idx]].im = im;
        }
    }

    img_ready = 1;
}

global.timer_upload = null;
global.timer_build = null;

exports.ready = function tas_ready () {
    if(conf.sim == 'enable') {
        timer_upload = setInterval(test_timer_upload_action, (5) * (60 * 1000));
        timer_build = setInterval(build_data_pontoon, 50000);
    }
};


exports.data_noti = function(path_arr, cinObj) {
    // data parsing
    var cin = {};
    cin.ctname = path_arr[path_arr.length-2];

    cin.con = (cinObj.con != null) ? cinObj.con : cinObj.content;  //dat00 ...
    delete cinObj;
    cinObj = null;

    if(cin.con == '') {
        console.log('---- is not cin message');
    }
    else {
        var pontoon_name = path_arr[3];

        for(var i = 0; i < Object.keys(cin.con).length; i++) {
            var data_key = Object.keys(cin.con)[i].toUpperCase();
            var data_value = cin.con[Object.keys(cin.con)[i]];

            conf.dataset_list[pontoon_name][dataset_index[data_key]] = data_value;
        }

        // console.log('pontoon sensor data list: ' + conf.dataset_list[pontoon_name]);
        //
        // var data_parent = conf.cnt[conf.dataset_list_idx[pontoon_name]].parent + '/' + conf.cnt[conf.dataset_list_idx[pontoon_name]].name;
        // var cur_dataset = JSON.parse(JSON.stringify(conf.dataset_list[pontoon_name]));
        // setTimeout(send_dataset, 10, data_parent, cur_dataset);
        //
        // conf.dataset_list[pontoon_name] = [];
        // for(var tt = 0; tt < 50; tt++) {
        //     conf.dataset_list[pontoon_name].push('0');
        // }

        var ref_ct = moment(cin.con['DAT00'], 'YYYYMMDDHHmmss').subtract(10, 'minutes').format('YYYY-MM-DD HH:mm:00');
//        var ref_ct = moment().subtract(10, 'minutes').format("YYYY-MM-DD HH:mm:00");
        setTimeout(start_check_camera_images, 10 + Math.random() * 100, pontoon_name, 0, ref_ct);
    }
};


function build_dataset(pontoon_name) {
    console.log('pontoon sensor data list: ' + conf.dataset_list[pontoon_name]);

    var data_parent = conf.cnt[conf.dataset_list_idx[pontoon_name]].parent + '/' + conf.cnt[conf.dataset_list_idx[pontoon_name]].name;
    var cur_dataset = JSON.parse(JSON.stringify(conf.dataset_list[pontoon_name]));
    setTimeout(send_dataset, 10, pontoon_name, data_parent, cur_dataset);
}

//이미지 파일 디코딩 하는 함수
function base64_decode(base64str, file) {
    // 버퍼 객체를 만든후 첫번째 인자로 base64 스트링, 두번째 인자는 파일 경로를 지정 파일이름만 있으면 프로젝트 root에 생성
    var bitmap = Buffer.from(base64str, 'base64');
    // 버퍼의 파일을 쓰기
    fs.writeFileSync(file, bitmap);
    //console.log('******** base64로 인코딩되었던 파일 쓰기 성공 ********');
}


var dataset_index = {

    DAT00: 0,
    DAT01: 1,
    DAT02: 2,
    DAT03: 3,
    DAT04: 4,
    DAT05: 5,
    DAT06: 6,
    DAT07: 7,
    DAT08: 8,
    DAT09: 9,
    DAT10: 10,

    DAT11: 11,
    DAT12: 12,
    DAT13: 13,
    DAT14: 14,
    DAT15: 15,
    DAT16: 16,
    DAT17: 17,
    DAT18: 18,
    DAT19: 19,
    DAT20: 20,

    DAT21: 21,
    DAT22: 22,
    DAT23: 23,
    DAT24: 24,
    DAT25: 25,
    DAT26: 26,
    DAT27: 27,
    DAT28: 28,
    DAT29: 29,
    DAT30: 30,

    DAT31: 31,
    DAT32: 32,
    DAT33: 33,
    DAT34: 34,
    DAT35: 35,
    DAT36: 36,
    DAT37: 37,
    DAT38: 38,
    DAT39: 39,
    DAT40: 40,
    DAT41: 41,

};

dataset_index['near-ir'] = 42;
dataset_index['red'] = 43;
dataset_index['blue'] = 44;
dataset_index['green'] = 45;
dataset_index['red-edge'] = 46;

var camera_abbr = [];
camera_abbr['near-ir'] = 'ni';
camera_abbr['red'] = 'rr';
camera_abbr['blue'] = 'bb';
camera_abbr['green'] = 'gg';
camera_abbr['red-edge'] = 're';

var count = 0;
var im_flag = 0;
exports.img_noti = function(path_arr, cinObj) {

    var cin = {};

    var day_cnt = moment().format("YYYYMMDD");
    cin.ctname = path_arr[path_arr.length-2].replace(day_cnt+'-', '');

    cin.rn = cinObj.rn;
    cin.con = (cinObj.con != null) ? cinObj.con : cinObj.content;
    delete cinObj;
    cinObj = null;

    if(cin.con == '') {
        console.log('---- is not cin message');
    }
    else {
        //console.log(JSON.stringify(cin));
        // console.log('<---- send to tas');
        //
        // if (socket_arr[path_arr[path_arr.length-2]] != null) {
        //     socket_arr[path_arr[path_arr.length-2]].write(JSON.stringify(cin) + '<EOF>');
        // }
        // delete cin;
        // cin = null;

        var file_ct = cin.con.ct.split(' ')[1];
        file_ct = file_ct.replace(/:/g, '-');
        var pontoon_name = path_arr[3];
        var file_name = './' + pontoon_name + '_' + file_ct + '_' + camera_abbr[cin.ctname] + '.tiff';
        var img_data = cin.con.im;
        var cin_ctname = cin.ctname;
        //console.log('cin.ctname::: ' + cin.ctname + " and ---- cin.rn :::" + cin.rn);
        setTimeout(get_main_color, (59000 + Math.random() * 1000), img_data, file_name, pontoon_name, cin_ctname);
    }
};


function get_main_color(img_data, file_name, pontoon_name, cin_ctname, callback) {

    base64_decode(img_data, file_name);

    console.log("\n\r======== [get main color] - [" + file_name + "] ========");

    const ls = exec('python colors.py \"' + file_name + '\"' , function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);

            //callback();
            ///return;
        }
        else {
            //console.log('Child Process STDOUT: '+stdout);
            //console.log('Child Process STDERR: '+stderr);

            console.log("======== [get_main_color] - [" + pontoon_name + "] - [" + cin_ctname + "] ========");

            //데이터셋 이미지 결과 넣기
            var colorresult_arr = stdout.replace('[[', '').replace(']]', '').split(' ');
            conf.dataset_list[pontoon_name][dataset_index[cin_ctname]] = (parseInt(colorresult_arr[0], 10) / 255).toString();

            console.log("======== [get_main_color] - [result] - [" + conf.dataset_list[pontoon_name][dataset_index[cin_ctname]] + "] ========\n\r");

            im_flag += (2 ^ (dataset_index[cin_ctname] - 41) - 1);

            //callback();
        }
    });

    ls.on('exit', function (code) {
        console.log('Child process exited with exit code '+code);

        callback();
    });
}

function send_dataset(pontoon_name, parent, con) {
    sh_adn.crtci(parent, 0, con, function (status) {
        console.log('x-m2m-rsc : ' + status + ' <----');

        conf.dataset_list[pontoon_name] = [];
        for(var tt = 0; tt < 50; tt++) {
            conf.dataset_list[pontoon_name].push('0');
        }
    });
}

var g_color_index = ['red-edge', 'near-ir', 'red', 'green', 'blue'];

function start_check_camera_images(pontoon_name, index, ref_ct) {
    check_camera_images(pontoon_name, index, ref_ct, function (code) {
        if(code === 200) {
            build_dataset(pontoon_name);
        }
    });
}


function check_camera_images(pontoon_name, index, ref_ct, callback) {
    if (index >= g_color_index.length) {
        callback(200);
        return;
    }

    if (sh_state == 'crtci') {
        var cur_day = moment().format("YYYYMMDD-");
        var cur_month = moment().format("YYYYMM-");
        var target_url = '/' + conf.cse.name + '/' + conf.ae.name + '/' + pontoon_name + '/camera/' + g_color_index[index] + '/' + cur_month + g_color_index[index] + '/' + cur_day + g_color_index[index];
        sh_adn.rtvct(target_url+'/la', 0, function (rsc, res_body, count) {
            if(rsc == 2000) {
                var img_info = res_body[Object.keys(res_body)[0]].con;

                var cin_ctname = g_color_index[index];
                var img_ct = img_info.ct;
                var img_im = img_info.im;

                console.log('ref_ct: ' + ref_ct + '        img_ct: ' + img_ct);

                if(ref_ct < img_ct) {
                    var file_ct = img_ct.split(' ')[1];
                    file_ct = file_ct.replace(/:/g, '-');
                    var file_name = './' + pontoon_name + '_' + file_ct + '_' + camera_abbr[cin_ctname] + '.tiff';
                    get_main_color(img_im, file_name, pontoon_name, cin_ctname, function () {
                        check_camera_images(pontoon_name, ++index, ref_ct, function (code) {
                            callback(code);
                        });
                    });
                }
                else {
                    callback(200);
                }
            }
            else {
                callback(200);
            }
        });
    }
    else {
        callback(200);
    }
}
