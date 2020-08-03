/**
 * Created by Il Yeup, Ahn in KETI on 2017-02-23.
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

var ip = require("ip");
var moment = require("moment");


var conf = {};
var cse = {};
var ae = {};
var cnt_arr = [];
var sub_arr = [];
var acp = {};

conf.useprotocol = 'http'; // select one for 'http' or 'mqtt' or 'coap' or 'ws'




conf.sim = 'disable'; // enable / disable





// build cse
cse.host        = '203.253.128.161'; //'59.10.2.16';
cse.port        = '7579';
cse.name        = 'Mobius';
cse.id          = '/Mobius2';
cse.mqttport    = '1883';

// build ae
ae.name         = 'iot_algae';

ae.id           = 'SQTG88u3WBV'; //'S'+ae.name;

ae.parent       = '/' + cse.name;
ae.appid        = 'green_ipe';
ae.bodytype     = 'json'; // select 'json' or 'xml' or 'cbor'

// build cnt
var count = 0;

//컨테이너명 추가 및 바꾸기
//data > YYYYMM-data > YYYYMMDD-data
//camera > green > YYYYMM-green > YYYYMMDD-green

global.build_cnt_dynamic = function(callback) {
    conf.day_cnt = moment().format("YYYYMMDD");
    conf.month_cnt = moment().format("YYYYMM");
    conf.next_day_cnt = moment().add(1, 'days').format("YYYYMMDD");
    conf.next_month_cnt = moment().add(1, 'days').format("YYYYMM");

    conf.dataset_m_cnt = conf.month_cnt + '-dataset';
    conf.analysis_m_cnt = conf.month_cnt + '-analysis';

    conf.data_m_cnt = conf.month_cnt + '-data';
    conf.data_d_cnt = conf.day_cnt + '-data';

    conf.red_m_cnt = conf.month_cnt + '-red';
    conf.red_d_cnt = conf.day_cnt + '-red';
    conf['near-ir_m_cnt'] = conf.month_cnt + '-near-ir';
    conf['near-ir_d_cnt'] = conf.day_cnt + '-near-ir';
    conf['blue_m_cnt'] = conf.month_cnt + '-blue';
    conf['blue_d_cnt'] = conf.day_cnt + '-blue';
    conf['green_m_cnt'] = conf.month_cnt + '-green';
    conf['green_d_cnt'] = conf.day_cnt + '-green';
    conf['red-edge_m_cnt'] = conf.month_cnt + '-red-edge';
    conf['red-edge_d_cnt'] = conf.day_cnt + '-red-edge';


    conf.next_data_m_cnt = conf.next_month_cnt + '-data';
    conf.next_data_d_cnt = conf.next_day_cnt + '-data';

    conf.next_red_m_cnt = conf.next_month_cnt + '-red';
    conf.next_red_d_cnt = conf.next_day_cnt + '-red';
    conf['next_near-ir_m_cnt'] = conf.next_month_cnt + '-near-ir';
    conf['next_near-ir_d_cnt'] = conf.next_day_cnt + '-near-ir';
    conf['next_blue_m_cnt'] = conf.next_month_cnt + '-blue';
    conf['next_blue_d_cnt'] = conf.next_day_cnt + '-blue';
    conf['next_green_m_cnt'] = conf.next_month_cnt + '-green';
    conf['next_green_d_cnt'] = conf.next_day_cnt + '-green';
    conf['next_red-edge_m_cnt'] = conf.next_month_cnt + '-red-edge';
    conf['next_red-edge_d_cnt'] = conf.next_day_cnt + '-red-edge';

    for(var l in pontoon_list) {
        if(pontoon_list.hasOwnProperty(l)) {
            build_resource_for_pontoon(pontoon_list[l]);
        }
    }

    callback();
};


var pontoon_list = ['pontoon_titania', 'pontoon_mimas'];
var dataset_list_idx = {};

var cnt_count = 0;
var sub_count = 0;

// var cin = {};
// cin.con = {};
// cin.con['DAT00'] = '20200710200000';
// var ref_ct = moment(cin.con['DAT00'],'YYYYMMDDHHmmss').subtract(10, 'minutes').format('YYYY-MM-DD HH:mm:ss');

conf.use_subscription = 'enable';
var sub_resource_name = 'ryeubi_sub';
conf.aei_for_sub = require('shortid').generate();

function build_resource_for_pontoon(pontoon_name) {

    // count -> 0  : arr[0]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = '/' + cse.name + '/' + ae.name;
    cnt_arr[cnt_count].name = pontoon_name;
    var root_idx = cnt_count++;

// count -> 1-1  : arr[1]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[root_idx].name;
    cnt_arr[cnt_count].name = 'analysis';
    var analysis_idx = cnt_count++;

// count -> 1-2  : arr[2]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[root_idx].name;
    cnt_arr[cnt_count].name = 'camera';
    var camera_idx = cnt_count++;

// count -> 2-1  : arr[3]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[root_idx].name + '/' + cnt_arr[camera_idx].name;
    cnt_arr[cnt_count].name = 'near-ir';
    var near_ir_idx = cnt_count++;

// count -> 2-2  : arr[4]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[root_idx].name + '/' + cnt_arr[camera_idx].name;
    cnt_arr[cnt_count].name = 'red-edge';
    var red_edge_idx = cnt_count++;

// count -> 2-3 : arr[5]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[root_idx].name + '/' + cnt_arr[camera_idx].name;
    cnt_arr[cnt_count].name = 'blue';
    var blue_idx = cnt_count++;

// count -> 2-4 : arr[6]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[root_idx].name + '/' + cnt_arr[camera_idx].name;
    cnt_arr[cnt_count].name = 'green';
    var green_idx = cnt_count++;

// count -> 2-5 : arr[7]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[root_idx].name + '/' + cnt_arr[camera_idx].name;
    cnt_arr[cnt_count].name = 'red';
    var red_idx = cnt_count++;

// count -> 1-3 : arr[8]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[root_idx].name;
    cnt_arr[cnt_count++].name = 'control';

// count -> 1-4 : arr[9]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[root_idx].name;
    cnt_arr[cnt_count].name = 'data';
    var data_idx = cnt_count++;

// count -> 1-5 : arr[10]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = '/' + cse.name + '/' + ae.name + '/' + cnt_arr[root_idx].name;
    cnt_arr[cnt_count].name = 'dataset';
    var dataset_idx = cnt_count++;

//data
// count -> 1-4 : arr[11]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[data_idx].parent + '/' + cnt_arr[data_idx].name;
    cnt_arr[cnt_count].name = conf.data_m_cnt;
    var data_m_cnt_idx = cnt_count++;

// count -> 1-4 : arr[12]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[data_m_cnt_idx].parent + '/' + cnt_arr[data_m_cnt_idx].name;
    cnt_arr[cnt_count].name = conf.data_d_cnt;
    var data_d_cnt_idx = cnt_count++;

//red (7)
// count -> 1-4 : arr[13]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[red_idx].parent + '/' + cnt_arr[red_idx].name;
    cnt_arr[cnt_count].name = conf.red_m_cnt;
    var red_m_cnt_idx = cnt_count++;

// count -> 1-4 : arr[14]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[red_m_cnt_idx].parent + '/' + cnt_arr[red_m_cnt_idx].name;
    cnt_arr[cnt_count].name = conf.red_d_cnt;
    var red_d_cnt_idx = cnt_count++;

//near-ir(3)
// count -> 1-4 : arr[15]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[near_ir_idx].parent + '/' + cnt_arr[near_ir_idx].name;
    cnt_arr[cnt_count].name = conf['near-ir_m_cnt'];
    var near_ir_m_cnt_idx = cnt_count++;

// count -> 1-4 : arr[16]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[near_ir_m_cnt_idx].parent + '/' + cnt_arr[near_ir_m_cnt_idx].name;
    cnt_arr[cnt_count].name = conf['near-ir_d_cnt'];
    var near_ir_d_cnt_idx = cnt_count++;

//blue(5)
// count -> 1-4 : arr[17]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[blue_idx].parent + '/' + cnt_arr[blue_idx].name;
    cnt_arr[cnt_count].name = conf.blue_m_cnt;
    var blue_m_cnt_idx = cnt_count++;

// count -> 1-4 : arr[18]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[blue_m_cnt_idx].parent + '/' + cnt_arr[blue_m_cnt_idx].name;
    cnt_arr[cnt_count].name = conf.blue_d_cnt;
    var blue_d_cnt_idx = cnt_count++;

//green(6)
// count -> 1-4 : arr[19]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[green_idx].parent + '/' + cnt_arr[green_idx].name;
    cnt_arr[cnt_count].name = conf.green_m_cnt;
    var green_m_cnt_idx = cnt_count++;

// count -> 1-4 : arr[20]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[green_m_cnt_idx].parent + '/' + cnt_arr[green_m_cnt_idx].name;
    cnt_arr[cnt_count].name = conf.green_d_cnt;
    var green_d_cnt_idx = cnt_count++;

//red-edge(4)
// count -> 1-4 : arr[21]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[red_edge_idx].parent + '/' + cnt_arr[red_edge_idx].name;
    cnt_arr[cnt_count].name = conf['red-edge_m_cnt'];
    var red_edge_m_cnt_idx = cnt_count++;

// count -> 1-4 : arr[22]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[red_edge_m_cnt_idx].parent + '/' + cnt_arr[red_edge_m_cnt_idx].name;
    cnt_arr[cnt_count].name = conf['red-edge_d_cnt'];
    var red_edge_d_cnt_idx = cnt_count++;


//data
// count -> 1-4 : arr[23]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[data_idx].parent + '/' + cnt_arr[data_idx].name;
    cnt_arr[cnt_count++].name = conf.next_data_m_cnt;

// count -> 1-4 : arr[24]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[data_m_cnt_idx].parent + '/' + cnt_arr[data_m_cnt_idx].name;
    cnt_arr[cnt_count].name = conf.next_data_d_cnt;
    var next_data_d_cnt_idx = cnt_count++;

//red (7)
// count -> 1-4 : arr[25]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[red_idx].parent + '/' + cnt_arr[red_idx].name;
    cnt_arr[cnt_count++].name = conf.next_red_m_cnt;

// count -> 1-4 : arr[26]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[red_m_cnt_idx].parent + '/' + cnt_arr[red_m_cnt_idx].name;
    cnt_arr[cnt_count].name = conf.next_red_d_cnt;
    var next_red_d_cnt_idx = cnt_count++;

//near-ir(3)
// count -> 1-4 : arr[27]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[near_ir_idx].parent + '/' + cnt_arr[near_ir_idx].name;
    cnt_arr[cnt_count++].name = conf['next_near-ir_m_cnt'];

// count -> 1-4 : arr[28]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[near_ir_m_cnt_idx].parent + '/' + cnt_arr[near_ir_m_cnt_idx].name;
    cnt_arr[cnt_count].name = conf['next_near-ir_d_cnt'];
    var next_near_ir_d_cnt_idx = cnt_count++;

//blue(5)
// count -> 1-4 : arr[29]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[blue_idx].parent + '/' + cnt_arr[blue_idx].name;
    cnt_arr[cnt_count++].name = conf.next_blue_m_cnt;

// count -> 1-4 : arr[30]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[blue_m_cnt_idx].parent + '/' + cnt_arr[blue_m_cnt_idx].name;
    cnt_arr[cnt_count].name = conf.next_blue_d_cnt;
    var next_blue_d_cnt_idx = cnt_count++;

//green(6)
// count -> 1-4 : arr[31]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[green_idx].parent + '/' + cnt_arr[green_idx].name;
    cnt_arr[cnt_count++].name = conf.next_green_m_cnt;

// count -> 1-4 : arr[32]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[green_m_cnt_idx].parent + '/' + cnt_arr[green_m_cnt_idx].name;
    cnt_arr[cnt_count].name = conf.next_green_d_cnt;
    var next_green_d_cnt_idx = cnt_count++;

//red-edge(4)
// count -> 1-4 : arr[33]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[red_edge_idx].parent + '/' + cnt_arr[red_edge_idx].name;
    cnt_arr[cnt_count++].name = conf['next_red-edge_m_cnt'];

// count -> 1-4 : arr[34]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[red_edge_m_cnt_idx].parent + '/' + cnt_arr[red_edge_m_cnt_idx].name;
    cnt_arr[cnt_count].name = conf['next_red-edge_d_cnt'];
    var next_red_edge_d_cnt_idx = cnt_count++;

// count -> 1-4 : arr[35]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[dataset_idx].parent + '/' + cnt_arr[dataset_idx].name;
    cnt_arr[cnt_count].name = conf['dataset_m_cnt'];
    dataset_list_idx[pontoon_name] = cnt_count++;

// count -> 1-4 : arr[36]
    cnt_arr[cnt_count] = {};
    cnt_arr[cnt_count].parent = cnt_arr[analysis_idx].parent + '/' + cnt_arr[analysis_idx].name;
    cnt_arr[cnt_count++].name = conf['analysis_m_cnt'];


    if(conf.use_subscription == 'enable') {
////////////// build sub-ctrl
//data
        sub_arr[sub_count] = {};
        sub_arr[sub_count].parent = cnt_arr[data_d_cnt_idx].parent + '/' + cnt_arr[data_d_cnt_idx].name;
        sub_arr[sub_count].name = sub_resource_name;
        sub_arr[sub_count++].nu = 'mqtt://' + cse.host + '/' + conf.aei_for_sub;

//camera
//red
//         sub_arr[sub_count] = {};
//         sub_arr[sub_count].parent = cnt_arr[red_d_cnt_idx].parent + '/' + cnt_arr[red_d_cnt_idx].name;
//         sub_arr[sub_count].name = sub_resource_name;
//         sub_arr[sub_count++].nu = 'mqtt://' + cse.host + '/' + conf.aei_for_sub;
//
// //near-ir
//         sub_arr[sub_count] = {};
//         sub_arr[sub_count].parent = cnt_arr[near_ir_d_cnt_idx].parent + '/' + cnt_arr[near_ir_d_cnt_idx].name;
//         sub_arr[sub_count].name = sub_resource_name;
//         sub_arr[sub_count++].nu = 'mqtt://' + cse.host + '/' + conf.aei_for_sub;
//
// //blue
//         sub_arr[sub_count] = {};
//         sub_arr[sub_count].parent = cnt_arr[blue_d_cnt_idx].parent + '/' + cnt_arr[blue_d_cnt_idx].name;
//         sub_arr[sub_count].name = sub_resource_name;
//         sub_arr[sub_count++].nu = 'mqtt://' + cse.host + '/' + conf.aei_for_sub;
//
// //green
//         sub_arr[sub_count] = {};
//         sub_arr[sub_count].parent = cnt_arr[green_d_cnt_idx].parent + '/' + cnt_arr[green_d_cnt_idx].name;
//         sub_arr[sub_count].name = sub_resource_name;
//         sub_arr[sub_count++].nu = 'mqtt://' + cse.host + '/' + conf.aei_for_sub;
//
// //red-edge
//         sub_arr[sub_count] = {};
//         sub_arr[sub_count].parent = cnt_arr[red_edge_d_cnt_idx].parent + '/' + cnt_arr[red_edge_d_cnt_idx].name;
//         sub_arr[sub_count].name = sub_resource_name;
//         sub_arr[sub_count++].nu = 'mqtt://' + cse.host + '/' + conf.aei_for_sub;

////////////// build next sub-ctrl
//data
        sub_arr[sub_count] = {};
        sub_arr[sub_count].parent = cnt_arr[next_data_d_cnt_idx].parent + '/' + cnt_arr[next_data_d_cnt_idx].name;
        sub_arr[sub_count].name = sub_resource_name;
        sub_arr[sub_count++].nu = 'mqtt://' + cse.host + '/' + conf.aei_for_sub;

//camera
//red
//         sub_arr[sub_count] = {};
//         sub_arr[sub_count].parent = cnt_arr[next_red_d_cnt_idx].parent + '/' + cnt_arr[next_red_d_cnt_idx].name;
//         sub_arr[sub_count].name = sub_resource_name;
//         sub_arr[sub_count++].nu = 'mqtt://' + cse.host + '/' + conf.aei_for_sub;
//
// //near-ir
//         sub_arr[sub_count] = {};
//         sub_arr[sub_count].parent = cnt_arr[next_near_ir_d_cnt_idx].parent + '/' + cnt_arr[next_near_ir_d_cnt_idx].name;
//         sub_arr[sub_count].name = sub_resource_name;
//         sub_arr[sub_count++].nu = 'mqtt://' + cse.host + '/' + conf.aei_for_sub;
//
// //blue
//         sub_arr[sub_count] = {};
//         sub_arr[sub_count].parent = cnt_arr[next_blue_d_cnt_idx].parent + '/' + cnt_arr[next_blue_d_cnt_idx].name;
//         sub_arr[sub_count].name = sub_resource_name;
//         sub_arr[sub_count++].nu = 'mqtt://' + cse.host + '/' + conf.aei_for_sub;
//
// //green
//         sub_arr[sub_count] = {};
//         sub_arr[sub_count].parent = cnt_arr[next_green_d_cnt_idx].parent + '/' + cnt_arr[next_green_d_cnt_idx].name;
//         sub_arr[sub_count].name = sub_resource_name;
//         sub_arr[sub_count++].nu = 'mqtt://' + cse.host + '/' + conf.aei_for_sub;
//
// //red-edge
//         sub_arr[sub_count] = {};
//         sub_arr[sub_count].parent = cnt_arr[next_red_edge_d_cnt_idx].parent + '/' + cnt_arr[next_red_edge_d_cnt_idx].name;
//         sub_arr[sub_count].name = sub_resource_name;
//         sub_arr[sub_count++].nu = 'mqtt://' + cse.host + '/' + conf.aei_for_sub;
    }
}

build_cnt_dynamic(function () {
    console.log('======== day_cont: ' + conf.day_cnt);
    console.log('======== next_day_cont: ' + conf.next_day_cnt);
});


var dataset_list = {};
for(var l in pontoon_list) {
    if(pontoon_list.hasOwnProperty(l)) {
        dataset_list[pontoon_list[l]] = [];
        for(var tt = 0; tt < 50; tt++) {
            dataset_list[pontoon_list[l]].push('0');
        }
    }
}

// build acp: not complete
acp.parent = '/' + cse.name + '/' + ae.name;
acp.name = 'acp-' + ae.name;
acp.id = ae.id;


conf.usesecure  = 'disable';

if(conf.usesecure === 'enable') {
    cse.mqttport = '8883';
}

conf.cse = cse;
conf.ae = ae;
conf.cnt = cnt_arr;
conf.sub = sub_arr;
conf.acp = acp;
conf.pontoon_list = pontoon_list;
conf.dataset_list_idx = dataset_list_idx;
conf.dataset_list = dataset_list;

module.exports = conf;
