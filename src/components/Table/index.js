import { useState } from 'react';
import { Table as ATable } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.min.css';

const Table = (
    {
        styles,
        rankData,
        pagination,
        title,
        driver,
        children
    }
) => {

    const { Column, ColumnGroup } = ATable;

    const [pageSize, setPageSize] = useState(50);

    // 处理圈速显示格式
    const handleSpeed = (speed) => {
        let time = '';
        let minute = Math.floor(speed / 60);
        let second = Math.round((speed - minute * 60) * 100) / 100;

        if (speed < 100) {
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
            title={() => (
                <>
                    {title}{children}
                </>
            )}
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
                        val.speed <= 71
                            ? `${styles.kbracer} ${styles.kbracer1}`
                            : val.speed <= 74
                                ? `${styles.kbracer} ${styles.kbracer2}`
                                : val.speed <= 77
                                    ? `${styles.kbracer} ${styles.kbracer3}`
                                    : val.speed <= 80
                                        ? `${styles.kbracer} ${styles.kbracer4}`
                                        : val.speed <= 82
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
                title="圈速"
                dataIndex="speed"
                key="speed"
                align="center"
                width="8%"
                render={(text) => handleSpeed(text)}
            />
            {
                driver &&
                <Column
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