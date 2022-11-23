import { useState } from 'react';
import { Table as ATable } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import 'antd/dist/antd.min.css';

const Table = (
    {
        styles,
        table,
        rankData,
        pagination,
        title,
        highlight,
        // highlightTopics
    }
) => {

    const { Column, ColumnGroup } = ATable;

    const [pageSize, setPageSize] = useState(50);

    // 处理圈速显示格式
    const handleSpeed = (speed) => {
        let time = '';
        const minute = Math.floor(speed / 60);
        const second = Math.round((speed - minute * 60) * 1000) / 1000;

        speed % 1 === 0
            ? second < 10
                ? time = `${minute}:0${second}.00`
                : time = `${minute}:${second}.00`
            : second < 10
                ? second * 1000 % 100 === 0
                    ? time = `${minute}:0${second}0`
                    : time = `${minute}:0${second}`
                : second * 1000 % 100 === 0
                    ? time = `${minute}:${second}0`
                    : time = `${minute}:${second}`;

        return time;
    };

    // 处理数字显示
    const handleNumber = (item) => {
        if (!item) {
            return '--';
        } else if (item * 1000 % 100 === 0) {
            return `${item}0`
        }

        return item;
    };

    // 处理不同圈速背景色
    const speedChooser = (value) => {
        return value.speed <= 71
            ? `${styles.kbracer} ${styles.kbracer1}`
            : value.speed <= 74
                ? `${styles.kbracer} ${styles.kbracer2}`
                : value.speed <= 77
                    ? `${styles.kbracer} ${styles.kbracer3}`
                    : value.speed <= 80
                        ? `${styles.kbracer} ${styles.kbracer4}`
                        : value.speed <= 82
                            ? `${styles.kbracer} ${styles.kbracer5}`
                            : `${styles.kbracer} ${styles.kbracer6}`;
    };

    // 处理高亮的专题名称
    const highlightChooser = () => {
        switch (highlight) {
            case 'brz':
                // return highlightTopics.brz;
                return '新老BRZ进化';
            case 'fourCars':
                // return highlightTopics.fourCars;
                return '4车进化';
            case 'all':
                return null;
            default:
                throw new Error('高亮错误');
        }
    };

    return (
        <ATable
            title={() => title}
            bordered={true}
            dataSource={rankData}
            size={'small'}
            sticky={true}
            scroll={{ x: true }}
            pagination={
                pagination
                    ? {
                        position: ['topRight'],
                        pageSize: pageSize,
                        pageSizeOptions: [10, 20, 25, 50, 100],
                        onChange: (page, pageSize) => setPageSize(pageSize)
                    }
                    : false
            }
            onRow={(val) => {
                return {
                    className:
                        `
                        ${speedChooser(val)}
                        ${table !== 'vip'
                            // && highlightChooser().includes(val.BID) ? styles.highlight : ''}
                            && val.Btitle?.includes(highlightChooser()) ? styles.highlight : ''}
                        `
                }
            }}
        >
            <Column
                title="排名"
                dataIndex="key"
                key="key"
                align="center"
                width="3%"
            />
            <Column
                title="车型"
                dataIndex="car"
                key="car"
                width="10%"
            />
            <Column
                title="圈速"
                dataIndex="speed"
                key="speed"
                align="center"
                width="5%"
                render={(item) => handleSpeed(item)}
            />
            {
                rankData.some((item) => item.mod)
                && table !== `mod`
                && <Column
                    title="改装"
                    dataIndex="mod"
                    key="mod"
                    align="center"
                    width="5%"
                    render={(text) => text ? <StarFilled /> : <StarOutlined />}
                />
            }
            {
                rankData.some((item) => item.driver)
                && <Column
                    title="车手"
                    dataIndex="driver"
                    key="driver"
                    align="center"
                    width="5%"
                />
            }
            <Column
                title="气温 (℃)"
                dataIndex="temperature"
                key="temperature"
                align="center"
                width="5%"
            />
            <Column
                title="尾速(km/h)"
                dataIndex="limit"
                key="limit"
                align="center"
                width="5%"
                render={(item) => handleNumber(item)}
            />
            <Column
                title="0-100(s)"
                dataIndex="accelerate"
                key="accelerate"
                align="center"
                width="5%"
                render={(item) => handleNumber(item)}
            />
            <Column
                title="马力 (Ps)"
                dataIndex="hp_content"
                key="hp_content"
                align="center"
                width="5%"
            />
            <Column
                title="动力总成"
                dataIndex="powertrain"
                key="powertrain"
                width="8%"
            />
            <Column
                title="驱动"
                dataIndex="drive"
                key="drive"
                align="center"
                width="3%"
            />
            <ColumnGroup title={() => '轮胎'}>
                <Column
                    title="前轮"
                    dataIndex="tyre_type_f"
                    key="tyre_type_f"
                    width="8%"
                    onCell={(res) => {
                        if (res.tyre_type_f === res.tyre_type_r) {
                            return {
                                colSpan: 2,
                            }
                        }
                    }}
                />
                <Column
                    title="后轮"
                    dataIndex="tyre_type_r"
                    key="tyre_type_r"
                    width="8%"
                    onCell={(res) => {
                        if (res.tyre_type_f === res.tyre_type_r) {
                            return {
                                colSpan: 0,
                            }
                        }
                    }}
                />
                <Column
                    title="前宽"
                    dataIndex="tyre_width_f"
                    key="tyre_width_f"
                    align="center"
                    width="3%"
                    onCell={(res) => {
                        if (res.tyre_width_f === res.tyre_width_r) {
                            return {
                                colSpan: 2,
                            }
                        }
                    }}
                />
                <Column
                    title="后宽"
                    dataIndex="tyre_width_r"
                    key="tyre_width_r"
                    align="center"
                    width="3%"
                    onCell={(res) => {
                        if (res.tyre_width_f === res.tyre_width_r) {
                            return {
                                colSpan: 0,
                            }
                        }
                    }}
                />
            </ColumnGroup>
            <Column
                title="圈速视频"
                dataIndex="Btitle"
                key="Btitle"
                render={(text, record) => record.BURL
                    ? <a href={record.BURL}>{text}</a>
                    : <span>{text}</span>}
            />
        </ATable >
    );
};

export default Table;

Table.propTypes = {
    styles: PropTypes.object,
    rankData: PropTypes.array.isRequired,
    pagination: PropTypes.bool,
    title: PropTypes.node,
    mod: PropTypes.bool
};