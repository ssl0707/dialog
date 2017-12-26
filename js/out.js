function Dialog() {
    this.oBox = null;
    this.oBtn = null;
    this.mark = null;
    this.trim = null;
    this.clientW = document.documentElement.clientWidth;
    this.clientH = document.documentElement.clientHeight;
    // 默认参数
    this.settings = {
        width: 300,
        height: 200,
        title: '标题',
        content: '内容',
        mark: true,
        toClose: 0
    };
}

function extend(obj1, obj2) {
    for (var attr in obj2) {
        obj1[attr] = obj2[attr];
    }
}
// 调用方法
Dialog.prototype.init = function(opt) {
    extend(this.settings, opt);
    this.create();
    this.close();
    if (this.settings.toClose) {
        this.fnClose();
    }
};
// 创建
Dialog.prototype.create = function() {
    this.oBox = document.createElement('div');
    this.oBox.className = 'box';
    this.oBox.style.width = this.settings.width + 'px';
    this.oBox.style.height = this.settings.height + 'px';
    this.oBox.style.left = (this.clientW - this.settings.width) / 2 + 'px';
    this.oBox.style.top = (this.clientH - this.settings.height) / 2 + 'px';
    this.oBox.innerHTML = '<div class="title"><span class="close">X</span><h3 class="biao">' + this.settings.title + '</h3></div><div class="content">' + this.settings.content + '</div></div>';
    document.body.appendChild(this.oBox);
    this.oBtn = this.oBox.getElementsByClassName('close')[0];
    if (this.settings.mark) {
        this.fnMark();
    }
};

// 关闭
Dialog.prototype.close = function() {
    var _this = this;
    this.oBtn.onclick = function() {
        document.body.removeChild(_this.oBox);
        if (_this.settings.mark) {
            document.body.removeChild(_this.mark);
        }
        clearTimeout(_this.trim);
    };
};

// 创建遮罩
Dialog.prototype.fnMark = function() {
    this.mark = document.createElement('div');
    this.mark.className = 'mark';
    this.mark.style.width = this.clientW + 'px';
    this.mark.style.height = this.clientH + 'px';
    document.body.appendChild(this.mark);
};

// 倒计时关闭
Dialog.prototype.fnClose = function() {
    var _this = this;
    this.trim = setTimeout(function() {
        document.body.removeChild(_this.oBox);
        if (_this.settings.mark) {
            document.body.removeChild(_this.mark);
        }
    }, _this.settings.toClose * 1000)
};