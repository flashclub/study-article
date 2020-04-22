话不多说先贴代码

html:

```html
<div class='message'>
    <div v-for="(item, index) in textBox" :key="index">
        <transition name="bounce">
            <p v-show="index === nowIndex">{{ item }}</p>
        </transition>
    </div>
</div>
```

data: textBox数组，

js:

```javascript
changeText() {
    this.timer = setInterval(() => {
        this.nowIndex++;
        if (this.nowIndex === this.textBox.length) {
            this.nowIndex = 0;
        }
        console.log(this.nowIndex);
    }, 1000);
},
```

css:

```css
.message{
    position: relative;
    font-size: 0.32rem;
    top: 0rem;
    left: 0rem;
    height: 0.8rem;
    overflow: hidden;
    p {
        position: absolute;
        top: 0rem;
        right: 0.213333rem;
        color: #fff;
        font-size: 0.32rem;
        line-height: 0.8rem;
        text-align: center;
    }
}
.bounce-enter {
    opacity: 0;
}
.bounce-enter-active {
    animation: bounce-in 0.2s;
}
.bounce-leave-active {
    animation: bounce-out 0.2s;
}
@keyframes bounce-out {
    0% {
        top: 0rem;
    }
    20% {
        top: -0.144rem;
    }
    40% {
        top: -0.288rem;
    }
    60% {
        top: -0.432rem;
    }
    80% {
        top: -0.576rem;
    }
    100% {
        top: -0.72rem;
    }
}
@keyframes bounce-in {
    0% {
        top: 0.72rem;
    }
    20% {
        top: 0.576rem;
    }
    40% {
        top: 0.432rem;
    }
    60% {
        top: 0.288rem;
    }
    80% {
        top: 0.144rem;
    }
    100% {
        top: 0rem;
    }
}
```

总结：

1. 为什么自己写？因为觉得就为了一个文字滚动引入个swiper没有必要，而且觉得自己能写出来。

2. 弯路：一开始`.bounce-enter-active`和`.bounce-leave-active`使用的是一个animation:bounce-in，这样进入和退出是一个动画效果肯定是不行的。所以分成了两个。

   后来动效还是不流畅，我修改的是margin-top，调试发现移出的效果没出来，推测是margin-top引发的问题，改成top解决

   总结完毕