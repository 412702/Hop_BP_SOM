/**
 * Author: Zhang Chunli
 * From: Dalian University of Technology
 * Data: 2022-03-31
 * Encoding: uft-8
*/
var fcnn;
var bpnn = null;
var bp_label_dict = null;
var som_dataset = null;
(() => {
    // $('#hopefield-info-dialog').hide();

    fcnn = FCNN('#bp-graph-container');
    initPageEvent();

    // 初始化散点图
    initScatterChart([{x:0, y:0}], 300);
})();

function initPageEvent(){
    let row_content = $('.row-content');
    let menu_list = $('#menu-link li');

    /* 整体部分 */
    // 所有内容设为隐藏状态
    row_content.hide();

    $(row_content[0]).show();
    menu_list[0].className = 'active';

    // 对侧边栏进行监听
    menu_list.click(function(){
        row_content.hide();
        $(row_content[$(this).index()]).show();

        // 对侧边栏状态调整
        menu_list.attr('class', '');
        this.className = 'active';
    });

    /* Hopefield 部分 */
    // 点击查看hopefield 网络信息
    $('#Hopefield-info-tab').click(() => {
        showDialog(Hopefield_tips);
        // $('#tips-info-dialog').show();
    });

    /* BP 部分 */
    // 点击查看BP神经网络信息
    $('#bp-info-tab').on('click', ()=>{
        showDialog(bp_tips);
    });

    $("#som-info-tab").on('click', ()=>{
        showDialog(som_tips);
    })

    // 弹窗确认按钮事件，隐藏tips对话框
    $('#tips-info-dialog-confirm').click(() => {
        $('#tips-info-dialog').hide();
    });

    // 绘制神经网络, 
    setTimeout(() => {
        // console.log("draw end");
        redrawBPGraph([4,7,3]);
    }, 100);

    // BP将预设数据填充到textarea中，包括测试集和训练集
    $("#train_data_input_manual").val(JSON.stringify(bp_train_data_preview));
    $("#test_data_input_manual").val(JSON.stringify(bp_test_data_preview));

    // BP加载预定义数据集
    $("#bp_load_dataset").on('click', ()=>{
        $("#train_data_input_manual").val(JSON.stringify(bp_train_data));
        $("#test_data_input_manual").val(JSON.stringify(bp_test_data));

        // 同时更改输入层神经元和输出层神经元个数为输入数据
        $("#num_input_layer").val(bp_train_data.input[0].length);
        $("#num_output_layer").val(Array.from(new Set(bp_train_data.output)).length)
    });
    
    // 点击开始训练，开始训练BP 模型
    $("#bp_train_model").on('click', () => {
        BPModelStart();
    });

    // 点击开始测试，使用测试集测试数据精度, 这个按钮一般不太用应该
    $("#bp_test_model").on('click', ()=>{
        // 
    })

    // SOM加载预设数据
    $("#dropdown-som-iris").on('click', ()=>{
        som_dataset = iris_data_normalized;
        initScatterChart(som_dataset, 100);
    })
    $("#dropdown-som-150-random").on('click', ()=>{
        som_dataset = getRandomPoint(150);
        initScatterChart(som_dataset, 100);
    })
    $("#dropdown-som-300-random").on('click', ()=>{
        som_dataset = getRandomPoint(300);
        initScatterChart(som_dataset, 100);
    })
    $("#dropdown-som-3000-random").on('click', ()=>{
        som_dataset = getRandomPoint(3000);
        initScatterChart(som_dataset, 100);
    })
}

function initScatterChart(dataSet, sleep){
    var color = Chart.helpers.color;
	var scatterChartData = {
		datasets: [{
			borderColor: window.chartColors.red,
			backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
			label: '散点',
			// data: iris_data_normalized
			data: dataSet
		}]
	};

    // 清空画布
    $("#scatter_canvas").remove();
    $("#scatter_canvas_container").append('<canvas id="scatter_canvas"></canvas>')
    /* 延迟一小会儿 */
	setTimeout(function() {
		var ctx = document.getElementById('scatter_canvas').getContext('2d');
		window.myScatter = Chart.Scatter(ctx, {
			data: scatterChartData,
			options: {
				title: {
					display: false,
					// text: 'Chart.js Scatter Chart - Logarithmic X-Axis'
					text: '鸢尾花数据标准化散点图'
				},
				scales: {
					xAxes: [{
						// type: 'logarithmic',
						type: 'linear',
						position: 'bottom',
						ticks: {
							userCallback: function(tick) {
								// var remain = tick / (Math.pow(10, Math.floor(Chart.helpers.log10(tick))));
								// if (remain === 1 || remain === 2 || remain === 5) {
								// 	return tick.toString() + 'Hz';
								// }
								return tick.toString();
							},
						},
						scaleLabel: {
							labelString: '',
							display: false,
						}
					}],
					yAxes: [{
						// type: 'logarithmic',
						type: 'linear',
						ticks: {
							userCallback: function(tick) {
								// return tick.toString() + 'dB';
								return tick.toString();
							}
						},
						scaleLabel: {
							labelString: '',
							display: false
						}
					}]
				}
			}
		});
	}, sleep);
}
/* 开始BP */
function BPModelStart(){
    // 先获取参数
    let train_data = JSON.parse($("#train_data_input_manual").val());
    let test_data = JSON.parse($("#test_data_input_manual").val());
    

    // 同时更改输入层神经元和输出层神经元个数为输入数据
    $("#num_input_layer").val(train_data.input[0].length);
    $("#num_output_layer").val(Array.from(new Set(train_data.output)).length)

    let input_num = parseInt($("#num_input_layer").val());
    let hidden_num = parseInt($("#num_hidden_layer").val());
    let output_num = parseInt($("#num_output_layer").val());
    let learning_rate = parseFloat($("#learn_rate").val());
    let max_epoch = parseFloat($("#num_epoch").val());
    let mse_threshold = parseFloat($("#mse_threshold").val());

    // 绘图区显示
    $("#bp_model_visual").show();
    let data_struct = [];
    for(let i=0; i < max_epoch; i++){
        data_struct.push([i, 1]);
    }
    drawLineChart('mse_line_chart', {"MSE": data_struct})
    setTimeout(() => {// 网络图
        console.log("模型训练开始");
        if(input_num>7 || hidden_num > 10 || output_num >7){
            redrawBPGraph([input_num, hidden_num, output_num], true)
        }else{
            redrawBPGraph([input_num, hidden_num, output_num])
        }

        // 格式化数据
        train_data_mat = formulatDataset(train_data);
        test_data_mat = formulatDataset(test_data);

        
        bpnn = new BPNN(input_num, hidden_num, output_num);
        bpnn.learnNN(train_data_mat, test_data_mat, max_epoch, learning_rate, mse_threshold, 
            function(nnObj, epoch, mse_list, mse){
                // 在这里可以绘制MSE变化曲线
                data_struct = [];
                /* setTimeout(()=>{
                    let current_progress = Math.ceil(100* epoch/max_epoch);
                    $("#progress-bp-train")
                    .css("width", current_progress + "%")
                    .attr("aria-valuenow", current_progress)
                    .text(current_progress + "% Complete");
                }, epoch); */

                if(epoch % 500 == 0) {
                    console.log(`${epoch} => ${mse}`);
                    mse_list.forEach((item, index, arr) => data_struct.push([index, item]));
                    drawLineChart('mse_line_chart', {"MSE": data_struct})
                }
                
                // 
            },
            function(input_data, output_activations){
                // 
        });
        
        // 网络训练完毕展示结果
        BPVisualization();
    }, 200);
}


// 绘制线图
function drawLineChart(dom_id, input_data) {

    let colors = [
        ['#FF0000', '#3C8DBC', '#00C0EF', '#008000', '#FFC0CB', '#800080'],
        ['#FFB6C1', '#FF00FF', '#9370DB', '#00BFFF', '#00FF7F', '#228B22'],
        ['#808000', '#FFA500', '#FF4500', '#CD5C5C', '#00FF00', '#008B8B'],
    ]

    let line_data = []
    let i = 0
    for (let key in input_data) {
        line_data.push({
            label: key,
            data: input_data[key],
            color: colors[randint(0, 3)][randint(0, 6)]
        })
    }
    $.plot(`#${dom_id}`, line_data, {
        // $.plot(dom_id, [line_data1, line_data2], {
        grid: {
            hoverable: true,
            borderColor: '#f3f3f3',
            borderWidth: 1,
            tickColor: '#f3f3f3'
        },
        series: {
            shadowSize: 0,
            lines: {
                show: true
            },
            points: {
                show: false
            }
        },
        lines: {
            fill: false,
            color: ['#3c8dbc', '#f56954']
        },
        yaxis: {
            show: true
        },
        xaxis: {
            show: true
        }
    })
    //Initialize tooltip on hover
    $(`<div class="tooltip-inner" id="${dom_id}-tooltip"></div`).css({
        position: 'absolute',
        display: 'none',
        opacity: 0.8
    }).appendTo('body')
    $(`#${dom_id}`).bind('plothover', function (event, pos, item) {

        if (item) {
            var x = item.datapoint[0],
                y = item.datapoint[1]

            // $('#line-chart-tooltip').html(item.series.label + ' of ' + x + ' = ' + y)
            $(`#${dom_id}-tooltip`).html(`${item.series.label}  ${x} :${y}`)
                .css({ top: item.pageY + 5, left: item.pageX + 5 })
                .fadeIn(200)
        } else {
            $(`#${dom_id}-tooltip`).hide()
        }
    })
}

/* BP 可视化 */
function BPVisualization(){
    
    // 模型结果
    $("#train_end_epoch").val(bpnn.epcoh_times);
    $("#train_mse").val(bpnn.learning_loss);
    $("#train_set_currency").val(bpnn.accuracy_train);
    $("#test_set_currency").val(bpnn.accuracy_test);

    // 权重表格
    showWeightTable();
}

/* 将权重填入表格 */
function showWeightTable(){
    // 
    input_table_header = `<thead><tr><th></th><th colspan="${bpnn.input_num}" class="horizon_index">输入层</th></tr></thead>`;
    output_table_header = `<thead><tr><th></th><th colspan="${bpnn.output_num}" class="horizon_index">输出层</th></tr></thead>`;

    hidden_column_index = `<td class="vertical_index" rowspan="${bpnn.hidden_num}">隐藏层</td>`;

    table_input_hidden_dom = input_table_header + "<tbody>";
    table_hidden_output_dom = output_table_header + "<tbody>";

    for (let i = 0; i < bpnn.weight_inputToHidden[0].length; i++) {
        table_input_hidden_dom += "<tr>"
        if(i==0){
            table_input_hidden_dom += hidden_column_index;
        }
        for (let j = 0; j < bpnn.weight_inputToHidden.length; j++){
            table_input_hidden_dom += `<td>${bpnn.weight_inputToHidden[j][i]}</td>`;
        }
        table_input_hidden_dom += "</tr>";
    }
    table_input_hidden_dom += "</tbody>";

    for (let i = 0; i < bpnn.weight_hiddenToOutput.length; i++) {
        table_hidden_output_dom += "<tr>"
        if(i==0){
            table_hidden_output_dom += hidden_column_index;
        }
        for (let j = 0; j < bpnn.weight_hiddenToOutput[0].length; j++){
            table_hidden_output_dom += `<td>${bpnn.weight_hiddenToOutput[i][j]}</td>`;
        }
    }
    table_hidden_output_dom += "</tbody>";

    $("#input_hidden_weight").html(table_input_hidden_dom);
    $("#hidden_output_weight").html(table_hidden_output_dom);
}

/* 输入数据格式化 用于BP训练的矩阵*/
function formulatDataset(struct_data){
    // 先对输出数据把标签转为one-hot编码
    let [label_dit, onehot_list] = getOneHotEncode(struct_data.output);
    let data_matrix = new Array(struct_data.input.length);
    if(onehot_list.length != data_matrix.length){
        window.alert("输入输出长度不一致");
        throw new Error("The length is no paired");
    }

    for (let i = 0; i < data_matrix.length; i++) {
        data_matrix[i] = struct_data.input[i].concat(onehot_list[i])
    }
    bp_label_dict = label_dit;
    return data_matrix;
}

/* 根据标签列表生成onehot编码列表 */
function getOneHotEncode(label_list){
    // 对标签去重,并返回每个标签对应的one-hot编码
    let label_key = Array.from(new Set(label_list));
    // console.log(label_key);
    let label_dict = {};
    for (let i = 0; i < label_key.length; i++) {
         let one_hot = new Array(label_key.length);
         for (let j = 0; j < one_hot.length; j++) {
             if(j == i){
                 one_hot[j] = 1;
             }else{
                 one_hot[j] = 0;
             }
         }
         label_dict[label_key[i]] = one_hot;
    }

    // 生成label_list 对应和的onehot list
    let one_hot_list = new Array(label_list.length)
    for (let i = 0; i < label_list.length; i++) {
        one_hot_list[i] = label_dict[label_list[i]];
    }

    return [label_dict, one_hot_list];
}

/* 显示弹窗， 并给内容 */
function showDialog(tips, auto_close){

    let tips_dialog = $('#tips-info-dialog');
    // 如果自动关闭则1s后自动关闭弹窗
    if(auto_close){
        $('#tips-info-dialog-confirm').hide();
        setTimeout(() => {
            tips_dialog.hide();
            $('#tips-info-dialog-confirm').show();
        }, 1000);
    }
    tips_dialog.find('.tips-word-msg-box').html(tips);
    tips_dialog.show();
}

/* 绘制神经网络图像 */
function redrawBPGraph(node_list, large){

    // 这里node_list 必是三元组，因为只绘制三层神经网络
    if(large){
        // 就认为当三层分别大与7， 10， 7 的时候认为是比较大
        fcnn.redraw({ 'architecture_': node_list });
        fcnn.redistribute({
            'betweenNodesInLayer_': [10, 13, 10],
            'betweenLayers_': 160,
            'nnDirection_': 'up'
        });
        // 100ms 后移动到指定位置
        setTimeout(() => {
            document.querySelector('svg g').setAttribute("transform", "translate(-414.4129153352533,-147.5187438307011) scale(0.6597539553864471)");
        }, 10);
        
    }else{
        fcnn.redraw({ 'architecture_': node_list });
        fcnn.redistribute({
            'betweenNodesInLayer_': [15, 10, 15],
            'betweenLayers_': 150,
            'nnDirection_': 'right'
        });
        // 100ms 后移动到指定位置
        setTimeout(() => {
            document.querySelector('svg g').setAttribute("transform", "translate(-884.1811136540321,-379.998736835105) scale(1.1486983549970353)");
        }, 10);
    }
    
}

/* 生成随机数列表 */
function getRandomPoint(num){
    let res = [];
    for (let i = 0; i < num; i++) {
        res.push({
            x:Math.random(),
            y:Math.random()
        });
    }
    return res;
}