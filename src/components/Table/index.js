import { useState } from 'react';
import { Table as ATable } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import 'antd/dist/antd.min.css';

const Table = (
    {
        styles,
        rankData,
        pagination,
        title,
        mod
    }
) => {
    const { Column, ColumnGroup } = ATable;

    const [pageSize, setPageSize] = useState(50);

    // 处理圈速显示格式
    const handleSpeed = (speed) => {
        let time = '';
        let minute = Math.floor(speed / 60);
        let second = Math.round((speed - minute * 60) * 100) / 100;

        if (speed < 120) {
            speed % 1 === 0
                ? second < 10
                    ? time = `${minute}:0${second}.00`
                    : time = `${minute}:${second}.00`
                : second < 10
                    ? second * 100 % 10 === 0
                        ? time = `${minute}:0${second}0`
                        : time = `${minute}:0${second}`
                    : second * 100 % 10 === 0
                        ? time = `${minute}:${second}0`
                        : time = `${minute}:${second}`;
        } else {
            time = '时间太长，教主的身体吃不消了!';
        }

        return time;
    };

    return (
        <ATable
            title={() => title}
            bordered={true}
            dataSource={rankData}
            size={'small'}
            sticky={true}
            scroll={{ x: 'max-content' }}
            pagination={pagination
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
                        val.speed < 70
                            ? `${styles.kbracer} ${styles.kbracer1}`
                            : val.speed < 73
                                ? `${styles.kbracer} ${styles.kbracer2}`
                                : val.speed < 76
                                    ? `${styles.kbracer} ${styles.kbracer3}`
                                    : val.speed < 79
                                        ? `${styles.kbracer} ${styles.kbracer4}`
                                        : val.speed < 82
                                            ? `${styles.kbracer} ${styles.kbracer5}`
                                            : `${styles.kbracer} ${styles.kbracer6}`
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
                className={styles.highlight}
                title="圈速"
                dataIndex="speed"
                key="speed"
                align="center"
                width="8%"
                render={(text) => handleSpeed(text)}
            />
            {
                mod &&
                <Column
                    title="改装"
                    dataIndex="mod"
                    key="mod"
                    align="center"
                    width="5%"
                    render={(text) => text ? <CheckOutlined /> : <CloseOutlined />}
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
                className={styles.highlight}
                title="尾速(km/h)"
                dataIndex="limit"
                key="limit"
                align="center"
                width="5%"
            />
            <Column
                title="0-100(s)"
                dataIndex="accelerate"
                key="accelerate"
                align="center"
                width="5%"
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
        </ATable>
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