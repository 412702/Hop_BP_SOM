/**
 * Author: Zhang Chunli
 * From: Dalian University of Technology
 * Data: 2022-04-06
 * Encoding: uft-8
 * Description: Three layer BP neural network Simulation By JavaScript, select Sigmoid and MSE as tool function. One-Hot encoding as output.
  */


class BPNN{
    input_num = 0;
    hidden_num = 0;
    output_num = 0;

    // 输入层到隐藏层，隐藏层到输出层权重
    weight_inputToHidden = null;
    weight_hiddenToOutput = null;

    // 设置偏差项，即常数项，隐藏层神经元与输出层神经元 均有
    hidden_biases = null;
    output_biases = null;
    
    //激活结果 神经元节点当前权值下对应神经元值
    hidden_activations = null
    output_activations = null

    // 这个是隐藏层与输出层神经元的梯度项
    hidden_deltas = null;
    output_delts = null;

    // 训练参数epoch，学习率，学习精度（用mse刻画）
    max_epoch = 0;
    learning_rate = 0.5;
    // 允许的mse阈值
    learning_accurency = 0.02;

    // 最终学习次数，学习精度
    epcoh_times = 0;
    learning_loss = 0;

    // 记录mse 
    mse_list = [];

    // 数据应是 input_num + output_num 列的二维数组, 前input_num 列为 训练特征数据，后output_num 列为样本结果（标签）数据
    train_data = null;
    test_data = null;

    // 准确率
    accuracy_train = 0;
    accuracy_test = 0;


    // 

    constructor(input_num, hidden_num, output_num){
        this.input_num = input_num;
        this.hidden_num = hidden_num;
        this.output_num = output_num;

        this.weight_inputToHidden = new Array(input_num);
        this.weight_hiddenToOutput = new Array(hidden_num);

        this.hidden_activations = new Array(hidden_num);
        this.hidden_biases = new Array(hidden_num);
        this.hidden_deltas = new Array(hidden_num);

        this.output_activations = new Array(output_num);
        this.output_biases = new Array(output_num);
        this.output_delts = new Array(output_num);


        //初始化权重。偏差项，各层神经元执行结果，梯度项
        for (let i = 0; i < input_num; i++) {
            this.weight_inputToHidden[i] = new Array(hidden_num);

            for (let j = 0; j < hidden_num; j++) {
                // 在这里面一块把隐藏层到输出层权重 和 偏差项都给了
                this.weight_inputToHidden[i][j] = Math.random();

                if(i == 0){
                    this.weight_hiddenToOutput[j] = new Array(output_num);
                    for (let k = 0; k < output_num; k++) {
                        this.weight_hiddenToOutput[j][k] = Math.random();

                        if(j==0){
                            this.output_activations[k] = 0;
                            this.output_biases[k] = Math.random();
                            this.output_delts[k] = 0;
                        }
                    }
                    this.hidden_activations[j] = 0;
                    this.hidden_biases[j] = Math.random();
                    this.hidden_deltas[j] = 0;
                }
            }
        } 
    }

    /* 向前推进, 给一个简单回调 */
    feedForward(input_data, callback){

        // 求中间层神经元节点值
        for (let i = 0; i < this.hidden_num; i++) {
            let sum = 0;
            for (let j = 0; j < this.input_num; j++) {
                // 计算神经元节点值
                sum += this.weight_inputToHidden[j][i] * input_data[j];         
            }
            // 加上偏差项, 计算Sigmoid函数值
            sum += this.hidden_biases[i];
            this.hidden_activations[i] = this.sigmoid(sum);
        }

        // 计算输出层神经元节点值
        for (let i = 0; i < this.output_num; i++) {
            let sum=0;
            for (let j = 0; j < this.hidden_num; j++) {
                sum += this.weight_hiddenToOutput[j][i] * this.hidden_activations[j];
            }
            sum += this.output_biases[i]
            this.output_activations[i] = this.sigmoid(sum);
        }

        // 如果回调， 给回调函数输入值和计算值。
        if(callback){
            callback(input_data, this.output_activations);
        }
    }

    /* 对模型进行学习 */
    /* 添加 sleep 和 epoch_interval参数控制学习过程等待,以便流程展示 */
    learnNN(train_data, test_data, max_epoch, learning_rate, learning_accurency, callbackLearning, callbackFeedForward){
        // 给数据打乱顺序
        train_data = shuffle(train_data);
        test_data = shuffle(test_data);
        this.train_data = train_data;
        this.test_data = test_data;

        this.max_epoch = max_epoch ;
        this.learning_rate = learning_rate;
        this.learning_accurency = learning_accurency;

        let epoch = 1;
        let mse = 1000;

        let sleep_time = 0; 


        // 开始迭代计算神经网络中各个权值，迭代终止条件为迭代次数达到最大或均方误差小于限定误差
        while (epoch < max_epoch && mse > learning_accurency) {
            
            for (const input of train_data) {
                // 向前推进，计算当前权值对应的各个神经元状态
                this.feedForward(input);
                // 求出输出层神经元的梯度，对于 sigmoid函数，f(x)' =  f(x)*(1 - f(x))
                for (let i = 0; i < this.output_num; i++) {
                    let gradient = this.output_activations[i] * (1 - this.output_activations[i]);
                    // 标签数据也在input里面，所以取标签值，索引要加上输入层神经元的数目
                    this.output_delts[i] = (input[this.input_num + i] - this.output_activations[i]) * gradient;
                }

                // 求出隐藏层神经元梯度
                for (let i = 0; i < this.hidden_num; i++) {
                    let gradient = this.hidden_activations[i] * (1 - this.hidden_activations[i]);
                    let sum = 0;
                    for (let j = 0; j < this.output_num; j++) {
                        sum += this.weight_hiddenToOutput[i][j] * this.output_delts[j];
                    }
                    this.hidden_deltas[i] = gradient * sum;
                }

                // 开始调整权值
                // 调整输入层到隐藏层权值，偏差项
                for (let i = 0; i < this.input_num; i++) {
                    for (let j = 0; j < this.hidden_num; j++) {
                        let learning_delta = learning_rate * this.hidden_deltas[j] * input[i];
                        this.weight_inputToHidden[i][j] += learning_delta;
                        // 对常数项进行一次循环的调整
                        if (i == 0) {
                            this.hidden_biases[j] += learning_rate * this.hidden_deltas[j];
                        }
                    }
                }

                // 调整隐藏层到输出层权值
                for (let i = 0; i < this.hidden_num; i++) {
                    for (let j = 0; j < this.output_num; j++) {
                        let learning_delta = learning_rate * this.output_delts[j] * this.hidden_activations[i];
                        this.weight_hiddenToOutput[i][j] += learning_delta;
                        // 对常数项进行一次调整
                        if (i == 0) {
                            this.output_biases[j] += learning_rate * this.output_delts[j];
                        }
                    }
                }
            }
            // 准备开启下次epoch
            epoch += 1;
            // 计算均方误差
            mse = this.meanSqrError();
            this.mse_list.push(mse);
            // 如果learn过程有回调，给回调传入当前状态
            
            callbackLearning(this, epoch, this.mse_list, mse)

            // 如果feedForword有回调，每100次epoch给一次回调
            // if (callbackFeedForward && epoch % 100 == 0) {
            //     this.feedForward(this.train_data[0], callbackFeedForward);
            // }
        }

        console.log("模型训练完成")
        this.epcoh_times = epoch;
        this.learning_loss = mse;

        // 计算模型准确率
        this.accuracy_train = this.accuracy(train_data);
        this.accuracy_test = this.accuracy(test_data);
    }

    /* sigmoid function */
    sigmoid(x){
        return 1.0/(1.0 + Math.exp(-x));
    }

    /* MSE function 均方误差 */
    meanSqrError(){
        let sum = 0;
        let input_num = this.input_num;
        for (let i = 0; i < this.train_data.length; i++) {
            this.feedForward(this.train_data[i])
            for (let j = 0; j < this.output_num; j++) {
                sum += Math.pow(this.output_activations[j] - this.train_data[i][input_num + j], 2)
            }
        }
        return sum / this.train_data.length;
    }

    /* 计算准确率，模型精度 */
    accuracy(dataset){
        let right_count = 0;
        let wrong_count = 0;
        for (let row of dataset) {
            this.feedForward(row);
            // one-hot 编码中，最大的那个作为所属类别。
            let max = -1;
            let k = -1;
            for (let i = 0; i < this.output_num; i++) {
                if (max < this.output_activations[i]) {
                    k=i;
                    max=this.output_activations[i];
                }
            }
            let target = 0;
            for (let i = 0; i < this.output_num; i++) {
                if(row[this.input_num + i] == 1){
                    target = i;
                }
            }
            if(k == target){
                right_count += 1;
            }else{
                wrong_count += 1;
            }
        }
        return right_count / dataset.length;
    }

}

function shuffle(arr) {
        let tmp = 0;
        let len = arr.length;
        // 一次循环换两个
        if (len < 2) return;
        for (let i = 0; i < Math.ceil(len / 2); i++) {
            let randint_1 = randint(0, len)
            tmp = arr[i]
            arr[i] = arr[randint_1]
            arr[randint_1] = tmp

            let randint_2 = this.randint(0, len)
            tmp = arr[len - 1 - i]
            arr[len - 1 - i] = arr[randint_2]
            arr[randint_2] = tmp
        }
        return arr;
}

function randint(from, to) {
    return Math.floor(from + Math.random() * (to - from))
}