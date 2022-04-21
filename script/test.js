let s_data  = {
    "input": [
        [4.6, 3.1, 1.5, 0.2],[5.0, 3.6, 1.4, 0.2],[5.4, 3.9, 1.7, 0.4],[4.6, 3.4, 1.4, 0.3],[5.0, 3.4, 1.5, 0.2],
        [7.0, 3.2, 4.7, 1.4],[6.4, 3.2, 4.5, 1.5],[6.9, 3.1, 4.9, 1.5],[5.5, 2.3, 4.0, 1.3],[6.5, 2.8, 4.6, 1.5],
        [6.3, 3.3, 6.0, 2.5],[5.8, 2.7, 5.1, 1.9],[7.1, 3.0, 5.9, 2.1],[6.3, 2.9, 5.6, 1.8],[6.5, 3.0, 5.8, 2.2]
    ],
    "output": [
        'Iris-setosa','Iris-setosa','Iris-setosa','Iris-setosa','Iris-setosa',
        'Iris-versicolor', 'Iris-versicolor','Iris-versicolor','Iris-versicolor','Iris-versicolor',
        'Iris-virginica','Iris-virginica','Iris-virginica','Iris-virginica','Iris-virginica'
    ]
}


/* 输入数据格式化 用于BP训练的矩阵*/
function formulatDataset(struct_data){
    // 先对输出数据把标签转为one-hot编码
    let [label_dit, onehot_list] = getOneHotEncode(struct_data.output);
    let data_matrix = new Array(struct_data.input.length);
    console.log(label_dit)
    console.log(onehot_list);
    console.log(data_matrix);

    if(onehot_list.length != data_matrix.length){
        // window.alert("输入输出长度不一致");
        throw new Error("The length is no paired");
    }

    for (let i = 0; i < data_matrix.length; i++) {
        data_matrix[i] = struct_data.input[i].concat(onehot_list[i]);
    }
    return data_matrix;
}

function getOneHotEncode(label_list){
    // 对标签去重,并返回每个标签对应的one-hot编码
    let label_key = Array.from(new Set(label_list));
    console.log(label_key.length);

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

// [label_dict, one_hot_list] = getOneHotEncode(list);
// console.log(JSON.stringify(label_dict))
// console.log(JSON.stringify(one_hot_list))

let res = formulatDataset(s_data);
console.log(res[0])