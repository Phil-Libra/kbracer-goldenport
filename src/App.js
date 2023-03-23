import { useState, useEffect, useMemo } from 'react';
import { Input, Select, Radio } from 'antd';
import { CloseCircleTwoTone } from '@ant-design/icons';

import Table from './components/Table';
import SwitchBox from './components/SwitchBox';

import speed from './data/speed.json';
import speed_mod from './data/speed_mod.json';
import speed_v from './data/speed_v.json';

import bilibili from './img/bilibili.png';
import weibo from './img/weibo.png';
import github from './img/github.png';
import logo from './img/logo.png';

import 'antd/dist/antd.min.css';

import styles from './App.module.css';

const App = () => {
    // 兼容原榜单数据格式，处理圈速数据
    const dataFormat = (data, modStatus) => {
        return data
            // 排序，防止源数据顺序错误
            .sort((a, b) => a.speed * 1000 - b.speed * 1000)
            .map((item, index) => {
                // 添加key值，直接+1并设置为排名
                if (!item.key) {
                    item.key = index + 1;
                }

                // 添加B站链接
                if (item.BID) {
                    item.BURL = `https://www.bilibili.com/video/${item.BID}`;
                }

                // 根据参数添加改装信息
                if (!item.mod) {
                    item.mod = modStatus;
                }

                return item;
            });
    };

    const speedData = useMemo(() => dataFormat(speed, false), []);
    const speedDataMod = useMemo(() => dataFormat(speed_mod, true), []);
    const speedDataV = useMemo(() => dataFormat(speed_v), []);

    // 根据榜单数据生成总榜数据
    const totalSpeedData = useMemo(() => speedData.concat(speedDataMod).concat(speedDataV)
        .sort((a, b) => a.speed * 1000 - b.speed * 1000)
        .map((item, index) => (
            {
                ...item,
                key: index + 1
            }
        )), [speedData, speedDataMod, speedDataV]);

    // 合并为默认数据
    const defaultData = useMemo(() => (
        {
            speed: speedData,
            speedMod: speedDataMod,
            speedV: speedDataV,
            total: totalSpeedData
        }
    ), [speedData, speedDataMod, speedDataV, totalSpeedData]);

    // 展示数据源state
    const [rankData, setRankData] = useState(defaultData);

    // 展示哪个榜单的state
    const [table, setTable] = useState('total');

    // 数据筛选条件
    const [filter, setFilter] = useState({
        name: '',
        key: 'all'
    });

    useEffect(() => {
        const tempData = {};

        // 筛选数据函数
        const dataFilter = (data) => {
            for (const k in data) {
                tempData[k] = data[k].filter((item) => {
                    const reg = new RegExp(filter.name, 'i');
                    return reg.test(item.car);
                }).filter((item) => {
                    switch (filter.key) {
                        case 'all':
                            return item;
                        case 'suv':
                            return item[filter.key] === true;
                        case 'ev':
                            return item.powertrain === 'E';
                        default:
                            throw new Error('Error!');
                    }
                });
            }

            return tempData;
        };

        setRankData(dataFilter(defaultData));

    }, [defaultData, filter]);

    // 高亮榜单state
    const [highlight, setHighlight] = useState('all');

    // 分页状态
    const [pagination, setPagination] = useState(false);

    // 说明书显示状态
    const [descStatus, setDescStatus] = useState(false);

    // 根据state选择传递的数据
    const rankDataSelector = () => {
        switch (table) {
            case 'total':
                return rankData.total;
            case 'original':
                return rankData.speed;
            case 'mod':
                return rankData.speedMod;
            case 'vip':
                return rankData.speedV;
            default:
                throw new Error('没有榜单数据被传递');
        }
    };

    return (
        <>
            <div className={styles.main}>
                <Title>
                    <Search
                        filter={filter}
                        setFilter={setFilter}
                        highlight={highlight}
                        setHighlight={setHighlight}
                        table={table}
                    />
                </Title>

                <Table
                    styles={styles}
                    table={table}
                    rankData={rankDataSelector()}
                    pagination={pagination}
                    highlight={highlight}
                    title={
                        <SwitchBox
                            styles={styles}
                            table={table}
                            setTable={setTable}
                            pagination={pagination}
                            setPagination={setPagination}
                        />
                    }
                >
                </Table>

                <Description
                    descStatus={descStatus}
                    setDescStatus={setDescStatus}
                />
            </div>

            <Footer />
        </>
    );
};

const Search = (
    {
        filter,
        setFilter,
        highlight,
        setHighlight,
        table
    }
) => {
    const { Option } = Select;

    return (
        <div className={styles.search}>
            <div className={styles.searchGroup}>
                <Input
                    addonBefore="搜索："
                    placeholder="车型关键字"
                    style={{
                        minWidth: '175px'
                    }}
                    onChange={(e) => setFilter(() => (
                        {
                            ...filter,
                            name: e.target.value
                        }
                    ))}
                    allowClear
                />
                <Select
                    defaultValue={'all'}
                    style={{
                        paddingLeft: '10px',
                        minWidth: '115px'
                    }}
                    onChange={(val) => setFilter(() => (
                        {
                            ...filter,
                            key: val
                        }
                    ))}
                >
                    <Option value="all">全部车型</Option>
                    <Option value="suv">只看SUV</Option>
                    <Option value="ev">只看电车</Option>
                </Select>
            </div>
            {
                table !== 'vip'
                && <Radio.Group
                    style={{
                        marginTop: '20px'
                    }}
                    buttonStyle='solid'
                    value={highlight}
                    onChange={(e) => setHighlight(e.target.value)}
                >
                    <Radio.Button value={'all'}>全部</Radio.Button>
                    <Radio.Button value={'brz'}>新老BRZ进化</Radio.Button>
                    <Radio.Button value={'fourCars'}>4车进化</Radio.Button>
                </Radio.Group>
            }
        </div >
    )
};



const Title = (
    {
        children
    }
) => (
    <div className={styles.title}>
        <div className={styles.header}>
            <img src={logo} alt="logo" />
            <div className={styles.desc}>
                <h1>键盘车神教易车金港圈速榜</h1>
                <p>传说中的偶像派车评人教主的真实圈速榜单</p>
            </div>
        </div>
        {children}
    </div>
);

const Footer = () => (
    <div className={styles.footer}>
        <div className={styles.left}>
            <div>
                关注教主：
                <a href="https://space.bilibili.com/49576477">
                    <img src={bilibili} alt="bilibili" />
                    @键盘车神教
                </a>
                &nbsp;
                &nbsp;
                <a href="https://space.bilibili.com/1772592840">
                    <img src={bilibili} alt="bilibili" />
                    @易车圈速榜
                </a>
                &nbsp;
                &nbsp;
                <a href="https://www.weibo.com/u/5934299797">
                    <img src={weibo} alt="weibo" />
                    @键盘车神教教主
                </a>
            </div>

            <div>
                教主的锐思榜单：
                <a href="https://kbracer.github.io/">
                    <img src={logo} alt="kbracer" />
                    键盘车神教锐思圈速榜
                </a>
            </div>
        </div>

        <div className={styles.right}>
            <div>
                本页面模仿教主原锐思榜单样式，基于
                &nbsp;<a href="https://github.com/facebook/react/">React</a>&nbsp;
                和
                &nbsp;<a href="https://github.com/ant-design/ant-design/">Ant-Design</a>&nbsp;
                实现。
            </div>
            <div>
                作者：
                <a href="https://github.com/Phil-Libra">Phil_Libra</a>
                &nbsp;
                JSON生成：
                <a href="https://phil-libra.github.io/excel-to-json/">Excel to JSON</a>
                &nbsp;
                源代码：
                <a href="https://github.com/Phil-Libra/kbracer-goldenport">
                    <img src={github} alt="github" />
                    GitHub
                </a>
            </div>

        </div>
    </div>
);

const Description = (
    {
        descStatus,
        setDescStatus
    }
) => (
    <>
        <div className={styles.buttonBox}>
            <button
                className={styles.descButton}
                onClick={() => setDescStatus(true)}
            >
                <span>圈 速 榜 说 明 书</span>
            </button>
        </div>

        <div
            className={styles.description}
            style={{ display: descStatus ? 'block' : 'none' }}
        >
            <CloseCircleTwoTone
                style={
                    {
                        overflow: 'visible',
                        position: 'fixed',
                        top: '-5px',
                        right: '-5px',
                        fontSize: 16
                    }
                }
                twoToneColor="#aaa"
                onClick={() => setDescStatus(false)}
            />
            <div className={styles.manual}>
                <h3>1.改装</h3>
                <p>不同于锐思榜单，易车金港榜单中，单独轮胎的改装仍然计入原厂榜单（尽量选择改装街胎车型）。</p>

                <h3>2.驱动形式</h3>
                <p>"F"=前驱，"R"=后驱，"4"=四驱。</p>

                <h3>3.气温</h3>
                <p>最出圈速的气温是轮胎能够起温，且进气温度低。会尽量选在10-25℃进行测试。</p>
                <p>气温过高：空气密度低。马力小于200ps的自然吸气引擎，或者高温衰减严重的涡轮买菜车，圈速会变慢。30℃以上区间会非常明显，相比10℃，这些车圈速在锐思会有0.X秒的差距。甚至有些极端车型有超过1s的差距，请大家自行脑补修正。</p>
                <p>气温过低：如果使用热熔胎在低温环境中测试，会因为轮胎无法进入工作温度而大幅影响圈速。而普通运动轮胎普遍可以在0℃的情况下正常工作。</p>
                <p>相对而言，散热较好且马力较大的宝马S55车型、保时捷911车型，受到高温影响较小；而搭载四驱的高性能车，如奥迪RS系列，对轮胎起温的要求较低、受到低温影响较小，0℃以下依然能发挥威力。</p>

                <h3>4.轮胎磨损</h3>
                <p>测试车辆大多数来自白嫖。有的车借来时轮胎已经有严重磨损或者年份过久，会影响圈速，都会在节目中说明。</p>

                <h3>5.尾速</h3>
                <p>赛道尾速是指一条赛道中能达到的最高速度，一般在赛道最长的直线中诞生。尾速和01加速一样是动力水准的重要指标，但又有所不同。</p>
                <p>01加速不仅是对动力的检验，还需要考虑起步时的驱动效率，以及弹射程序的聪明与否。影响尾速的最大因素的仍然是动力水准，如教主100ps的原厂菱帅只有112的尾速。但是450ps的911s（992）则是163的尾速。第二影响因素是弯道性能，也就是操控，因为直线上一个弯道出的快不快，直接影响直线部分的起始速度。</p>

                <h3>6.为什么要动态起步</h3>
                <p>Hot lap，一般被称为飞行圈或者飞驰圈（教主喜欢叫飞行圈，因为比较中二）。指得是非静止起步的全力最快圈，也是大家约定俗称进行圈速测试的方式。</p>
                <p>有人可能会有疑问，因为每台车起始速度不同，但这由车辆性能差异导致，本就应该对圈速产生影响。</p>
                <p>而静态起步圈速测试和驱动形式关系较大，意义不大，一般不采用。</p>
            </div>
        </div>
    </>
);

export default App;
