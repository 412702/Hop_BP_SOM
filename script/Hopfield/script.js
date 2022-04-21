
let dim = 15;
let num_pattern = 1;
let canvas_width = 300

let weight = [];

let pattern_d = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1,-1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1,-1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1,-1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1,-1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1,-1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1,-1, -1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1,-1, -1, -1, 1, 1, 1, -1, -1, -1, 1, 1, 1, -1, -1, -1,-1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1,-1, -1, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

let pattern_u = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1,-1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1,-1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1,-1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1,-1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1,-1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
let pattern_t = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1,-1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1,-1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1,-1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

let pattern_1949 = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1,-1, 1, -1, -1, -1, -1, 1, -1, 1, 1, 1, 1, 1, -1, -1,1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, 1, 1, -1, -1,1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1,-1, -1, -1, -1, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, 1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, 1, -1, -1, 1,1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, -1, -1, 1,1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, -1, -1, 1,1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

let input_draw_1_state_2d = []
let input_draw_2_state_2d = []
let input_draw_3_state_2d = []
let input_draw_res_state_2d = []
let input_tensor = []


function reinit_input_draw_state_2d() {
    for (let it = 0; it < dim; ++it) {
        let row = []
        for (let itr = 0; itr < dim; ++itr) {
            row.push(-1.0)
        }
        input_draw_1_state_2d.push(row)
        input_draw_2_state_2d.push(row)
        input_draw_3_state_2d.push(row)
        input_draw_res_state_2d.push(row)
    }
}



function calc_weight(_i, _j, _input_tensor, _num_unit) {
    let sum_pattern = 0.0
    for (let l = 0; l < _input_tensor.length; ++l) {
        sum_pattern += (_input_tensor[l][_i] * _input_tensor[l][_j])
    }
    return sum_pattern / _num_unit
}

function calc_energy_second_term(_i, _k, _input_tensor, _num_unit) {
    let sum_pattern = 0.0
    console.log(_input_tensor)
    for (let j = 0; j < _num_unit; ++j) {
        for (let l = 0; l < _input_tensor.length; ++l) {
            if (_k == l) {
                break;
            }
            console.log(_k, l)
            sum_pattern += (_input_tensor[l][_i] * _input_tensor[l][j] * _input_tensor[_k][j])

            console.log(_input_tensor[l][i])
            console.log(_input_tensor[l][j])
            console.log(_input_tensor[_k][j])
        }
    }
    // console.log(sum_pattern)
    return sum_pattern / _num_unit
}

function calc_energy(_i, _k, _input_tensor, _weight, _num_unit) {
    let sum_energy = 0.0
    for (let j = 0; j < _num_unit; ++j) {
        sum_energy += (_weight[_i][j] * _input_tensor[_k][j])
    }
    return sum_energy
}

function is_pattern_fixed(_k, _input_tensor, _weight, _num_unit) {
    for (let i = 0; i < _num_unit; ++i) {
        let energy = calc_energy(i, _k, _input_tensor, _weight, _num_unit)
        if (Math.sign(energy) != Math.sign(_input_tensor[_k][i])) {
            return false
        }
    }
    return true
}

function update_node_tensor(_k, _j, _weight, _input_tensor, _num_unit) {
    let sum_all = 0.0
    for (let i = 0; i < _num_unit; ++i) {
        sum_all += (_input_tensor[_k][i] * _weight[_j][i])
    }
    _input_tensor[_k][_j] = Math.sign(sum_all)
    return _input_tensor
}

function recalc_all_weights(_weight, _input_tensor, _num_unit) {
    let _temp_weight = _weight
    for (let j = 0; j < _num_unit; ++j) {
        for (let i = 0 + j; i < _num_unit; ++i) {
            if (i != j) {
                _temp_weight[j][i] = calc_weight(i, j, _input_tensor, _num_unit)
            }
        }
    }
    // copy to lower triangle
    for (let j = 0; j < _num_unit; ++j) {
        for (let i = 0 + j; i < _num_unit; ++i) {
            if (i != j) {
                _temp_weight[i][j] = _temp_weight[j][i]
            }
        }
    }
    // console.log(_temp_weight)
    return _temp_weight
}

function train(_dim, _input_tensor) {
    console.log(input_draw_1_state_2d)
    let _num_unit = Math.pow(_dim, 2);
    let _weight = []
    for (let nu = 0; nu < _num_unit; ++nu) {
        let row = new Float32Array(_num_unit);
        row.fill(0.0)
        _weight.push(row)
    }
    return recalc_all_weights(_weight, _input_tensor, _num_unit)
}

function process(_input_1d, _weight, _num_iteration) {
    let _num_unit = _weight.length;
    let _temp = [_input_1d];
    let a = 0;
    for (let it = 0; it < _num_iteration; ++it) {

        (function (it) {
            setTimeout(function () {
                let _input_draw_state_2d = Util.to_2d(_temp[0])
                draw_square_to_canvas(_input_draw_state_2d, canvas_res, canvas_width)
                for (let pos = 0; pos < _num_unit; ++pos) {
                    (function (pos) {
                        setTimeout(function () {
                            let node_update_num = Util.get_random_int(_num_unit)
                            _temp = update_node_tensor(0, node_update_num, _weight, _temp, _num_unit)
                        }, 100 * pos);
                    })(pos);
                }
                let current_progress = Math.ceil(101 * it / _num_iteration);
                $("#progress-predict")
                    .css("width", current_progress + "%")
                    .attr("aria-valuenow", current_progress)
                    .text(current_progress + "% Complete");
            }, 100 * it);
        })(it);
    }
    return _temp[0]
}


function draw_square_to_canvas(_input_2d, canvas, _canvas_width) {
    let ctx = canvas.getContext("2d");
    let _dim = _input_2d.length
    if (_input_2d.length % _dim != 0) {
        throw "not square";
    }

    let threshold = 0.5

    ctx.canvas.width = _canvas_width;
    ctx.canvas.height = _canvas_width;

    let y_start = 0
    let y_end = _canvas_width
    let step_size = parseInt(_canvas_width / _dim)

    for (let x = 0; x < _canvas_width; x += step_size) {

        ctx.moveTo(x, y_start);
        ctx.lineTo(x, y_end);
        ctx.stroke();
    }

    let x_start = 0
    let x_end = _canvas_width

    for (let y = 0; y < _canvas_width; y += step_size) {
        ctx.moveTo(x_start, y);
        ctx.lineTo(x_end, y);
        ctx.stroke();
    }
    for (let x = 0; x < _dim; ++x) {
        for (let y = 0; y < _dim; ++y) {
            // console.log(_input_2d[i][j])
            if (_input_2d[x][y] >= threshold) {
                // console.log(i,j)
                ctx.fillRect(x * step_size, y * step_size, step_size, step_size)
            }
        }
    }
}

function toggle_state(_input_matrix, xid, yid) {
    _input_matrix[xid][yid] *= -1.0;
    return _input_matrix
}

function refresh_progress() {
    $("#progress-predict")
        .css("width", "0%")
        .attr("aria-valuenow", 0)
        .text("0% Complete");
}
// 阻止默认操作
document.querySelectorAll('.dropdown-item').forEach((obj) => {
    $(obj).click((e) => {
        e.preventDefault();
    });
});

document.getElementById('button-train').addEventListener('click', function () {
    let input_draw_1_state_1d = Util.to_1d(input_draw_1_state_2d)
    let input_draw_2_state_1d = Util.to_1d(input_draw_2_state_2d)
    let input_draw_3_state_1d = Util.to_1d(input_draw_3_state_2d)
    input_tensor = []
    input_tensor.push(input_draw_1_state_1d)
    input_tensor.push(input_draw_2_state_1d)
    input_tensor.push(input_draw_3_state_1d)
    weight = train(dim, input_tensor)
    // 权重更新成功
    showDialog("<b>权重更新成功!</b>", true)
});

document.getElementById('button-process').addEventListener('click', function () {
    if(weight.length == 0){
        window.alert("请先训练样式！");
    }else{
        let input_draw_res_state_1d = Util.to_1d(input_draw_res_state_2d)
        console.log(weight)
        console.log(input_draw_res_state_1d)
        input_draw_res_state_1d = process(input_draw_res_state_1d, weight, 100)
        console.log(input_draw_res_state_1d)
        input_draw_res_state_2d = Util.to_2d(input_draw_res_state_1d)
        draw_square_to_canvas(input_draw_res_state_2d, canvas_res, canvas_width)
    }
});

// Canvas 1
document.getElementById('dropdown-preset-d-1').addEventListener('click', function () {
    input_draw_1_state_2d = Util.to_2d(pattern_d)
    draw_square_to_canvas(input_draw_1_state_2d, canvas_1, canvas_width)
});
document.getElementById('dropdown-preset-u-1').addEventListener('click', function () {
    input_draw_1_state_2d = Util.to_2d(pattern_u)
    draw_square_to_canvas(input_draw_1_state_2d, canvas_1, canvas_width)
});
document.getElementById('dropdown-preset-t-1').addEventListener('click', function () {
    input_draw_1_state_2d = Util.to_2d(pattern_t)
    draw_square_to_canvas(input_draw_1_state_2d, canvas_1, canvas_width)
});
document.getElementById('dropdown-preset-1949-1').addEventListener('click', function () {
    input_draw_1_state_2d = Util.to_2d(pattern_1949)
    draw_square_to_canvas(input_draw_1_state_2d, canvas_1, canvas_width)
});
document.getElementById('dropdown-preset-random-1').addEventListener('click', function () {
    let _num_unit = Math.pow(dim, 2)
    input_draw_1_state_2d = Util.to_2d(Util.generate_random_bipolar_vector(_num_unit))
    draw_square_to_canvas(input_draw_1_state_2d, canvas_1, canvas_width)
});

// Canvas 2
document.getElementById('dropdown-preset-d-2').addEventListener('click', function () {
    input_draw_2_state_2d = Util.to_2d(pattern_d)
    draw_square_to_canvas(input_draw_2_state_2d, canvas_2, canvas_width)
});
document.getElementById('dropdown-preset-u-2').addEventListener('click', function () {
    input_draw_2_state_2d = Util.to_2d(pattern_u)
    draw_square_to_canvas(input_draw_2_state_2d, canvas_2, canvas_width)
});
document.getElementById('dropdown-preset-t-2').addEventListener('click', function () {
    input_draw_2_state_2d = Util.to_2d(pattern_t)
    draw_square_to_canvas(input_draw_2_state_2d, canvas_2, canvas_width)
});
document.getElementById('dropdown-preset-1949-2').addEventListener('click', function () {
    input_draw_2_state_2d = Util.to_2d(pattern_1949)
    draw_square_to_canvas(input_draw_2_state_2d, canvas_2, canvas_width)
});
document.getElementById('dropdown-preset-random-2').addEventListener('click', function () {
    let _num_unit = Math.pow(dim, 2)
    input_draw_2_state_2d = Util.to_2d(Util.generate_random_bipolar_vector(_num_unit))
    draw_square_to_canvas(input_draw_2_state_2d, canvas_2, canvas_width)
});

// Canvas 3
document.getElementById('dropdown-preset-d-3').addEventListener('click', function () {
    input_draw_3_state_2d = Util.to_2d(pattern_d)
    draw_square_to_canvas(input_draw_3_state_2d, canvas_3, canvas_width)
});
document.getElementById('dropdown-preset-u-3').addEventListener('click', function () {
    input_draw_3_state_2d = Util.to_2d(pattern_u)
    draw_square_to_canvas(input_draw_3_state_2d, canvas_3, canvas_width)
});
document.getElementById('dropdown-preset-t-3').addEventListener('click', function () {
    input_draw_3_state_2d = Util.to_2d(pattern_t)
    draw_square_to_canvas(input_draw_3_state_2d, canvas_3, canvas_width)
});
document.getElementById('dropdown-preset-1949-3').addEventListener('click', function () {
    input_draw_3_state_2d = Util.to_2d(pattern_1949)
    draw_square_to_canvas(input_draw_3_state_2d, canvas_3, canvas_width)
});
document.getElementById('dropdown-preset-random-3').addEventListener('click', function () {
    let _num_unit = Math.pow(dim, 2)
    input_draw_3_state_2d = Util.to_2d(Util.generate_random_bipolar_vector(_num_unit))
    draw_square_to_canvas(input_draw_3_state_2d, canvas_3, canvas_width)
});

// Canvas Res
document.getElementById('dropdown-preset-d-noise').addEventListener('click', function () {
    refresh_progress()
    input_draw_res_state_2d = Util.to_2d(Util.add_noise_to_vector(pattern_d, 0.5))
    draw_square_to_canvas(input_draw_res_state_2d, canvas_res, canvas_width)
});
document.getElementById('dropdown-preset-u-noise').addEventListener('click', function () {
    refresh_progress()
    input_draw_res_state_2d = Util.to_2d(Util.add_noise_to_vector(pattern_u, 0.5))
    draw_square_to_canvas(input_draw_res_state_2d, canvas_res, canvas_width)
});
document.getElementById('dropdown-preset-t-noise').addEventListener('click', function () {
    refresh_progress()
    input_draw_res_state_2d = Util.to_2d(Util.add_noise_to_vector(pattern_t, 0.5))
    draw_square_to_canvas(input_draw_res_state_2d, canvas_res, canvas_width)
});
document.getElementById('dropdown-preset-1949-noise').addEventListener('click', function () {
    refresh_progress()
    input_draw_res_state_2d = Util.to_2d(Util.add_noise_to_vector(pattern_1949, 0.5))
    draw_square_to_canvas(input_draw_res_state_2d, canvas_res, canvas_width)
});


let canvas_1 = document.getElementById('canvas-1');
let canvas_2 = document.getElementById('canvas-2');
let canvas_3 = document.getElementById('canvas-3');
let canvas_res = document.getElementById('canvas-res');

canvas_1.addEventListener('click', function (event) {
    let rect = canvas_1.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let xy = Util.pixel_to_index(x, y, dim, canvas_width);
    console.log("x: " + xy[0] + " y: " + xy[1]);
    input_draw_1_state_2d = toggle_state(input_draw_1_state_2d, xy[0], xy[1])
    console.log(input_draw_1_state_2d)
    draw_square_to_canvas(input_draw_1_state_2d, canvas_1, canvas_width)
}, false);

canvas_2.addEventListener('click', function (event) {
    let rect = canvas_2.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let xy = Util.pixel_to_index(x, y, dim, canvas_width);
    console.log("x: " + xy[0] + " y: " + xy[1]);
    input_draw_2_state_2d = toggle_state(input_draw_2_state_2d, xy[0], xy[1])
    console.log(input_draw_2_state_2d)
    draw_square_to_canvas(input_draw_2_state_2d, canvas_2, canvas_width)
}, false);

canvas_3.addEventListener('click', function (event) {
    let rect = canvas_3.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let xy = Util.pixel_to_index(x, y, dim, canvas_width);
    console.log("x: " + xy[0] + " y: " + xy[1]);
    input_draw_3_state_2d = toggle_state(input_draw_3_state_2d, xy[0], xy[1])
    console.log(input_draw_3_state_2d)
    draw_square_to_canvas(input_draw_3_state_2d, canvas_3, canvas_width)
}, false);

canvas_res.addEventListener('click', function (event) {
    refresh_progress()
    let rect = canvas_res.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let xy = Util.pixel_to_index(x, y, dim, canvas_width);
    console.log("x: " + xy[0] + " y: " + xy[1]);
    input_draw_res_state_2d = toggle_state(input_draw_res_state_2d, xy[0], xy[1])
    console.log(input_draw_res_state_2d)
    draw_square_to_canvas(input_draw_res_state_2d, canvas_res, canvas_width)
}, false);

reinit_input_draw_state_2d()
draw_square_to_canvas(input_draw_1_state_2d, canvas_1, canvas_width)
draw_square_to_canvas(input_draw_2_state_2d, canvas_2, canvas_width)
draw_square_to_canvas(input_draw_3_state_2d, canvas_3, canvas_width)
draw_square_to_canvas(input_draw_res_state_2d, canvas_res, canvas_width)
