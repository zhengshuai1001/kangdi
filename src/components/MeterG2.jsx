import G2 from '@antv/g2';

export default function (mileageOld, reMileage, socOld) {
    let mileage = parseInt(mileageOld / 3);
    let soc = parseInt(socOld);
    mileage > 120 ? mileage = 120 : "";
    const data1 = [];
    for (let i = 0; i < 121; i++) {
        const item = {};
        item.type = i + '';
        item.value = 10;
        if (i % 5 == 0) {
            item.value = 15;
        }
        if (i % 10 == 0) {
            item.value = 20;
        }
        if (i == mileage) {
            item.value = 20;
        }
        data1.push(item);
    }

    const chart = new G2.Chart({
        container: 'mountNode',
        width: 340,
        height: 340,
        // forceFit: true,
        padding: [-80, 0, 0, 0]
    });
    chart.scale({
        type: {
            range: [0, 1]
        },
        value: {
            sync: true
        }
    });
    chart.legend(false);
    chart.tooltip(false);
    const view1 = chart.view();
    // view1.source(data1);
    view1.source(data1, {
        type: {
            tickCount: 13
        }
    });
    // view1.axis(false);
    view1.axis('value', false);
    view1.axis('type', {
        grid: null,
        line: null,
        tickLine: null,
        label: {
            offset: -20,
            autoRotate: false,
            textStyle: function (type) {
                var color = type <= mileage && mileage != 0 ? "#cf2a89" : "#555";
                var shadowBlur = type <= mileage && mileage != 0 ? 10 : 0;
                var shadowColor = type <= mileage && mileage != 0 ? "#cf2a89" : "#555";
                var fillColor = type <= mileage && mileage != 0 ? "#fff" : "#555";
                return {
                    textAlign: 'center',
                    // fill: "#555",
                    fill: fillColor,
                    shadowBlur: shadowBlur,
                    shadowColor: shadowColor,
                    fontSize: 20,
                    textBaseline: 'middle',
                    stroke: color,
                    lineWidth: 0.5
                }
            },
            formatter: val => {
                if (val === '120') {
                    return 360;
                }
                // return val * 3;
                if ((val/10)%2) {
                    return;
                } else {
                    return val * 3;
                }
            }
        }
    });
    view1.coord('polar', {
        startAngle: -7 / 6 * Math.PI,
        endAngle: 1 / 6 * Math.PI,
        innerRadius: 0.9,
        radius: 0.9
    });
    view1.interval().position('type*value')
        .size('type', function (type) {
            return type == mileage ? 5 : 3;
        })
        .style('type', { // 使用回调函数设置属性
            // lineWidth: (type, value) => { },
            fill: function (type) {
                return type < mileage ? "#cf2a89" : (type == mileage ? "#fff" : "#555")
                // return type < mileage ? "#cf2a89" : "#ccc"
            },
            shadowBlur: function (type) {
                return type < mileage ? 10 : 0
            },
            shadowColor: function (type) {
                return type < mileage ? "#cf2a89" : "#fff"
            },
        });

    view1.guide().arc({
        top: false,
        start: [0, -65],
        end: [mileage, -65],
        style: {
            stroke: '#cf2a89',
            lineWidth: 130,
            opacity: 0.2
        }
    });

    view1.guide().line({
        top: true,
        start: ["50%", "60%"],
        end: [mileage, 1],
        lineStyle: {
            stroke: '#fff',
            lineDash: null,
            lineWidth: 3
        }
    });

    const chart2 = new G2.Chart({
        container: 'mountNode2',
        width: 200,
        height: 200,
        padding: 0
    });
    chart2.scale({
        type: {
            range: [0, 1]
        },
        value: {
            sync: true
        }
    });
    chart2.legend(false);
    chart2.tooltip(false);
    const view2 = chart2.view();
    const data2 = [{ type: 1, value: 1 }, { type: 2, value: 1 }];
    view2.source(data2, {
        type: {
            tickCount: 2
        }
    });
    view2.coord('polar', {
        startAngle: 1 / 3 * Math.PI,
        endAngle: 2 / 3 * Math.PI,
        innerRadius: 0.97,
        radius: 0.8
    });
    view2.guide().arc({
        zIndex: 1,
        start: [0.99, 0.945],
        end: [2.01, 0.945],
        style: {
            stroke: '#cf2a89',
            lineWidth: 3,
        }
    });
    var socForamt = 1.02 + 1 - soc/100;
    socForamt = socForamt > 1.98 ? 1.98 : socForamt;
    view2.guide().arc({
        top: false,
        start: [socForamt, -0.5],
        end: [1.98, -0.5],
        style: {
            stroke: '#cf2a89',
            lineWidth: 6,
            opacity: 1
        }
    });
    // view2.axis(false);
    view2.axis('value', false);
    view2.axis('type', {
        grid: null,
        line: null,
        label: null,
        tickLine: {
            lineWidth: 3, // 刻度线宽
            stroke: '#cf2a89', // 刻度线的颜色
            strokeOpacity: 1, // 刻度线颜色的透明度
            length: -10, // 刻度线的长度，可以为负值（表示反方向渲染）
        }
    });
    view2.interval().position('type*value').color("#cf2a89").size(3);
    view2.guide().html({
        position: ['50%', '-32%'],
        html: '<div style="width: 200px;text-align: center;">'
            + '<p style="font-size: 16px; color: #fff;margin: 0">剩余里程 Km</p>'
    });
    view2.guide().html({
        position: ['50%', '8%'],
        html: '<div style="width: 200px;text-align: center;">'
            + '<p style="font-size: 22px; color: #fff;margin: 0"><span style="color: #fff">' + reMileage + '</span></p>'
    });
    view2.guide().html({
        position: ['50%', '56%'],
        html: '<div style="width: 200px;text-align: center;">'
            // + '<p style="font-size: 14px; color: #fff;margin: 0"><span style="color: #cf2a89">' + reMileage +'km</span></p>'
            + '<p style="padding-top:6px; font-size: 18px;color: #fff;margin: 0;">SOC： <span style="color: #cf2a89">' + soc+'%</span></p>'
            + '</div>'
    });
    view2.guide().html({
        position: ['0%', '60%'],
        html: '<div style="width: 50px;text-align: right;">'
            + '<p style="font-size: 14px; color: #fff;margin: 0">0%</p>'
            + '</div>'
    });
    view2.guide().html({
        position: ['100%', '60%'],
        html: '<div style="width: 50px;text-align: left;">'
            + '<p style="font-size: 14px; color: #fff;margin: 0">100%</p>'
            + '</div>'
    });
    chart.animate(false); // 关闭动画
    chart2.animate(false); // 关闭动画
    chart.render();
    chart2.render();
    G2.track(false);

    return function () {
        //销毁图表，删除生成的图表对象。
        chart.destroy();
        chart2.destroy();
    }
}