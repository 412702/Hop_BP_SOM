/**
 * Author: Zhang Chunli
 * From: Dalian University of Technology
 * Data: 2022-03-31
 * Encoding: uft-8
*/

let Hopefield_tips = `<p>
Hopefield 网络模仿记忆的工作方式。它是一种自联想记忆，可以学习（记住）一个或多个模式，
并且在给定部分（不完整）学习模式（模式的某些信息缺失）的情况下，网络可以回忆和恢复整个学习模式。
<br /> <br />
这个程序有两个步骤，训练和预测。
<br /><br />
<b>训练：</b>
<ul>
<li>在这一步中，我们将在屏幕上训练 3 个模式</li>
<li>我们可以通过单击网格自己绘制3个图案</li>
<li>或者我们可以使用提前预设好的图案</li>
<li>点击 <b>训练 3 种模式</b> 按钮开始训练，或者更新已经设定的网络权重</li>
</ul>
<br>
<b>预测：</b>
<ul>
<li> 我们需要先给出一个模式，让训练好的模型去识别 </li>
<li>可以手动绘制和刚开始不同的模式</li>
<li> 或者使用预设的模式，其中会加上随机的噪声点</li>
<li>单击 <b> 预测 </b> 按钮，我们网络将预测学习模式</li>
<li> 在这个过程中，设置了延迟可以看到记忆的过程 </li>

</ul>
</p>`;

let bp_tips = `<p>
BP(back propagation)神经网络是1986年由Rumelhart和McClelland为首的科学家提出的概念,
是一种按照误差逆向传播算法训练的多层前馈神经网络，是应用最广泛的神经网络模型之一
<br /> <br />
<li style="color: red; font-weight: bold;">在Web端, BP动态展示是存在困难的,因为JS是单线程语言,由于时间原因不再实现.留给后来者实现,可在ctrl+shift+i在
控制台(console)查看运算过程</li>
这个程序有两个步骤，训练和预测。
此BP采用Sigmoid函数作为激活函数，MSE（均方误差）作为损失评估。使用One-Hot 编码作为输出编码方式。
<br /><br />
<b>训练模型：</b>
<ul>
<li>在这一步中，我们可以选择加载预定义的训练集和测试集，点击加载预定义训练和测试集集，数据集会是以下形式：</li>
    <pre>
    {
        "inputs": [[-1,-1],[-1,1],[1,-1], [1,1]],
        "outputs": ["Iris-setosa","Iris-versicolor","Iris-virginica"]
    }
    </pre>
<li> 或者我们可以 选择手动输入训练数据，输入格式同上，输入输出层神经元数目会根据输入数据自动生成。初始状态也会有少量输入数据</li>
<li> 接下来需要手动输入中间层神经元数目、学习率、迭代Epoch数和误差中止条件。</li>
<li><b>训练</b> 按钮开始训练得到网络权重，或者更新已经设定的网络权重</li>

</ul>
<br>
<b>测试模型精度：</b>
<ul>
<li> 在这一步中，我们可以选择上传测试集，要求同上 </li>
<li>也可以手动输入测试数据，要求同上</li>

<li>单击 <b> 测试 </b> 按钮，我们可以看到测试集结果</li>
</ul>
</p>`;

let som_tips =  `<p>
SOM 是一种人工神经网络，但使用竞争学习而不是其他人工神经网络使用的纠错学习
进行训练。SOM 由芬兰教授Teuvo Kohonen在 1980 年代引入，因此有时被称为Kohonen Map或Kohonen 网络
<br /> <br />
由于此处主要为了展示数据，所以参与计算的输入数据均使用二维数据，同时此SOM网侧重于网络的生成，没有进行回想模块设计，就此说明<br/>
此程序同样是有两个步骤：
<br /><br />
<b>选择数据集</b>
<ul>
<li>此步会将数据集展示在散点图中</li>
<li>可手动选择加载鸢尾花数据集，或者随机生成150,300,3000个随机二维点</li>
<li>其中鸢尾花数据仅去了前两个维度，并对其进行标准化x'=(x-μ)/σ</li>
<li>随机点的生成采用Javascript内部Math.random()产生[0,1)内的随机浮点数</li>

</ul>
<br>
<b>计算SOM网权重</b>
<ul>
<li> 此步需要设置竞争层边长m，即正方形边长. 竞争层神经元个数M= m*m；另外需要设置迭代次数</li>
<li>选择完数据，设置完成相关参数之后，点击构建新模型，然后需要点击暂停按钮开始演化过程</li>
<li>在演示过程中，点击旁边的暂停按钮，可实现演化过程的暂停</li>
<li>小技巧：可以先设置一个较小的迭代次数，然后暂停之后仅需改变（扩大）迭代次数点击暂停按钮继续演化</li>
</ul>
</p>`;
